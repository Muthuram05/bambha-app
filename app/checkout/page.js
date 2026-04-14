'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './checkout.module.css';

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Puducherry',
];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user, profile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '', phone: '', address1: '', address2: '',
    city: '', state: '', pincode: '',
  });
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.replace('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (profile) {
      const name = [profile.first_name, profile.last_name].filter(Boolean).join(' ');
      setForm(f => ({ ...f, fullName: name }));
    }
  }, [profile]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setError('');
    setPaying(true);

    const loaded = await loadRazorpay();
    if (!loaded) {
      setError('Failed to load payment gateway. Please check your connection.');
      setPaying(false);
      return;
    }

    // Create Razorpay order on server
    const res = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalPrice }),
    });
    const { order, error: orderErr } = await res.json();

    if (orderErr || !order) {
      setError(orderErr || 'Failed to create order.');
      setPaying(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'BamBha',
      description: 'Natural Wellness Products',
      image: '/images/logo.png',
      order_id: order.id,
      prefill: {
        name: form.fullName,
        contact: form.phone,
        email: user?.email || '',
      },
      theme: { color: '#2e7d32' },
      handler: async (response) => {
        const verifyRes = await fetch('/api/razorpay/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: order.amount,
            items: cart.map(i => ({
              product_id: i.id,
              name: i.name,
              weight: i.weight,
              price: i.price,
              qty: i.qty,
              image: i.main_image || null,
            })),
            shipping_address: form,
          }),
        });

        const { order: savedOrder, error: verifyErr } = await verifyRes.json();

        if (verifyErr || !savedOrder) {
          setError(verifyErr || 'Payment verification failed.');
          setPaying(false);
          return;
        }

        clearCart();
        router.push(`/orders/${savedOrder.id}`);
      },
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', (response) => {
      setError(`Payment failed: ${response.error.description}`);
      setPaying(false);
    });
    rzp.open();
  };

  if (authLoading) return null;
  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link href="/products" className="btn-primary">Continue Shopping</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo;
            <Link href="/cart"> Cart</Link> &rsaquo;
            <span> Checkout</span>
          </div>
          <h1 className={styles.heading}>Checkout</h1>

          <div className={styles.layout}>
            {/* Left: Address Form */}
            <form className={styles.formSection} onSubmit={handlePay}>
              <h2 className={styles.sectionTitle}>Shipping Address</h2>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input className={styles.input} name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} name="phone" value={form.phone} onChange={handleChange} required placeholder="10-digit mobile number" pattern="[6-9][0-9]{9}" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address Line 1</label>
                <input className={styles.input} name="address1" value={form.address1} onChange={handleChange} required placeholder="House no, Street, Area" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Address Line 2 <span className={styles.optional}>(Optional)</span></label>
                <input className={styles.input} name="address2" value={form.address2} onChange={handleChange} placeholder="Landmark, Colony" />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>City</label>
                  <input className={styles.input} name="city" value={form.city} onChange={handleChange} required placeholder="City" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Pincode</label>
                  <input className={styles.input} name="pincode" value={form.pincode} onChange={handleChange} required placeholder="6-digit pincode" pattern="[1-9][0-9]{5}" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>State</label>
                <select className={styles.input} name="state" value={form.state} onChange={handleChange} required>
                  <option value="">Select state</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button type="submit" className={styles.payBtn} disabled={paying}>
                {paying ? 'Opening Payment…' : `Pay Rs. ${totalPrice}`}
              </button>
            </form>

            {/* Right: Order Summary */}
            <div className={styles.summary}>
              <h2 className={styles.sectionTitle}>Order Summary</h2>
              <div className={styles.items}>
                {cart.map(item => (
                  <div key={`${item.id}-${item.weight}`} className={styles.summaryItem}>
                    <div className={styles.summaryImg}>
                      <img src={item.main_image || '/images/logo.png'} alt={item.name} onError={e => e.target.src = '/images/logo.png'} />
                      <span className={styles.qtyBadge}>{item.qty}</span>
                    </div>
                    <div className={styles.summaryItemInfo}>
                      <p className={styles.summaryItemName}>{item.name}</p>
                      {item.weight && <p className={styles.summaryItemWeight}>{item.weight}</p>}
                    </div>
                    <p className={styles.summaryItemPrice}>Rs. {item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span className={styles.free}>Free</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
