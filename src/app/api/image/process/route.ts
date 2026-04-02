import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB
const DEFAULT_MAX_DIMENSION = 2000;
const DEFAULT_QUALITY = 85;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.size > MAX_UPLOAD_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      return NextResponse.json(
        { success: false, error: `File is ${sizeMB} MB — the limit is 10 MB.` },
        { status: 400 }
      );
    }

    const maxDimension = parseInt(
      formData.get('maxDimension') as string || `${DEFAULT_MAX_DIMENSION}`,
      10
    );
    const quality = parseInt(
      formData.get('quality') as string || `${DEFAULT_QUALITY}`,
      10
    );

    const buffer = Buffer.from(await file.arrayBuffer());

    const metadata = await sharp(buffer).metadata();

    if (!metadata.width || !metadata.height) {
      return NextResponse.json(
        { success: false, error: 'Could not read image dimensions. The file may be corrupt.' },
        { status: 400 }
      );
    }

    let pipeline = sharp(buffer).rotate(); // auto-rotate based on EXIF

    const larger = Math.max(metadata.width, metadata.height);
    if (larger > maxDimension) {
      pipeline = pipeline.resize({
        width: metadata.width >= metadata.height ? maxDimension : undefined,
        height: metadata.height > metadata.width ? maxDimension : undefined,
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const outputBuffer = await pipeline
      .jpeg({ quality, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    const base64 = outputBuffer.data.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;

    return NextResponse.json({
      success: true,
      dataUrl,
      width: outputBuffer.info.width,
      height: outputBuffer.info.height,
      originalFormat: metadata.format || 'unknown',
      originalSize: file.size,
      processedSize: outputBuffer.data.length,
    });
  } catch (error) {
    console.error('Image processing error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('unsupported image format') || message.includes('Input buffer')) {
      return NextResponse.json(
        { success: false, error: 'Unsupported image format. Try PNG, JPG, HEIC, or WebP.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Image processing failed. Please try a different file.' },
      { status: 500 }
    );
  }
}
