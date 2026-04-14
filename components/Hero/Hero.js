'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const FALLBACK_SLIDES = [
  { id: 1, image: '/images/hero-banner-1.jpg' },
  { id: 2, image: '/images/hero-banner-2.jpg' },
];

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

export default function Hero() {
  const [slides, setSlides] = useState(null); // null = loading
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);
  const slidesRef = useRef(null);

  useEffect(() => {
    fetch('/api/banners')
      .then(r => r.json())
      .then(({ data }) => {
        const active = (data || []).filter(b => b.is_active);
        const resolved = active.length > 0
          ? active.map(b => ({ id: b.id, image: b.image_url }))
          : FALLBACK_SLIDES;
        slidesRef.current = resolved;
        setSlides(resolved);
      })
      .catch(() => {
        slidesRef.current = FALLBACK_SLIDES;
        setSlides(FALLBACK_SLIDES);
      });
  }, []);

  useEffect(() => {
    if (!slides) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setIndex(i => (i + 1) % slidesRef.current.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [slides]);

  const goTo = (next, direction) => {
    setDir(direction);
    setIndex(next);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setIndex(i => (i + 1) % slidesRef.current.length);
    }, 5000);
  };

  const prev = () => goTo((index - 1 + slides.length) % slides.length, -1);
  const next = () => goTo((index + 1) % slides.length, 1);

  if (!slides) return <div className={styles.heroSkeleton} />;

  return (
    <section className={styles.hero}>
      <div className={styles.track}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={slides[index].id}
            src={slides[index].image}
            alt={`Banner ${index + 1}`}
            className={styles.slide}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous slide">‹</button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">›</button>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
