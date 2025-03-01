import React, { useState } from "react";
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
          <a href="#home" className={styles.navItem}>
            Главная
          </a>
          <a href="#services" className={styles.navItem}>
            Услуги
          </a>
          <a href="#gallery" className={styles.navItem}>
            Галерея
          </a>
          <a href="#about" className={styles.navItem}>
            О нас
          </a>
          <a href="#contacts" className={styles.navItem}>
            Контакты
          </a>
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
