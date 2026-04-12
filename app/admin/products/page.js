'use client';
import { useState } from 'react';
import styles from './adminProducts.module.css';

const initialProducts = [
  { id: 1, name: 'Monkfruit Sweetener Powder', weight: '100gm', price: 159, image: '/images/product-main.jpg' },
  { id: 2, name: 'Monkfruit Sweetener Powder', weight: '200gm', price: 199, image: '/images/product-main.jpg' },
  { id: 3, name: 'Monkfruit Sweetener Powder', weight: '250gm', price: 249, image: '/images/product-main.jpg' },
  { id: 4, name: 'Monkfruit Sweetener Powder', weight: '400gm', price: 399, image: '/images/product-main.jpg' },
  { id: 5, name: 'Monkfruit Sweetener Powder', weight: '500gm', price: 499, image: '/images/product-main.jpg' },
  { id: 6, name: 'Moringa Powder', weight: '150gm', price: 149, image: '/images/moringa.jpg' },
  { id: 7, name: 'Moringa Powder', weight: '250gm', price: 199, image: '/images/moringa.jpg' },
  { id: 8, name: 'Moringa Powder', weight: '500gm', price: 279, image: '/images/moringa.jpg' },
  { id: 9, name: 'Moringa Powder', weight: '1kg', price: 499, image: '/images/moringa.jpg' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <h1 className={styles.heading}>All Product List</h1>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className={styles.imgCell}>
                    <img src={p.image} alt={p.name} />
                  </div>
                </td>
                <td className={styles.nameCell}>{p.name}</td>
                <td>{p.weight}</td>
                <td>Rs: {p.price}</td>
                <td>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(p.id)}
                    aria-label="Delete product"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
