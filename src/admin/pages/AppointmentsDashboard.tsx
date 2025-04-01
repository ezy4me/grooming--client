import { useState } from "react";
import { Typography, Box, Button, TextField, Divider } from "@mui/material";
import {
  useGetAllAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "../../services/appointmentService";
import AppointmentsTable from "../components/Tables/AppointmentsTable";
import AppointmentForm from "../components/Forms/AppointmentForm";
import Notification from "../../shared/components/Notification/Notification";
import ConfirmDialog from "../../shared/components/ConfirmDialog/ConfirmDialog";
import Add from "@mui/icons-material/Add";

const AppointmentsDashboard = () => {
  const {
    data: appointments = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllAppointmentsQuery();
  const [createAppointment] = useCreateAppointmentMutation();
  const [updateAppointment] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();

  const [openForm, setOpenForm] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  const handleSave = async (data: any) => {
    try {
      if (isAdding) {
        await createAppointment(data).unwrap();
        setNotification({
          open: true,
          message: "Запись добавлена",
          severity: "success",
        });
      } else {
        console.log(data)
        await updateAppointment({ id: selectedAppointment.id, formData: {...data} }).unwrap();
        setNotification({
          open: true,
          message: "Запись обновлена",
          severity: "success",
        });
      }
      refetch();
      setOpenForm(false);
    } catch (error: any) {
      setNotification({
        open: true,
        message: `Ошибка при сохранении ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setAppointmentToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteAppointment = async () => {
    if (appointmentToDelete !== null) {
      try {
        await deleteAppointment(appointmentToDelete).unwrap();
        setNotification({
          open: true,
          message: "Запись удалена",
          severity: "success",
        });
        refetch();
      } catch (error: any) {
        setNotification({
          open: true,
          message: `Ошибка при удалении ${error.message}`,
          severity: "error",
        });
      } finally {
        setConfirmOpen(false);
        setAppointmentToDelete(null);
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          py: 1,
          px: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4">Записи</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Поиск записи"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 300, borderRadius: 4 }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#24dc13", borderRadius: 4 }}
            startIcon={<Add />}
            onClick={() => {
              setOpenForm(true);
              setIsAdding(true);
            }}
          >
            Добавить запись
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <AppointmentsTable
        appointments={filteredAppointments}
        onEdit={(appointment: any) => {
          setSelectedAppointment(appointment);
          setIsAdding(false);
          setOpenForm(true);
        }}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
        isError={isError}
      />

      <AppointmentForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleSave}
        appointment={selectedAppointment}
        isAdding={isAdding}
      />

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteAppointment}
        title="Удаление записи"
        message="Вы уверены, что хотите удалить запись?"
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  );
};

export default AppointmentsDashboard;
