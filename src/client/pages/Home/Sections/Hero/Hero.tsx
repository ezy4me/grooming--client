import React from "react";
import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import Button from "../../../../../shared/components/Button/Button";

const Hero: React.FC = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Добро пожаловать в нашу грумерскую студию!
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Профессиональный уход за вашими питомцами. Качественно, быстро и с любовью.
        </motion.p>
        
        <motion.div 
          className={styles.buttonContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <Button size="lg">
            Записаться на приём
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
