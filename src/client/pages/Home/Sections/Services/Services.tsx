import React from "react";
import styles from "./Services.module.css";
import { useGetCategoriesQuery } from "../../../../../services/categoryService";

const Services: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке категорий</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Наши Услуги</h1>
      <ul className={styles.list}>
        {categories?.map((category) => (
          <li key={category.id} className={styles.listItem}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
