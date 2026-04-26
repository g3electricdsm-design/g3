import { NextRequest, NextResponse } from 'next/server';
import { testimonialStorage } from '@/lib/testimonials-storage';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await testimonialStorage.getById(id);

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    console.error('Error reading testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read testimonial' },
      { status: 500 }
    );
  }
}
