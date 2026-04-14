import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      shipping_address,
      amount,
    } = await request.json();

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Save verified order to DB
    const { data, error } = await supabase.from('orders').insert({
      user_id: user.id,
      razorpay_order_id,
      razorpay_payment_id,
      status: 'paid',
      amount,
      items,
      shipping_address,
    }).select().single();

    if (error) throw error;

    return NextResponse.json({ order: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
