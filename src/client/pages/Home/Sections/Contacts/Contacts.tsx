import React from "react";
import styles from "./Contacts.module.css";

const Contacts: React.FC = () => {
  return (
    <section id="contacts" className={styles.contacts}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Контакты</h2>
        <p className={styles.text}>Свяжитесь с нами для записи и вопросов:</p>
        <div className={styles.contactInfo}>
          <p>Телефон: +7 (123) 456-78-90</p>
          <p>Email: info@example.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
