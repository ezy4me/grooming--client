import React from "react";
import styles from "./Contacts.module.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contacts: React.FC = () => {
  return (
    <section id="contacts" className={styles.contacts}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Контакты</h2>
        <div className={styles.divider}></div>
        <p className={styles.text}>Свяжитесь с нами для записи и вопросов:</p>

        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhoneAlt className={styles.icon} />
            <p>Телефон: +7 (988) 182-80-85</p>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <p>Email: info@example.com</p>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <p>Адрес: просп. Ибрагимова, 20</p>
          </div>
          <div className={styles.contactItem}>
            <FaClock className={styles.icon} />
            <p>Время работы: ежедневно с 09:00 до 21:00</p>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A9a1d0357f1f0d7cf2d46fa330f06261e4a3c4305f7f120cfba8e99b0cd56fdd3&amp;source=constructor"
            width="100%"
            height="400"
            frameBorder="0"
            z-index="100"
            className={styles.map}
            title="Яндекс Карта"></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
