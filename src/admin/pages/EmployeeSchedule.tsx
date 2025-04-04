import React, { useState, useEffect } from "react";
import { Box, Typography, Modal, Button, Divider } from "@mui/material";
import { format, addDays, startOfToday, parseISO, subHours } from "date-fns";
import {
  useGetEmployeeByUserIdQuery,
  useGetEmployeeScheduleQuery,
} from "../../services/employeeService";
import { useUpdateAppointmentMutation } from "../../services/appointmentService";
import { User, Scissors, Clock, CalendarCheck } from "lucide-react";
import { modalStyle } from "../../shared/modalStyle";

const EmployeeSchedule: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  const { data: employee, isLoading } = useGetEmployeeByUserIdQuery(
    Number(userId)
  );
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [dateRange] = useState<{ start: string; end: string }>({
    start: format(startOfToday(), "yyyy-MM-dd"),
    end: format(addDays(startOfToday(), 30), "yyyy-MM-dd"),
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const [updateAppointment] = useUpdateAppointmentMutation();

  useEffect(() => {
    if (employee) {
      setEmployeeId(employee.id);
    }
  }, [employee]);

  const {
    data: appointments = [],
    refetch: refetchAppointments,
  } = useGetEmployeeScheduleQuery({
    employeeId: employeeId ?? 0,
    start: dateRange.start,
    end: dateRange.end,
  });

  const getMonthDays = () => {
    const days = [];
    const startDate = startOfToday();
    for (let i = 0; i < 30; i++) {
      days.push(format(addDays(startDate, i), "yyyy-MM-dd"));
    }
    return days;
  };

  const getTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 21; i++) {
      slots.push(`${i}:00`);
      if (i !== 21) slots.push(`${i}:30`);
    }
    return slots;
  };

  const getAppointment = (day: string, time: string) => {
    return appointments.find((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      const adjustedDate = subHours(appointmentDate, 3);
      const adjustedDateTime = format(adjustedDate, "yyyy-MM-dd H:mm");
      const cellDateTime = `${day} ${time}`;
      return adjustedDateTime === cellDateTime;
    });
  };

  const handleOpenModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMarkAsCompleted = async () => {
    if (!selectedAppointment) return;

    const payload = {
      date: selectedAppointment.date,
      status: "Выполнена",
      employeeId: employee!.id,
      clientId: selectedAppointment.client.id,
      serviceIds: selectedAppointment.services.map((s: any) => s.service.id),
    };

    try {
      await updateAppointment({
        id: selectedAppointment.id,
        formData: payload,
      }).unwrap();

      await refetchAppointments();
      setSelectedAppointment(null);
      handleCloseModal();
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <Box sx={{ padding: 2, width: "100%", borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom>
        Расписание сотрудника
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          flexWrap: "nowrap",
        }}>
        <Box
          sx={{
            width: "100px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}>
          <Box sx={{ height: "50px" }} />
          {getTimeSlots().map((slot) => (
            <Box
              key={slot}
              sx={{
                height: "50px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}>
              <Typography variant="body2">{slot}</Typography>
            </Box>
          ))}
        </Box>

        {getMonthDays().map((day) => (
          <Box
            key={day}
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "100px",
              borderLeft: "2px solid #ccc",
              flexShrink: 0,
            }}>
            <Box
              sx={{
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
              }}>
              <Typography variant="body2">
                {format(new Date(day), "dd MMM")}
              </Typography>
            </Box>
            {getTimeSlots().map((timeSlot) => {
              const appointment = getAppointment(day, timeSlot);
              return (
                <Box
                  key={timeSlot}
                  sx={{
                    height: "50px",
                    borderBottom: "1px solid #ccc",
                    backgroundColor: appointment ? "#d81b60" : "#fff",
                    cursor: appointment ? "pointer" : "default",
                  }}
                  onClick={() => appointment && handleOpenModal(appointment)}
                />
              );
            })}
          </Box>
        ))}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedAppointment && (
            <Box>
              <Typography
                variant="h6"
                sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                Информация о записи
              </Typography>

              <Box display="flex" alignItems="center" mb={1}>
                <User size={20} style={{ marginRight: 8 }} />
                <Typography>
                  Клиент: {selectedAppointment.client.name}
                </Typography>
              </Box>

              <Box display="flex" alignItems="flex-start" mb={1}>
                <Scissors size={20} style={{ marginRight: 8, marginTop: 4 }} />
                <Box>
                  <Typography>Услуги:</Typography>
                  {selectedAppointment.services.map((serviceItem: any) => (
                    <Typography key={serviceItem.id} sx={{ ml: 2 }}>
                      - {serviceItem.service.name}
                    </Typography>
                  ))}
                </Box>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <Clock size={20} style={{ marginRight: 8 }} />
                <Typography>
                  Время: {format(parseISO(selectedAppointment.date), "HH:mm")}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                <CalendarCheck size={20} style={{ marginRight: 8 }} />
                <Typography>Статус: {selectedAppointment.status}</Typography>
              </Box>

              <Box textAlign="center" mb={1}>
                <Button
                  variant="contained"
                  onClick={handleMarkAsCompleted}
                  sx={{
                    backgroundColor: "#57db5b",
                    "&:hover": { backgroundColor: "#45b64a" },
                    color: "#fff",
                    marginRight: 2,
                  }}>
                  Отметить как выполнено
                </Button>
              </Box>

              <Box textAlign="center">
                <Button
                  variant="contained"
                  onClick={handleCloseModal}
                  sx={{
                    backgroundColor: "#d81b60",
                    "&:hover": { backgroundColor: "#c2185b" },
                    color: "#fff",
                  }}>
                  Закрыть
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default EmployeeSchedule;
