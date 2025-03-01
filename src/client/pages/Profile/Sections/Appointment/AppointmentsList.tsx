import React from "react";
import styles from "./AppointmentsList.module.css";
import { useGetAppointmentsByClientIdQuery } from "../../../../../services/appointmentService";

interface AppointmentsListProps {
  clientId: number;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ clientId }) => {
  const {
    data: appointments,
    isLoading,
    isError,
  } = useGetAppointmentsByClientIdQuery(clientId, { skip: !clientId });

  if (isLoading) {
    return <p className={styles.loading}>Загрузка записей...</p>;
  }

  if (isError || !appointments || appointments.length === 0) {
    return <p className={styles.error}>Записей не найдено.</p>;
  }

  return (
    <div className={styles.appointmentsList}>
      <h2>Мои записи</h2>
      <ul>
        {appointments.map((appointment: any) => (
          <li key={appointment.id} className={styles.appointmentItem}>
            <p>
              <strong>Дата:</strong> {appointment.date}
            </p>
            <p>
              <strong>Статус:</strong> {appointment.status}
            </p>
            <p>
              <strong>Сотрудник:</strong> {appointment.employee.name}
            </p>
            <p>
              <strong>Услуги:</strong>{" "}
              {appointment.services.map((s: any) => s.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentsList;
