import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/projects-storage';

// GET - Get a single project by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await storage.getById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error reading project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read project' },
      { status: 500 }
    );
  }
}
