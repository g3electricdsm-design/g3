import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the admin page
  if (request.nextUrl.pathname === '/admin') {
    // Get the authentication cookies
    const isAuthenticated = request.cookies.get('admin_authenticated')?.value === 'true'
    const timestamp = request.cookies.get('admin_timestamp')?.value
    
    // Check if authentication is valid (within 24 hours)
    if (isAuthenticated && timestamp) {
      const authTime = parseInt(timestamp)
      const now = Date.now()
      const twentyFourHours = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      
      if (now - authTime < twentyFourHours) {
        // Authentication is valid, allow access
        return NextResponse.next()
      }
    }
    
    // Redirect to login page
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }
  
  // Allow all other requests
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
