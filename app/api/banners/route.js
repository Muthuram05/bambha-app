import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

async function requireAdmin(supabase) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
  return profile?.is_admin === true;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('banners')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    if (!(await requireAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, image_url, redirect_url, display_order, is_active } = body;

    if (!title || !image_url) {
      return NextResponse.json({ error: 'Title and image are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('banners').insert({
      title,
      image_url,
      redirect_url: redirect_url || null,
      display_order: display_order ?? 0,
      is_active: is_active ?? true,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const supabase = await createClient();
    if (!(await requireAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Bulk reorder: [{ id, display_order }, ...]
    if (Array.isArray(body)) {
      const updates = await Promise.all(
        body.map(({ id, display_order }) =>
          supabase.from('banners').update({ display_order }).eq('id', id)
        )
      );
      const err = updates.find(r => r.error);
      if (err) throw err.error;
      return NextResponse.json({ success: true });
    }

    // Single update (toggle active)
    const { id, is_active } = body;
    const { data, error } = await supabase
      .from('banners')
      .update({ is_active })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const supabase = await createClient();
    if (!(await requireAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, image_url } = await request.json();

    // Remove image from storage
    if (image_url) {
      const path = image_url.split('/banners/')[1];
      if (path) await supabase.storage.from('banners').remove([path]);
    }

    const { error } = await supabase.from('banners').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
