import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route /dashboard...
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si l'utilisateur est déjà connecté et essaie d'aller sur /login, on le renvoie au dashboard
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// On définit quelles pages le middleware doit surveiller
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};