import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps extends HTMLMotionProps<"button"> {
  size?: "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({ size = "md", children, ...props }) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[size]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
