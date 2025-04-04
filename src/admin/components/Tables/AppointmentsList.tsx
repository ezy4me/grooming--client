import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

interface Appointment {
  id: number;
  date: string;
  client: {
    name: string;
    phone: string;
  };
  services: {
    service: {
      name: string;
      price: number;
    };
  }[];
  status: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  appointments,
}) => {
  console.log(appointments);

  return (
    <Grid container spacing={2}>
      {appointments.length > 0 ? (
        appointments.map((appointment: Appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">
                  {format(new Date(appointment.date), "dd MMM yyyy HH:mm")}
                </Typography>
                <Typography variant="body2">
                  {appointment.client.name}
                </Typography>
                <Typography variant="body2">
                  Телефон: {appointment.client.phone}
                </Typography>
                <Typography variant="body2">
                  Услуга:{" "}
                  {appointment.services
                    .map((service) => service.service.name)
                    .join(", ")}
                </Typography>
                <Typography variant="body2">
                  Цена: {appointment.services[0].service.price} руб.
                </Typography>
                <Typography
                  variant="body2"
                  color={appointment.status === "pending" ? "orange" : "green"}>
                  Статус: {appointment.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          Записи не найдены.
        </Typography>
      )}
    </Grid>
  );
};

export default AppointmentsList;
