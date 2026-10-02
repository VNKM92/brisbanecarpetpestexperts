import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(request);
    if (!authUser || !['super-admin', 'admin', 'manager'].includes(authUser.roleSlug)) {
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const reportType = searchParams.get('type') || 'all'; // 'tech_to_customer', 'customer_to_tech', 'all'
    const employeeId = searchParams.get('employeeId');
    const customerId = searchParams.get('customerId');

    // 1. Fetch All Technicians with all their assigned bookings & crew bookings
    const employees = await prisma.employee.findMany({
      where: employeeId ? { id: employeeId } : undefined,
      include: {
        assignedBookings: {
          include: {
            customer: true,
            jobReport: { include: { photos: true } },
            crew: { include: { employee: true } },
            invoices: true,
            payments: true,
          },
        },
        crewAssignments: {
          include: {
            booking: {
              include: {
                customer: true,
                jobReport: { include: { photos: true } },
                crew: { include: { employee: true } },
                invoices: true,
                payments: true,
              },
            },
          },
        },
        attendances: {
          take: 30,
          orderBy: { date: 'desc' },
        },
        jobReports: {
          include: { photos: true, booking: { include: { customer: true } } },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Build Structured Technician-to-Customer Report
    const technicianReports = employees.map((emp) => {
      // Combine directly assigned bookings and crew assignments
      const allBookingMap = new Map();

      emp.assignedBookings.forEach((b) => {
        allBookingMap.set(b.id, {
          booking: b,
          role: 'Lead Specialist (Primary)',
          isLead: true,
        });
      });

      emp.crewAssignments.forEach((ca) => {
        if (ca.booking) {
          allBookingMap.set(ca.booking.id, {
            booking: ca.booking,
            role: ca.role,
            isLead: ca.isLead,
            notes: ca.notes,
          });
        }
      });

      const uniqueJobs = Array.from(allBookingMap.values());

      const customersServed = uniqueJobs.map((item) => {
        const b = item.booking;
        const otherCrew = (b.crew || [])
          .filter((c: any) => c.employeeId !== emp.id)
          .map((c: any) => ({
            name: c.employee?.name,
            code: c.employee?.employeeCode,
            role: c.role,
          }));

        return {
          bookingId: b.id,
          bookingNumber: b.bookingNumber,
          customerName: b.customerName,
          customerEmail: b.customerEmail,
          customerPhone: b.customerPhone,
          serviceName: b.serviceName,
          serviceAddress: b.serviceAddress,
          scheduledDate: b.scheduledDate,
          timeSlot: b.timeSlot,
          status: b.status,
          totalPrice: b.approvedPrice || b.totalPrice,
          depositPaid: b.depositPaid,
          technicianRole: item.role,
          isLead: item.isLead,
          crewSize: (b.crew?.length || 0) > 0 ? b.crew.length : 1,
          coWorkers: otherCrew,
          hasPhotos: Boolean(b.jobReport?.photos?.length),
          photosCount: b.jobReport?.photos?.length || 0,
          faultNotes: b.jobReport?.faultNotes || null,
        };
      });

      const totalRevenueHandled = uniqueJobs.reduce(
        (sum, item) => sum + (item.booking.approvedPrice || item.booking.totalPrice || 0),
        0
      );
      const totalPhotos = uniqueJobs.reduce(
        (sum, item) => sum + (item.booking.jobReport?.photos?.length || 0),
        0
      );

      return {
        employeeId: emp.id,
        employeeCode: emp.employeeCode,
        name: emp.name,
        email: emp.email,
        phone: emp.phone,
        designation: emp.designation,
        department: emp.department,
        status: emp.status,
        hourlyRate: emp.hourlyRate,
        licenseNumber: emp.licenseNumber,
        totalJobsCount: uniqueJobs.length,
        totalRevenueHandled,
        totalPhotosUploaded: totalPhotos,
        customersServed,
      };
    });

    // 2. Fetch All Customers with all technicians who worked at their properties
    const customers = await prisma.customer.findMany({
      where: customerId ? { id: customerId } : undefined,
      include: {
        bookings: {
          include: {
            assignedEmployee: true,
            crew: {
              include: { employee: true },
            },
            jobReport: {
              include: { photos: true, employee: true },
            },
            invoices: true,
            payments: true,
          },
          orderBy: { scheduledDate: 'desc' },
        },
      },
      orderBy: { name: 'asc' },
    });

    // Build Structured Customer-to-Technician Report
    const customerReports = customers.map((cust) => {
      const visits = cust.bookings.map((b) => {
        // Collect all crew technicians who worked on this customer's home
        const crewList = [];

        if (b.crew && b.crew.length > 0) {
          b.crew.forEach((c) => {
            crewList.push({
              employeeId: c.employee?.id,
              employeeCode: c.employee?.employeeCode,
              name: c.employee?.name,
              phone: c.employee?.phone,
              designation: c.employee?.designation,
              roleInJob: c.role,
              isLead: c.isLead,
            });
          });
        } else if (b.assignedEmployee) {
          crewList.push({
            employeeId: b.assignedEmployee.id,
            employeeCode: b.assignedEmployee.employeeCode,
            name: b.assignedEmployee.name,
            phone: b.assignedEmployee.phone,
            designation: b.assignedEmployee.designation,
            roleInJob: 'Lead Technician',
            isLead: true,
          });
        }

        return {
          bookingId: b.id,
          bookingNumber: b.bookingNumber,
          serviceName: b.serviceName,
          serviceAddress: b.serviceAddress,
          scheduledDate: b.scheduledDate,
          timeSlot: b.timeSlot,
          status: b.status,
          totalPrice: b.approvedPrice || b.totalPrice,
          depositPaid: b.depositPaid,
          balanceDue: b.balanceDue,
          paymentStatus: b.paymentStatus,
          crewSize: crewList.length,
          techniciansAssigned: crewList,
          jobReport: b.jobReport
            ? {
                status: b.jobReport.status,
                faultNotes: b.jobReport.faultNotes,
                treatmentApplied: b.jobReport.treatmentApplied,
                photosCount: b.jobReport.photos?.length || 0,
                photos: b.jobReport.photos || [],
              }
            : null,
        };
      });

      // Distinct technicians who have ever worked at this customer's properties
      const distinctTechMap = new Map();
      visits.forEach((v) => {
        v.techniciansAssigned.forEach((t) => {
          if (t.employeeId && !distinctTechMap.has(t.employeeId)) {
            distinctTechMap.set(t.employeeId, t);
          }
        });
      });

      return {
        customerId: cust.id,
        name: cust.name,
        email: cust.email,
        phone: cust.phone,
        address: cust.address,
        suburb: cust.suburb,
        totalBookings: cust.bookings.length,
        totalTechniciansVisited: distinctTechMap.size,
        distinctTechnicians: Array.from(distinctTechMap.values()),
        serviceVisits: visits,
      };
    });

    // 3. Multi-Crew Statistics
    const allBookings = await prisma.booking.findMany({
      include: {
        crew: true,
      },
    });

    const singleTechJobs = allBookings.filter((b) => (b.crew?.length || 0) <= 1).length;
    const multiTechJobs = allBookings.filter((b) => (b.crew?.length || 0) > 1).length;
    const largeCrewJobs = allBookings.filter((b) => (b.crew?.length || 0) >= 3).length;

    return NextResponse.json({
      success: true,
      data: {
        technicianReports,
        customerReports,
        stats: {
          totalTechnicians: employees.length,
          totalCustomers: customers.length,
          singleTechJobs,
          multiTechJobs,
          largeCrewJobs,
        },
      },
    });
  } catch (error: any) {
    console.error('Error generating technician reports:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate reports' }, { status: 500 });
  }
}
