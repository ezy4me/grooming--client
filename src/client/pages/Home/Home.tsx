import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать в нашу грумерскую студию!</h1>
      <p className={styles.subtitle}>
        Профессиональный уход за вашими питомцами. Качественно, быстро и с любовью.
      </p>
    </div>
  );
};

export default Home;
