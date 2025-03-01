import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../Profile.module.css";

interface FormData {
  name: string;
  phone: string;
}

interface ProfileEditFormProps {
  initialData: FormData;
  onSubmit: (data: FormData) => void;
  editMode: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required("Имя обязательно").min(2, "Минимум 2 символа"),
  phone: yup
    .string()
    .required("Телефон обязателен")
    .matches(/^\d+$/, "Телефон должен содержать только цифры"),
});

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  initialData,
  onSubmit,
  editMode,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  useEffect(() => {
    setValue("name", initialData.name);
    setValue("phone", initialData.phone);
  }, [initialData, setValue]);

  return (
    <form
      id="profileForm"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.profileInfo}>
      <div className={styles.infoItem}>
        <label>Имя:</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              disabled={!editMode}
              className={styles.inputField}
            />
          )}
        />
        {errors.name && (
          <span className={styles.error}>{errors.name.message}</span>
        )}
      </div>

      <div className={styles.infoItem}>
        <label>Телефон:</label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              disabled={!editMode}
              className={styles.inputField}
            />
          )}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>
    </form>
  );
};

export default ProfileEditForm;
