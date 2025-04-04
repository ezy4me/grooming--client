import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import {
  useGetAppointmentsByClientIdQuery,
  useUpdateAppointmentMutation,
} from "../../../services/appointmentService";
import {
  useCreateClientMutation,
  useGetClientByUserIdQuery,
  useUpdateClientMutation,
} from "../../../services/clientService";
import ProfileEditForm from "./Sections/ProfileEditForm";
import AppointmentsList from "./Sections/Appointment/AppointmentsList";
import AppointmentForm from "./Sections/Appointment/AppointmentForm";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [localClient, setLocalClient] = useState<{ name: string; phone: string }>({
    name: "",
    phone: "",
  });
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  const { data: client, isLoading, isError } = useGetClientByUserIdQuery(userId as number, { skip: !userId });
  const { data: appointments, refetch: refetchAppointments } = useGetAppointmentsByClientIdQuery(client?.id as number, { skip: !client?.id });

  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();

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
      setLocalClient(data);
      setEditMode(false);
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage("Ошибка при обновлении/создании данных. Попробуйте позже.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleAppointmentFormSave = () => {
    refetchAppointments();
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    const appointmentToCancel = appointments?.find((app) => app.id === appointmentId);

    

    if (appointmentToCancel) {

      const payload = {
        date: appointmentToCancel.date,
        status: "Отменена",
        employeeId: appointmentToCancel.employee!.id,
        clientId: appointmentToCancel.client.id,
        serviceIds: appointmentToCancel.services.map((s: any) => s.service.id),
      };

      try {
        await updateAppointment({
          id: appointmentId,
          formData: payload,
        }).unwrap();
        refetchAppointments(); // Перезагружаем список записей
      } catch (error: any) {
        console.log(error.message);
        setErrorMessage("Ошибка при отмене записи. Попробуйте позже.");
      }
    }
  };

  if (!userId)
    return <div className={styles.errorMessage}>Ошибка: Пользователь не найден.</div>;
  if (isLoading)
    return <div className={styles.loadingMessage}>Загрузка...</div>;
  if (isError)
    return <div className={styles.errorMessage}>Ошибка загрузки клиента.</div>;

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <h1>Мой профиль</h1>
          <div className={styles.buttons}>
            <button
              className={styles.editButton}
              onClick={() => setOpenAppointmentForm(true)}>
              Запись на прием
            </button>
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
            <button className={styles.logoutButton} onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
        <p>Почта: {user?.email}</p>
        <hr className={styles.divider} />
        <ProfileEditForm
          initialData={localClient}
          onSubmit={handleFormSubmit}
          editMode={editMode}
        />
        {client && (
          <AppointmentsList
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment} 
          />
        )}
        {errorMessage && (
          <div className={styles.errorMessage}>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>

      {openAppointmentForm && client && (
        <AppointmentForm
          clientId={client?.id}
          open={openAppointmentForm}
          onClose={() => setOpenAppointmentForm(false)}
          onSave={(appointmentData) => {
            console.log(appointmentData);
            setOpenAppointmentForm(false);
            handleAppointmentFormSave();
          }}
          isAdding={true}
        />
      )}
    </div>
  );
};

export default ProfilePage;
