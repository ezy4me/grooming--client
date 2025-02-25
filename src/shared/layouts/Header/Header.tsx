import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import LoginModal from "../../components/Login/LoginModal";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        <button className={styles.button} onClick={openModal}>
          Войти
        </button>
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
