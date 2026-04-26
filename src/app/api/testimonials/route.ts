import { NextRequest, NextResponse } from 'next/server';
import { Testimonial } from '@/data/testimonials';
import { testimonialStorage } from '@/lib/testimonials-storage';

export async function GET() {
  try {
    const testimonials = await testimonialStorage.getAll();
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const testimonial: Testimonial = await request.json();

    if (!testimonial.name || !testimonial.title || !testimonial.text) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const created = await testimonialStorage.create(testimonial);
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const testimonial: Testimonial = await request.json();

    if (!testimonial.id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    try {
      const updated = await testimonialStorage.update(testimonial);
      return NextResponse.json({ success: true, data: updated });
    } catch (error) {
      if ((error as Error).message === 'Testimonial not found') {
        return NextResponse.json(
          { success: false, error: 'Testimonial not found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error updating testimonial:', error);
    return NextResponse.json(
      { success: false, error: `Failed to update testimonial: ${errorMessage}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const deleted = await testimonialStorage.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
