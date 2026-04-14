'use client';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.empty}>
            <p className={styles.emptyText}>Your cart is empty</p>
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
          <h1 className={styles.heading}>Your Cart</h1>
          <div className={styles.layout}>
            <div className={styles.items}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.weight}`} className={styles.item}>
                  <div className={styles.itemImg}>
                    <img src={item.main_image || '/images/logo.png'} alt={item.name} onError={e => e.target.src = '/images/logo.png'} />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemWeight}>Weight: {item.weight}</p>
                    <p className={styles.itemPrice}>Rs. {item.price}</p>
                  </div>
                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => updateQty(item.id, item.weight, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.weight, item.qty + 1)}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id, item.weight)}>
                      Remove
                    </button>
                  </div>
                  <p className={styles.subtotal}>Rs. {item.price * item.qty}</p>
                </div>
              ))}
            </div>

            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.free}>Free</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={() => router.push('/checkout')}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
