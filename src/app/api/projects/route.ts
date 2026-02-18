import { NextRequest, NextResponse } from 'next/server';
import { Project } from '@/data/projects';
import { storage } from '@/lib/projects-storage';
import { isAuthenticated, SESSION_COOKIE } from '@/lib/auth';

function unauthorized() {
  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  );
}

// GET - Get all projects (public)
export async function GET() {
  try {
    const projects = await storage.getAll();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('Error reading projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to read projects' },
      { status: 500 }
    );
  }
}

// POST - Create a new project (admin only)
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request.cookies.get(SESSION_COOKIE)?.value))) {
    return unauthorized();
  }

  try {
    const project: Project = await request.json();

    if (!project.title || !project.category || !project.type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const projects = await storage.getAll();

    if (project.id && project.id !== 0 && projects.find(p => p.id === project.id)) {
      return NextResponse.json(
        { success: false, error: 'Project with this ID already exists' },
        { status: 400 }
      );
    }

    const createdProject = await storage.create(project);
    return NextResponse.json({ success: true, data: createdProject });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing project (admin only)
export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request.cookies.get(SESSION_COOKIE)?.value))) {
    return unauthorized();
  }

  try {
    const project: Project = await request.json();

    if (!project.id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    try {
      const updatedProject = await storage.update(project);
      return NextResponse.json({ success: true, data: updatedProject });
    } catch (error) {
      if ((error as Error).message === 'Project not found') {
        return NextResponse.json(
          { success: false, error: 'Project not found' },
          { status: 404 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project (admin only)
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated(request.cookies.get(SESSION_COOKIE)?.value))) {
    return unauthorized();
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const deleted = await storage.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
