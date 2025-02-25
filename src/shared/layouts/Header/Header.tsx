import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src="/public/paws_1.png"
            alt="Лапки"
            className={styles.logoImg}
          />
          <p>мягкие лапки</p>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navItem}>
            Главная
          </Link>
          <Link to="/services" className={styles.navItem}>
            Услуги
          </Link>
          <Link to="/gallery" className={styles.navItem}>
            Галерея
          </Link>
          <Link to="/about" className={styles.navItem}>
            О нас
          </Link>
          <Link to="/contacts" className={styles.navItem}>
            Контакты
          </Link>
        </nav>
        <button className={styles.button}>Записаться</button>
      </div>
    </header>
  );
};

export default Header;
