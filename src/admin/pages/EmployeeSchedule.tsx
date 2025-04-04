import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { format, addDays, startOfToday, parseISO, subHours } from "date-fns";
import {
  useGetEmployeeByUserIdQuery,
  useGetEmployeeScheduleQuery,
} from "../../services/employeeService";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  useEffect(() => {
    if (employee) {
      setEmployeeId(employee.id);
    }
  }, [employee]);

  const { data: appointments = [] } = useGetEmployeeScheduleQuery({
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

  const handleOpenDialog = (appointment: any) => {
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <Box sx={{ padding: 2, width: "100%", borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom>
        Расписание сотрудника
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          width: "100%",
          flexWrap: "nowrap",
          borderRadius: 4,
        }}>
        <Box
          sx={{
            width: "100px",
            display: "flex",
            flexDirection: "column",
            borderRight: "0px solid #ccc",
            background: "#ffffff",
            flexShrink: 0,
          }}>
          <Box sx={{ height: "50px", borderBottom: "1px solid #ccc" }} />
          {getTimeSlots().map((slot) => (
            <Box
              key={slot}
              sx={{
                height: "50px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "#f5f5f5",
              }}>
              <Typography variant="body2">{slot}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            flexWrap: "nowrap",
            width: "100%",
          }}>
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
                  fontWeight: "bold",
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #ccc",
                }}>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  {format(new Date(day), "dd MMM")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}>
                {getTimeSlots().map((timeSlot) => {
                  const appointment = getAppointment(day, timeSlot);
                  return (
                    <Box
                      key={timeSlot}
                      sx={{
                        height: "calc(50px)",
                        borderBottom: "1px solid #ccc",
                        backgroundColor: appointment ? "#d81b60" : "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: appointment ? "pointer" : "default",
                      }}
                      onClick={() =>
                        appointment && handleOpenDialog(appointment)
                      }
                    />
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        sx={{
          borderRadius: 4,
        }}
        fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            textAlign: "center",
          }}>
          Информация о записи
        </DialogTitle>
        <DialogContent sx={{ padding: 3 }}>
          {selectedAppointment && (
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333" }}>
                Клиент:{" "}
                <span style={{ color: "#333" }}>
                  {selectedAppointment.client.name}
                </span>
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                <span style={{ fontWeight: "bold" }}>Услуга:</span>{" "}
                {selectedAppointment.services[0].service.name}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <span style={{ fontWeight: "bold" }}>Время:</span>{" "}
                {format(parseISO(selectedAppointment.date), "HH:mm")}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <span style={{ fontWeight: "bold" }}>Статус:</span>{" "}
                {selectedAppointment.status}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#d81b60",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#c2185b",
              },
            }}>
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeSchedule;
