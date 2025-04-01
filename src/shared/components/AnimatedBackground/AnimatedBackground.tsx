import styles from "./AnimatedBackground.module.css";

const AnimatedBackground = () => {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className={styles.circle}></li>
        ))}
      </ul>
    </div>
  );
};

export default AnimatedBackground;
