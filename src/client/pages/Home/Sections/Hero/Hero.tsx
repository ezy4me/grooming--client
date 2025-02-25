import React from "react";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Добро пожаловать в нашу грумерскую студию!</h1>
        <p className={styles.subtitle}>
          Профессиональный уход за вашими питомцами. Качественно, быстро и с любовью.
        </p>
      </div>
    </section>
  );
};

export default Hero;
