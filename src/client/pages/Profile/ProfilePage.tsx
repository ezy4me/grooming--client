import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./Profile.module.css";
import {
  useGetClientByUserIdQuery,
  useUpdateClientMutation,
} from "../../../services/clientService";

interface FormData {
  name: string;
  phone: string;
}

// Мемоизированный компонент InputField
const InputField = React.memo(({ field, disabled }: any) => {
  return <input {...field} disabled={disabled} />;
});

const ProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Ошибка при разборе user из localStorage", error);
  }

  const userId = user && typeof user === "object" && user.id ? user.id : null;
  console.log("USER:", user);

  const {
    data: client,
    isLoading,
    isError,
  } = useGetClientByUserIdQuery(userId as number, {
    skip: !userId,
  });

  const schema = yup.object().shape({
    name: yup.string().required("Имя обязательно").min(2, "Минимум 2 символа"),
    phone: yup.string().required("Телефон обязателен"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (client) {
      setValue("name", client.name);
      setValue("phone", client.phone);
    }
  }, [client, setValue]);

  const [updateClient] = useUpdateClientMutation();

  const onSubmit = async (data: FormData) => {
    if (!client) return;
    try {
      await updateClient({ id: client.id, ...data }).unwrap();
      setEditMode(false);
    } catch (error) {
      console.error("Ошибка обновления данных", error);
    }
  };

  if (!userId) return <div>Ошибка: Пользователь не найден.</div>;
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки клиента.</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <h1>Мой профиль</h1>
          {editMode ? (
            <button
              type="submit"
              form="profileForm"
              className={styles.editButton}>
              Сохранить
            </button>
          ) : (
            <button
              className={styles.editButton}
              onClick={() => setEditMode(true)}>
              Редактировать
            </button>
          )}
        </div>

        <form
          id="profileForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <label>Имя:</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <InputField {...field} disabled={!editMode} />}
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
              render={({ field }) => <InputField {...field} disabled={!editMode} />}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone.message}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
