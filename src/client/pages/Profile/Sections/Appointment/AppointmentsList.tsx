import React from "react";
import styles from "./AppointmentsList.module.css";
import {
  CalendarDays,
  BadgeCheck,
  User,
  Scissors,
  Phone,
  ImageIcon,
  XCircle, // Иконка для кнопки отмены
} from "lucide-react";

interface AppointmentsListProps {
  appointments: any;
  onCancelAppointment: (appointmentId: number) => void; // Функция для отмены записи
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
  onCancelAppointment,
}) => {
  if (!appointments || appointments.length === 0) {
    return <p className={styles.error}>Записей не найдено.</p>;
  }

  return (
    <div className={styles.appointmentsList}>
      <h2>Мои записи</h2>
      <ul>
        {appointments.map((appointment: any) => {
          const date = new Date(appointment.date).toLocaleString("ru-RU", {
            timeZone: "UTC",
          });

          const birthday = new Date(
            appointment.employee.birthday
          ).toLocaleDateString();

          const statusStyle =
            appointment.status === "Выполнена"
              ? styles.statusCompleted
              : appointment.status === "Отменена"
              ? styles.statusCancelled
              : styles.statusPending;

          return (
            <li key={appointment.id} className={styles.appointmentItem}>
              <p className={`${styles.appointmentDate} ${statusStyle}`}>
                <BadgeCheck size={18} /> <strong>Статус:</strong>{" "}
                {appointment.status}
              </p>

              <p>
                <CalendarDays size={18} /> <strong>Дата:</strong> {date}
              </p>

              <p>
                <User size={18} /> <strong>Сотрудник:</strong>{" "}
                {appointment.employee.fullName}
                <br />
                <Phone size={14} /> {appointment.employee.phone} | ДР:{" "}
                {birthday}
              </p>

              <p>
                <User size={18} /> <strong>Клиент:</strong>{" "}
                {appointment.client.name}
                <br />
                <Phone size={14} /> {appointment.client.phone}
              </p>

              <p>
                <Scissors size={18} /> <strong>Услуги:</strong>{" "}
                {appointment.services
                  .map(
                    (s: any) =>
                      `${s.service.name} (Цена: ${s.service.price} руб.)`
                  )
                  .join(", ")}
              </p>

              {appointment.image && (
                <p className={styles.imagePreview}>
                  <ImageIcon size={18} /> <strong>Изображение:</strong>
                  <img src={appointment.image.url} alt="Фото результата" />
                </p>
              )}

              {appointment.status !== "Выполнена" &&
                appointment.status !== "Отменена" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => onCancelAppointment(appointment.id)}>
                    <XCircle size={18} /> Отменить запись
                  </button>
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AppointmentsList;
