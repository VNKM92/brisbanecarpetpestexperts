import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { logActivity } from '@/lib/activity-logger';
import { validateUploadFile, sanitizeString } from '@/lib/security';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
    }

    const validation = validateUploadFile({
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!validation.valid) {
      return NextResponse.json({ success: false, message: validation.error }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique safe filename
    const ext = path.extname(file.name) || '.jpg';
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${cleanBase}_${Date.now()}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    // Register in Media database
    const media = await prisma.media.create({
      data: {
        filename,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        altText: cleanBase.replace(/_/g, ' '),
        folder: sanitizeString(folder),
      },
    });

    await logActivity({
      userId: user.userId,
      userName: user.name,
      action: 'CREATE',
      module: 'Media',
      entityId: media.id,
      details: { filename, url: publicUrl },
    });

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        id: media.id,
        filename,
        url: publicUrl,
      },
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
