import React from "react";
import styles from "./About.module.css";
import { FaHandshake, FaPaw, FaAward } from "react-icons/fa"; // Пример иконок для секции

const About: React.FC = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.heading}>О нас</h2>
        <p className={styles.subtitle}>
          Мы — команда профессионалов, заботящихся о каждом питомце, как о своем собственном. Многолетний опыт и страсть к животным позволяют нам обеспечивать высочайший уровень обслуживания.
        </p>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <FaHandshake className={styles.icon} />
            <h3 className={styles.infoTitle}>Надежность и доверие</h3>
            <p className={styles.infoText}>
              Мы ценим доверие наших клиентов и всегда гарантируем качественное обслуживание.
            </p>
          </div>

          <div className={styles.infoItem}>
            <FaPaw className={styles.icon} />
            <h3 className={styles.infoTitle}>Любовь к животным</h3>
            <p className={styles.infoText}>
              Наши специалисты любят животных, а их забота и внимание делают работу по-настоящему комфортной.
            </p>
          </div>

          <div className={styles.infoItem}>
            <FaAward className={styles.icon} />
            <h3 className={styles.infoTitle}>Профессионализм</h3>
            <p className={styles.infoText}>
              Высокий уровень квалификации мастеров подтверждается многолетним опытом работы и успешными результатами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
