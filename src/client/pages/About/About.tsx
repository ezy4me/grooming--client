import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>О нас</h1>
      <p className={styles.text}>
        Мы — команда профессионалов, которые любят свою работу и обожают
        заботиться о питомцах. В нашей студии ваш питомец всегда в надежных
        руках.
      </p>
    </div>
  );
};

export default About;
