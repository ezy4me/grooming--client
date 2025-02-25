import React from "react";
import styles from "./Contacts.module.css";

const Contacts: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Контакты</h1>
      <p className={styles.text}>Адрес: ул. Примерная, 123, Город</p>
      <p className={styles.text}>Телефон: +7 123 456 78 90</p>
      <p className={styles.text}>Email: info@groomingstudio.com</p>
    </div>
  );
};

export default Contacts;
