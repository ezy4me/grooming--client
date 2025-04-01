import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { FaUser, FaLock, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import styles from "./LoginModal.module.css";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../../services/authApi";
import { setCredentials } from "../../../store/authSlice";

interface LoginModalProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
  passwordRepeat?: string;
  role?: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().email("Неверный формат email").required("Введите email"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Введите пароль"),
});

const registerSchema = yup.object().shape({
  email: yup.string().email("Неверный формат email").required("Введите email"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Введите пароль"),
  passwordRepeat: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли должны совпадать")
    .required("Повторите пароль"),
});

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register: formRegister,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      let response;
      if (isLogin) {
        response = await login({
          email: data.email,
          password: data.password,
        }).unwrap();

        dispatch(
          setCredentials({
            token: response.accesToken,
            refreshToken: response.refreshToken.token,
            user: response.user,
          })
        );

        if (response.user.role === "ADMIN") {
          navigate("/admin/users");
        } else if (response.user.role === "EMPLOYEE") {
          navigate("/employee");
        } else if (response.user.role === "USER") {
          navigate("/profile");
        }
      } else {
        await register({
          email: data.email,
          password: data.password,
          passwordRepeat: data.passwordRepeat || "",
          role: "USER",
        }).unwrap();

        setIsLogin(true);
      }

      onClose();
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>
          {isLogin ? "Вход" : "Регистрация"}
        </h2>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWrapper}>
              <FaUser className={styles.inputIcon} />
              <input {...formRegister("email")} placeholder="Введите email" />
            </div>
            <p className={styles.error}>{errors.email?.message}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль</label>
            <div className={styles.inputWrapper}>
              <FaLock className={styles.inputIcon} />
              <input
                type="password"
                {...formRegister("password")}
                placeholder="Введите пароль"
              />
            </div>
            <p className={styles.error}>{errors.password?.message}</p>
          </div>

          {!isLogin && (
            <div className={styles.formGroup}>
              <label htmlFor="passwordRepeat">Повторите пароль</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  {...formRegister("passwordRepeat")}
                  placeholder="Повторите пароль"
                />
              </div>
              <p className={styles.error}>{errors.passwordRepeat?.message}</p>
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoggingIn || isRegistering}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className={styles.toggleLink}>
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
