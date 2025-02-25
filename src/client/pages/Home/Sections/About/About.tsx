import React from "react";
import styles from "./About.module.css";

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.heading}>О нас</h2>
        <p className={styles.text}>
          Мы — команда профессионалов, заботящихся о каждом питомце, как о своем собственном. Многолетний опыт и страсть к животным позволяют нам обеспечивать высочайший уровень обслуживания.
        </p>
      </div>
    </section>
  );
};

export default About;
