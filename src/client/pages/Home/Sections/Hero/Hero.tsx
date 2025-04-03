import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import GroomingSVG from "/Group_1.svg";
import GroomingSVG2 from "/Group_2.svg";

const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <img
          src={GroomingSVG2}
          alt="Груминг_2"
          className={styles.groomingImageTopLeft}
        />

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          Добро пожаловать в нашу грумерскую студию!
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>
          Профессиональный уход за вашими питомцами. Качественно, быстро и с
          любовью.
        </motion.p>
       
        <img
          src={GroomingSVG}
          alt="Груминг"
          className={styles.groomingImageBottomRight}
        />
      </div>
    </section>
  );
};

export default Hero;
