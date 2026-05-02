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
    if (!(await requireAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('returns')
      .select('*, orders(id, amount, items, shipping_address, status, razorpay_payment_id, created_at)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const supabase = await createClient();
    if (!(await requireAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id, status, admin_notes } = await request.json();
    const validStatuses = ['requested', 'approved', 'rejected', 'refunded'];
    if (!id || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const updatePayload = { status };
    if (admin_notes !== undefined) updatePayload.admin_notes = admin_notes;

    const { data, error } = await supabase
      .from('returns')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
