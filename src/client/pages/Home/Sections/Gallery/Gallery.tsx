import React from "react";
import styles from "./Gallery.module.css";

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Галерея</h2>
        <p className={styles.text}>Смотрите работы наших мастеров.</p>
        <div className={styles.images}>
          <div className={styles.image}>
            <img src="/public/work_1.webp" alt="Работа 1" />
          </div>
          <div className={styles.image}>
            <img src="/public/work_2.webp" alt="Работа 2" />
          </div>
          <div className={styles.image}>
            <img src="/public/work_3.webp" alt="Работа 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
