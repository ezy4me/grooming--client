import React, { useState } from "react";
import { FaUser, FaLock, FaTimes } from "react-icons/fa"; 
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>
          {isLogin ? "Вход" : "Регистрация"}
        </h2>

        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input type="email" id="email" placeholder="Введите email" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input type="password" id="password" placeholder="Введите пароль" />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <span onClick={toggleForm} className={styles.toggleLink}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
