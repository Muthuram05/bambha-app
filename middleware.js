import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request) {
  const { supabase, supabaseResponse } = createClient(request);

  // Refresh session so it doesn't expire
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
