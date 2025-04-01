import React, { useEffect, useRef } from "react";
import styles from "./Gallery.module.css";

const images = [
  "/work_1.webp",
  "/work_2.webp",
  "/work_3.webp",
  "/work_4.webp",
  "/work_5.webp",
  "/work_6.webp",
  "/work_7.webp",
  "/work_8.webp",
  "/work_9.webp",
  "/work_10.webp",
];

const Gallery: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trackRef.current) {
      const track = trackRef.current;
      let scrollAmount = 0;

      const scroll = () => {
        scrollAmount += 1;
        if (scrollAmount >= track.scrollWidth / 2) {
          scrollAmount = 0;
        }
        track.style.transform = `translateX(-${scrollAmount}px)`;
      };

      const interval = setInterval(scroll, 15);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Галерея</h2>
        <div className={styles.divider}></div>
        <p className={styles.text}>
          Ознакомьтесь с нашими работами! Мы гордимся каждым проектом и
          стремимся к совершенству. Наша команда профессионалов создает
          уникальные решения для каждого клиента.
        </p>
        <p className={styles.text}>
          Вдохновитесь нашими работами и доверьте нам воплощение ваших идей!
        </p>

        <div className={styles.galleryWrapper}>
          <div className={styles.imageTrack} ref={trackRef}>
            {[...images, ...images].map((src, index) => {
              const layoutClass =
                index % 3 === 0
                  ? styles.layout0
                  : index % 3 === 1
                  ? styles.layout1
                  : styles.layout2;
              return (
                <div
                  key={index}
                  className={`${styles.imageItem} ${layoutClass}`}>
                  <img
                    src={src}
                    alt={`Работа ${index % images.length + 1}`}
                    className={styles.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
