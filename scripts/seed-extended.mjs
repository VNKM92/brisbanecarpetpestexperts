import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive production database seeding...');

  // 1. Roles
  const roles = [
    { name: 'Super Admin', slug: 'super-admin', description: 'Full access to manage all bookings, invoices, HRM, and system settings' },
    { name: 'Admin', slug: 'admin', description: 'Administrator operations' },
    { name: 'Staff', slug: 'staff', description: 'Field technicians and cleaners' },
    { name: 'Customer', slug: 'customer', description: 'Registered clients and homeowners' },
  ];

  const roleMap = {};
  for (const r of roles) {
    const roleRecord = await prisma.role.upsert({
      where: { slug: r.slug },
      update: { name: r.name, description: r.description },
      create: { ...r, isSystem: true },
    });
    roleMap[r.slug] = roleRecord.id;
  }
  console.log('✅ Roles initialized:', Object.keys(roleMap));

  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('Admin@123456', salt);
  const customerPassword = await bcrypt.hash('Customer@123', salt);
  const staffPassword = await bcrypt.hash('Staff@123456', salt);

  // 2. Users: Super Admin & Customer
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@brisbane.com' },
    update: { roleId: roleMap['super-admin'] },
    create: {
      name: 'Super Administrator',
      email: 'admin@brisbane.com',
      passwordHash: adminPassword,
      phone: '0434 061 188',
      roleId: roleMap['super-admin'],
      status: 'ACTIVE',
    },
  });

  const customerUser = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: { roleId: roleMap['customer'] },
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      passwordHash: customerPassword,
      phone: '0412 345 678',
      roleId: roleMap['customer'],
      status: 'ACTIVE',
    },
  });

  const customerProfile = await prisma.customer.upsert({
    where: { email: 'john.doe@example.com' },
    update: { userId: customerUser.id },
    create: {
      userId: customerUser.id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '0412 345 678',
      address: '74 Eagle Street',
      suburb: 'Brisbane City',
      postcode: '4000',
    },
  });

  // Customer 2: Sarah Jenkins (Bond Cleaning Client)
  const customerUser2 = await prisma.user.upsert({
    where: { email: 'sarah.jenkins@example.com' },
    update: { roleId: roleMap['customer'] },
    create: {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      passwordHash: customerPassword,
      phone: '0422 998 877',
      roleId: roleMap['customer'],
      status: 'ACTIVE',
    },
  });

  const customerProfile2 = await prisma.customer.upsert({
    where: { email: 'sarah.jenkins@example.com' },
    update: { userId: customerUser2.id },
    create: {
      userId: customerUser2.id,
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '0422 998 877',
      address: '15 Brunswick Street',
      suburb: 'Fortitude Valley',
      postcode: '4006',
    },
  });

  // 3. Multi-Technician Staff Directory (Crew of 5 Technicians)
  const technicianList = [
    {
      code: 'EMP-101',
      name: 'Michael Miller',
      email: 'tech@brisbane.com',
      phone: '0434 999 888',
      designation: 'Senior Carpet & Pest Specialist (Lead)',
      hourlyRate: 42.0,
      license: 'QLD-PEST-89412',
    },
    {
      code: 'EMP-102',
      name: 'Liam Cooper',
      email: 'liam.cooper@brisbane.com',
      phone: '0434 111 222',
      designation: 'Certified Steam Carpet Cleaning Tech',
      hourlyRate: 36.5,
      license: 'IICRC-CC-4482',
    },
    {
      code: 'EMP-103',
      name: 'David Nguyen',
      email: 'david.nguyen@brisbane.com',
      phone: '0434 333 444',
      designation: 'Licensed Termite & Bond Pest Inspector',
      hourlyRate: 40.0,
      license: 'QLD-PEST-99120',
    },
    {
      code: 'EMP-104',
      name: 'Jack Wilson',
      email: 'jack.wilson@brisbane.com',
      phone: '0434 555 666',
      designation: 'End of Lease Bond Cleaning Specialist',
      hourlyRate: 34.0,
      license: 'QLD-BOND-2281',
    },
    {
      code: 'EMP-105',
      name: 'Emma Taylor',
      email: 'emma.taylor@brisbane.com',
      phone: '0434 777 888',
      designation: 'Quality Assurance & Stain Treatment Expert',
      hourlyRate: 38.0,
      license: 'IICRC-SM-9902',
    },
  ];

  const createdEmployees = [];
  for (const t of technicianList) {
    const u = await prisma.user.upsert({
      where: { email: t.email },
      update: { roleId: roleMap['staff'] },
      create: {
        name: t.name,
        email: t.email,
        passwordHash: staffPassword,
        phone: t.phone,
        roleId: roleMap['staff'],
        status: 'ACTIVE',
      },
    });

    const emp = await prisma.employee.upsert({
      where: { email: t.email },
      update: { userId: u.id },
      create: {
        employeeCode: t.code,
        userId: u.id,
        name: t.name,
        email: t.email,
        phone: t.phone,
        designation: t.designation,
        department: 'Field Cleaning & Pest Operations',
        hourlyRate: t.hourlyRate,
        licenseNumber: t.license,
        status: 'ACTIVE',
      },
    });
    createdEmployees.push(emp);
  }
  console.log(`✅ ${createdEmployees.length} Field Technicians & Accounts created`);

  // 4. Large Crew Job (4-5 Technicians working on a Customer's Home)
  const bookingCrewJob = await prisma.booking.upsert({
    where: { bookingNumber: 'BK-20261002-9901' },
    update: {},
    create: {
      bookingNumber: 'BK-20261002-9901',
      customerId: customerProfile2.id,
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.jenkins@example.com',
      customerPhone: '0422 998 877',
      serviceName: 'Full House Bond Clean, Pest Control & Steam Extraction Combo',
      serviceAddress: '15 Brunswick Street, Fortitude Valley 4006',
      suburb: 'Fortitude Valley',
      postcode: '4006',
      scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // In 2 days
      timeSlot: 'Morning (8AM - 11AM)',
      rooms: 5,
      bathrooms: 3,
      squareFootage: 240,
      addons: JSON.stringify(['Scotchgard™ Stain Protection Guard', 'Flea & Tick End of Lease Treatment', 'Pet Urine & Deep Odour Bio-Enzyme Treatment']),
      totalPrice: 580.0,
      approvedPrice: 580.0,
      depositRequired: 50.0,
      depositPaid: 50.0,
      balanceDue: 530.0,
      quoteStatus: 'APPROVED',
      status: 'CONFIRMED',
      paymentStatus: 'DEPOSIT_PAID',
      paymentGateway: 'STRIPE',
      assignedEmployeeId: createdEmployees[0].id, // Michael Miller (Lead)
      adminNotes: 'High-priority full house bond guarantee service. 4-person specialist crew assigned.',
    },
  });

  // Assign 4-person crew to this customer booking
  await prisma.bookingCrewMember.deleteMany({ where: { bookingId: bookingCrewJob.id } });
  await prisma.bookingCrewMember.createMany({
    data: [
      {
        bookingId: bookingCrewJob.id,
        employeeId: createdEmployees[0].id, // Michael Miller
        role: 'Lead Specialist (Overall Team Leader)',
        isLead: true,
        notes: 'Conduct pre-inspection and lead steam extraction on upper levels.',
      },
      {
        bookingId: bookingCrewJob.id,
        employeeId: createdEmployees[1].id, // Liam Cooper
        role: 'Steam Cleaning Specialist',
        isLead: false,
        notes: 'High heat extraction in 5 bedrooms and lounge.',
      },
      {
        bookingId: bookingCrewJob.id,
        employeeId: createdEmployees[2].id, // David Nguyen
        role: 'Licensed Pest Controller',
        isLead: false,
        notes: 'Internal & external barrier spray + End of lease pest certificate.',
      },
      {
        bookingId: bookingCrewJob.id,
        employeeId: createdEmployees[3].id, // Jack Wilson
        role: 'Bond Cleaning Specialist',
        isLead: false,
        notes: 'Kitchen degreasing, oven, and 3 bathroom sanitation.',
      },
    ],
  });

  // 5. Booking 1: John Doe (2 Technicians)
  const booking1 = await prisma.booking.upsert({
    where: { bookingNumber: 'BK-20261002-1082' },
    update: {},
    create: {
      bookingNumber: 'BK-20261002-1082',
      customerId: customerProfile.id,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '0412 345 678',
      serviceName: 'Carpet Steam Cleaning & Pest Control Combo',
      serviceAddress: '74 Eagle Street, Brisbane City 4000',
      suburb: 'Brisbane City',
      postcode: '4000',
      scheduledDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
      timeSlot: 'Morning (8AM - 11AM)',
      rooms: 3,
      bathrooms: 2,
      squareFootage: 130,
      addons: JSON.stringify(['Scotchgard™ Stain Protection Guard']),
      totalPrice: 295.0,
      approvedPrice: 295.0,
      depositRequired: 50.0,
      depositPaid: 50.0,
      balanceDue: 245.0,
      quoteStatus: 'APPROVED',
      status: 'CONFIRMED',
      paymentStatus: 'DEPOSIT_PAID',
      paymentGateway: 'STRIPE',
      assignedEmployeeId: createdEmployees[0].id,
      adminNotes: 'Approved with premium Scotchgard protection package.',
    },
  });

  await prisma.bookingCrewMember.deleteMany({ where: { bookingId: booking1.id } });
  await prisma.bookingCrewMember.createMany({
    data: [
      {
        bookingId: booking1.id,
        employeeId: createdEmployees[0].id, // Michael Miller
        role: 'Lead Specialist',
        isLead: true,
      },
      {
        bookingId: booking1.id,
        employeeId: createdEmployees[4].id, // Emma Taylor
        role: 'Quality Assurance & Stain Treatment Expert',
        isLead: false,
      },
    ],
  });

  // 6. Job Inspection Report & Photos
  await prisma.jobReport.upsert({
    where: { bookingId: booking1.id },
    update: {},
    create: {
      bookingId: booking1.id,
      employeeId: createdEmployees[0].id,
      status: 'COMPLETED',
      faultNotes: 'Pre-existing timber scuff near hallway entry photographed on arrival.',
      treatmentApplied: 'High heat steam extraction at 95°C + Scotchgard protective barrier.',
      workDescription: 'Extracted 3 bedrooms and living area. Removed stubborn wine stain in lounge.',
      photos: {
        create: [
          {
            photoUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
            type: 'BEFORE',
            caption: 'Hallway heavy soil traffic before extraction',
            uploadedBy: 'Michael Miller (EMP-101)',
          },
          {
            photoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
            type: 'FAULT_EVIDENCE',
            caption: 'Pre-existing skirting board scratch noted on arrival',
            uploadedBy: 'Emma Taylor (EMP-105)',
          },
          {
            photoUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            type: 'AFTER',
            caption: 'Completed pristine carpet result',
            uploadedBy: 'Michael Miller (EMP-101)',
          },
        ],
      },
    },
  });

  console.log('✅ Seeding complete with multi-technician crews (4-5 staff) and inspection reports!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
