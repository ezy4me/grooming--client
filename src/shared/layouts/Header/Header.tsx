import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import LoginModal from "../../components/Login/LoginModal";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserRole(user?.role || null);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getProfileLink = () => {
    switch (userRole) {
      case "USER":
        return "/profile";
      case "ADMIN":
        return "/admin";
      case "EMPLOYEE":
        return "/employee";
      default:
        return "#";
    }
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
          <a href="/#home" className={styles.navItem}>
            Главная
          </a>
          <a href="/#services" className={styles.navItem}>
            Услуги
          </a>
          <a href="/#gallery" className={styles.navItem}>
            Галерея
          </a>
          <a href="/#about" className={styles.navItem}>
            О нас
          </a>
          <a href="/#contacts" className={styles.navItem}>
            Контакты
          </a>
        </nav>

        {userRole ? (
          <Link to={getProfileLink()} className={styles.button}>
            Профиль
          </Link>
        ) : (
          <button className={styles.button} onClick={openModal}>
            Войти
          </button>
        )}
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
