import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './products.module.css';

// Mock products - replace with Supabase fetch
const products = [
  {
    id: 1,
    name: 'Monkfruit Sweetener Powder',
    slug: 'monkfruit-sweetener',
    image: '/images/product-main.jpg',
    price: 159,
    originalPrice: 300,
    rating: 4.96,
    reviews: 53,
    weights: ['100gm', '200gm', '250gm', '400gm', '500gm'],
    category: 'Sweetener',
  },
  {
    id: 2,
    name: 'Moringa Powder',
    slug: 'moringa-powder',
    image: '/images/moringa.jpg',
    price: 149,
    originalPrice: 249,
    rating: 4.8,
    reviews: 28,
    weights: ['150gm', '250gm', '500gm', '1kg'],
    category: 'Superfood',
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link> &rsaquo; <span>Our Products</span>
          </div>
          <h1 className={styles.heading}>Our Products</h1>
          <div className={styles.grid}>
            {products.map((p) => (
              <Link href={`/products/${p.id}`} key={p.id} className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={p.image} alt={p.name} />
                </div>
                <div className={styles.info}>
                  <p className={styles.category}>{p.category}</p>
                  <h3 className={styles.name}>{p.name}</h3>
                  <div className={styles.stars}>{'★'.repeat(5)}</div>
                  <p className={styles.ratingText}>{p.rating} / 5 ({p.reviews} reviews)</p>
                  <div className={styles.pricing}>
                    <span className={styles.price}>Rs. {p.price}</span>
                    <span className={styles.originalPrice}>Rs. {p.originalPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
