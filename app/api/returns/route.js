import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { order_id, reason } = await request.json();
    if (!order_id || !reason?.trim()) {
      return NextResponse.json({ error: 'order_id and reason are required' }, { status: 400 });
    }

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, user_id')
      .eq('id', order_id)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    if (order.status !== 'delivered') {
      return NextResponse.json({ error: 'Returns can only be requested for delivered orders' }, { status: 400 });
    }

    const { data: existing } = await supabase
      .from('returns')
      .select('id')
      .eq('order_id', order_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'A return request already exists for this order' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from('returns')
      .insert({ order_id, user_id: user.id, reason: reason.trim() })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('returns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
