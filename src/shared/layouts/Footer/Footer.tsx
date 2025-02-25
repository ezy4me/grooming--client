import {
  FaInstagram,
  FaTelegramPlane,
  FaVk,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.logo}>
            <img
              src="/public/paws_1.png"
              alt="Лапки"
              className={styles.logoImg}
            />
            <p>мягкие лапки</p>
          </div>
          <p>
            <FaMapMarkerAlt className={styles.icon} /> ул. Пушистая, 12, Москва
          </p>
          <p>
            <FaPhone className={styles.icon} /> +7 (988) 182-80-85
          </p>
        </div>

        <div className={styles.socials}>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTelegramPlane className={styles.socialIcon} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaVk className={styles.socialIcon} />
          </a>
        </div>
      </div>
      <p className={styles.copyright}>
        © 2025 Грумерская студия "Мягкие лапки". Все права защищены.
      </p>
    </footer>
  );
};

export default Footer;
