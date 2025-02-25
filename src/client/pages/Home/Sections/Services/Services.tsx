import React from "react";
import styles from "./Services.module.css";
import { useGetCategoriesQuery } from "../../../../../services/categoryService";

const Services: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p className={styles.loading}>Загрузка...</p>;
  if (error) return <p className={styles.error}>Ошибка при загрузке категорий</p>;

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Наши Услуги</h2>
        <div className={styles.grid}>
          {categories?.map((category) => (
            <div key={category.id} className={styles.card}>
              <div className={styles.icon}>{category.name[0]}</div>
              <h3 className={styles.cardTitle}>{category.name}</h3>
              <p className={styles.cardText}>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
