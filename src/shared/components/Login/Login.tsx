import React from "react";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Войти в аккаунт</h1>
      <form className="mt-6">
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Пароль" className={styles.input} />
        <button className={styles.button}>Войти</button>
      </form>
    </div>
  );
};

export default Login;
