import React from "react";
import styles from "./AppointmentsList.module.css";

interface AppointmentsListProps {
  appointments: any; 
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return <p className={styles.error}>Записей не найдено.</p>;
  }

  return (
    <div className={styles.appointmentsList}>
      <h2>Мои записи</h2>
      <ul>
        {appointments.map((appointment: any) => (
          <li key={appointment.id} className={styles.appointmentItem}>
            <p>
              <strong>Дата:</strong>{" "}
              {new Date(appointment.date).toLocaleString('ru-RU', { timeZone: 'UTC' })}
            </p>
            <p>
              <strong>Статус:</strong> {appointment.status}
            </p>
            <p>
              <strong>Сотрудник:</strong> {appointment.employee.fullName}{" "}
              (Телефон: {appointment.employee.phone}, Дата рождения:{" "}
              {new Date(appointment.employee.birthday).toLocaleDateString()})
            </p>
            <p>
              <strong>Клиент:</strong> {appointment.client.name} (Телефон:{" "}
              {appointment.client.phone})
            </p>
            <p>
              <strong>Услуги:</strong>{" "}
              {appointment.services
                .map(
                  (service: any) =>
                    `${service.service.name} (Цена: ${service.service.price} руб.)`
                )
                .join(", ")}
            </p>
            {appointment.image && (
              <p>
                <strong>Изображение:</strong>{" "}
                <img src={appointment.image.url} alt="Image" />
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
