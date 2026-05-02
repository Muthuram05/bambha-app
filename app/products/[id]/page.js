'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ReviewSection from '@/components/ReviewSection/ReviewSection';
import { useCart } from '@/context/CartContext';
import styles from './product.module.css';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedWeight, setSelectedWeight] = useState(null); // full weight object {weight, price, mrp}
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (res.status === 404) { setNotFound(true); return null; }
        return res.json();
      })
      .then(json => {
        if (!json) return;
        setProduct(json.data);
        if (json.data?.weights?.length) {
          const first = json.data.weights[0];
          // Support both object format {weight, price, mrp} and legacy string format
          setSelectedWeight(typeof first === 'object' ? first : { weight: first, price: json.data.price, mrp: json.data.mrp });
        }
      })
      .finally(() => setLoading(false));
    fetch(`/api/reviews?product_id=${id}`)
      .then(res => res.json())
      .then(({ data }) => setReviews(data || []));
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.skeletonLayout}>
              <div className={styles.skeletonImg} />
              <div className={styles.skeletonInfo}>
                <div className={styles.skeletonLine} style={{ width: '80%', height: 20 }} />
                <div className={styles.skeletonLine} style={{ width: '40%', height: 16 }} />
                <div className={styles.skeletonLine} style={{ width: '30%', height: 32 }} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !product) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.container}>
            <p style={{ padding: '60px 0', color: 'var(--gray)' }}>Product not found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = [product.main_image, ...(product.gallery || [])].filter(Boolean);
  // Normalize weights to always be objects {weight, price, mrp}
  const weights = (product.weights || []).map(w => {
    if (typeof w === 'object') return w;
    try { return JSON.parse(w); } catch { return { weight: w, price: product.price, mrp: product.mrp }; }
  });
  const displayPrice = selectedWeight?.price ?? product.price;
  const displayMrp = selectedWeight?.mrp ?? product.mrp;
  const avgRating = product.avg_rating ? Number(product.avg_rating) : 0;
  const reviewCount = product.review_count || 0;
  const filledStars = Math.round(avgRating);

  const handleAddToCart = () => {
    const weightLabel = selectedWeight?.weight || '';
    const price = selectedWeight?.price ?? product.price;
    addToCart(product, weightLabel, price, qty);
  };

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo;
            <Link href="/products"> Our Products</Link> &rsaquo;
            <span> {product.name}</span>
          </div> */}

          <div className={styles.productLayout}>
            {/* Thumbnails */}
            <div className={styles.thumbnails}>
              {images.map((img, i) => (
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
              {images.length > 0 ? (
                <img src={images[activeImg]} alt={product.name} />
              ) : (
                <img src="/images/logo.png" alt={product.name} />
              )}
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <h1 className={styles.title}>{product.name}</h1>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>
                  {filledStars > 0 ? '★'.repeat(filledStars) + '☆'.repeat(5 - filledStars) : '☆☆☆☆☆'}
                </span>
                <span className={styles.reviewCount}>
                  {reviewCount > 0 ? `${avgRating.toFixed(2)} · ${reviewCount} reviews` : 'No reviews yet'}
                </span>
              </div>

              <div className={styles.priceRow}>
                {displayMrp && displayMrp > displayPrice && (
                  <span className={styles.originalPrice}>Rs.{displayMrp}</span>
                )}
                <span className={styles.price}>Rs.{displayPrice}</span>
              </div>

              <p className={styles.delivery}>📦 Usually ships in 2–4 business days</p>

              {weights.length > 0 && (
                <div className={styles.weightSection}>
                  <p className={styles.label}>Weight</p>
                  <div className={styles.weightOptions}>
                    {weights.map((w) => (
                      <button
                        key={w.weight}
                        className={`${styles.weightBtn} ${selectedWeight?.weight === w.weight ? styles.weightActive : ''}`}
                        onClick={() => setSelectedWeight(w)}
                      >
                        {w.weight}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
              <button className={styles.buyNowBtn}>Buy it now</button>

              {reviews.length > 0 && (
                <div className={styles.reviewCarousel}>
                  <button
                    className={styles.carouselArrow}
                    onClick={() => setCarouselIdx(i => (i - 1 + reviews.length) % reviews.length)}
                  >&#8249;</button>
                  <div className={styles.carouselCard}>
                    <div className={styles.carouselTop}>
                      <span className={styles.carouselStars}>
                        {'★'.repeat(reviews[carouselIdx].rating)}{'☆'.repeat(5 - reviews[carouselIdx].rating)}
                      </span>
                      <span className={styles.carouselName}>{reviews[carouselIdx].reviewer_name}</span>
                    </div>
                    <p className={styles.carouselText}>{reviews[carouselIdx].body || reviews[carouselIdx].review_body}</p>
                  </div>
                  <button
                    className={styles.carouselArrow}
                    onClick={() => setCarouselIdx(i => (i + 1) % reviews.length)}
                  >&#8250;</button>
                </div>
              )}

              {product.description && (
                <div className={styles.accordion}>
                  <button className={styles.accordionBtn} onClick={() => setAboutOpen(!aboutOpen)}>
                    <span>About this Item</span>
                    <img
                      src="/left-arrow.png"
                      alt=""
                      className={`${styles.accordionArrow} ${aboutOpen ? styles.accordionArrowOpen : ''}`}
                    />
                  </button>
                  {aboutOpen && (
                    <div
                      className={`${styles.accordionContent} ${styles.richText}`}
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                </div>
              )}

              <div className={styles.accordion}>
                <button className={styles.accordionBtn} onClick={() => setReturnsOpen(!returnsOpen)}>
                  <span>🔄 Returns + Exchanges</span>
                  <img
                    src="/left-arrow.png"
                    alt=""
                    className={`${styles.accordionArrow} ${returnsOpen ? styles.accordionArrowOpen : ''}`}
                  />
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
          <ReviewSection
            productId={product.id}
            avgRating={avgRating}
            reviewCount={reviewCount}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
