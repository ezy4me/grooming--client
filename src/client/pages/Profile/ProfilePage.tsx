import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

import {
  useGetClientByUserIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../../../services/clientService";
import ProfileEditForm from "./Sections/ProfileEditForm";

const ProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localClient, setLocalClient] = useState<{
    name: string;
    phone: string;
  }>({
    name: "",
    phone: "",
  });

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const {
    data: client,
    isLoading,
    isError,
  } = useGetClientByUserIdQuery(userId as number, {
    skip: !userId,
  });

  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  useEffect(() => {
    if (client) {
      setLocalClient({ name: client.name, phone: client.phone });
    }
  }, [client]);

  const handleFormSubmit = async (data: { name: string; phone: string }) => {
    if (!userId) {
      setErrorMessage("Ошибка: пользователь не найден.");
      return;
    }

    setErrorMessage(null);

    try {
      if (client) {
        await updateClient({ id: client.id, ...data }).unwrap();
      } else {
        await createClient({ userId, ...data }).unwrap();
      }
      setLocalClient(data); // Обновляем локальное состояние
      setEditMode(false);
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(
        "Ошибка при обновлении/создании данных. Попробуйте позже."
      );
    }
  };

  if (!userId)
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          Ошибка: Пользователь не найден.
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>Загрузка...</div>
      </div>
    );

  if (isError)
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>Ошибка загрузки клиента.</div>
      </div>
    );

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <h1>Мой профиль</h1>
          {!isLoading && client && !editMode && (
            <button
              className={styles.editButton}
              onClick={() => setEditMode(true)}>
              Редактировать
            </button>
          )}
          {editMode && (
            <button
              type="submit"
              form="profileForm"
              className={styles.editButton}>
              Сохранить
            </button>
          )}
        </div>
        <p>Почта: {user?.email}</p>

        <hr className={styles.divider} />

        <ProfileEditForm
          initialData={localClient}
          onSubmit={handleFormSubmit}
          editMode={editMode}
        />

        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
