import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Grooming Studio</div>
      <nav className={styles.nav}>
        <div className={styles.navItem}>Главная</div>
        <div className={styles.navItem}>Услуги</div>
        <div className={styles.navItem}>Галерея</div>
        <div className={styles.navItem}>Контакты</div>
      </nav>
      <button className={styles.button}>Записаться</button>
    </header>
  );
};

export default Header;
