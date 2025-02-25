import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Грумерская студия © 2025</p>
      <div className={styles.socials}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
