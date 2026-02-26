import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/cics(.*)',
  '/cicssg(.*)',
  '/announcements(.*)',
  '/documents(.*)',
  '/events(.*)',
  '/contact-us(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
])

const isSignupRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)'
])

function checkIfUserIsTreasury(sessionClaims: Record<string, any> | null): boolean {
  if (sessionClaims && sessionClaims.username === 'treasury') {
    return true
  }
  return false
}

function checkIfUserIsCOS(sessionClaims: Record<string, any> | null): boolean {
  if (sessionClaims && sessionClaims.username === 'chiefofstaff') {
    return true
  }
  return false
}

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims, userId } = await auth()

  if (isSignupRoute(req) && userId) { 
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  if(sessionClaims) {
      // console.log("Session claims: ", sessionClaims)
      if(checkIfUserIsTreasury(sessionClaims)) {
        // Only redirect if accessing the base /admin page
        if (req.nextUrl.pathname === '/admin') {
          return NextResponse.redirect(new URL('/admin/treasury/fetchdesk-report', req.url))
        }
      }
    }

  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}