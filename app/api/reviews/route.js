import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('product_id');
    if (!productId) return NextResponse.json({ error: 'product_id required' }, { status: 400 });

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const body = await request.json();
    const { product_id, reviewer_name, rating, review_body } = body;

    if (!product_id || !reviewer_name || !rating || !review_body) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const { data, error } = await supabase.from('reviews').insert({
      product_id,
      user_id: user.id,
      reviewer_name,
      rating: Number(rating),
      body: review_body,
    }).select().single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'You have already reviewed this product' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
