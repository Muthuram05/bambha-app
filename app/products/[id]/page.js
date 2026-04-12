'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ReviewSection from '@/components/ReviewSection/ReviewSection';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';

// Mock product data - replace with Supabase fetch by id
const productData = {
  id: 1,
  name: 'Bambha | Monkfruit Sweetener Powder 100gms | Zero-Calorie Sugar Substitute | 1:1 Sugar Replacer for Cooking & Baking | keto & Diabetic Friendly(100gms)',
  images: [
    '/images/product-main.jpg',
    '/images/product-2.jpg',
    '/images/product-3.jpg',
    '/images/product-4.jpg',
    '/images/product-5.jpg',
  ],
  rating: 4.96,
  reviews: 53,
  weights: ['100gm', '200gm', '250gm', '400gm', '500gm'],
  prices: { '100gm': 159, '200gm': 199, '250gm': 249, '400gm': 399, '500gm': 499 },
  originalPrices: { '100gm': 300, '200gm': 380, '250gm': 450, '400gm': 700, '500gm': 850 },
  delivery: '02 January and 04 January',
  about: 'Our flagship Monkfruit Sweetener is plant-based, contains no artificial preservatives or fillers. 150x sweeter than sugar, zero calories, perfect for all recipes.',
  ratingBreakdown: { 5: 52, 4: 1, 3: 0, 2: 0, 1: 0 },
};

export default function ProductPage({ params }) {
  const [selectedWeight, setSelectedWeight] = useState('100gm');
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);
  const { addToCart } = useCart();

  const price = productData.prices[selectedWeight];
  const original = productData.originalPrices[selectedWeight];

  const handleAddToCart = () => {
    addToCart(productData, selectedWeight, price, qty);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo;
            <Link href="/products"> Our Products</Link> &rsaquo;
            <span> Monk Fruit Sweetener</span>
          </div>

          <div className={styles.productLayout}>
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              {productData.images.map((img, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`Product view ${i + 1}`} />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className={styles.mainImg}>
              <img src={productData.images[activeImg]} alt="Product" />
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <h1 className={styles.title}>{productData.name}</h1>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>{'★'.repeat(5)}</span>
                <span className={styles.reviewCount}>{productData.reviews} reviews</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>Rs.{original}</span>
                <span className={styles.price}>Rs.{price}</span>
              </div>

              <p className={styles.delivery}>
                📦 Estimated delivery between <strong>{productData.delivery}</strong>
              </p>

              <div className={styles.weightSection}>
                <p className={styles.label}>weight</p>
                <div className={styles.weightOptions}>
                  {productData.weights.map((w) => (
                    <button
                      key={w}
                      className={`${styles.weightBtn} ${selectedWeight === w ? styles.weightActive : ''}`}
                      onClick={() => setSelectedWeight(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.qtySection}>
                <p className={styles.label}>Quantity</p>
                <div className={styles.qtyControl}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}>+</button>
                </div>
              </div>

              <button className={styles.addCartBtn} onClick={handleAddToCart}>
                Add to cart
              </button>
              <button className={styles.buyNowBtn}>
                Buy it now
              </button>

              {/* Accordion */}
              <div className={styles.accordion}>
                <button className={styles.accordionBtn} onClick={() => setAboutOpen(!aboutOpen)}>
                  <span>About this Item</span>
                  <span>{aboutOpen ? '∧' : '∨'}</span>
                </button>
                {aboutOpen && (
                  <div className={styles.accordionContent}>
                    <p>{productData.about}</p>
                  </div>
                )}
              </div>
              <div className={styles.accordion}>
                <button className={styles.accordionBtn} onClick={() => setReturnsOpen(!returnsOpen)}>
                  <span>🔄 Returns + Exchanges</span>
                  <span>{returnsOpen ? '∧' : '∨'}</span>
                </button>
                {returnsOpen && (
                  <div className={styles.accordionContent}>
                    <p>Easy 7-day returns. Contact support for exchanges.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <ReviewSection product={productData} />
        </div>
      </main>
      <Footer />
    </>
  );
}
