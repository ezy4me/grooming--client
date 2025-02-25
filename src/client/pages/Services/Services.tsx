import React from "react";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Наши Услуги</h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>Стрижка питомцев</li>
        <li className={styles.listItem}>Купание и сушка</li>
        <li className={styles.listItem}>Чистка зубов</li>
        <li className={styles.listItem}>Уход за когтями</li>
      </ul>
    </div>
  );
};

export default Services;
