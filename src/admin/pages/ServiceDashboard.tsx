import { useState } from "react";
import { Typography, Button, Divider, Box, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../services/serviceService";
import ServiceTable from "../components/Tables/ServiceTable";
import ServiceForm from "../components/Forms/ServiceForm";
import ConfirmDialog from "../../shared/components/ConfirmDialog/ConfirmDialog";
import Notification from "../../shared/components/Notification/Notification"; 

const ServicesDashboard = () => {
  const {
    data: services = [],
    isLoading,
    isError,
    refetch,
  } = useGetServicesQuery();
  const [createService] = useCreateServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const [openServiceForm, setOpenServiceForm] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleOpenServiceForm = (service: any | null) => {
    setSelectedService(service);
    setIsAddingService(!service);
    setOpenServiceForm(true);
  };

  const handleCloseServiceForm = () => {
    setOpenServiceForm(false);
  };

  const handleSaveService = async (serviceData: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
  }) => {
    try {
      if (isAddingService) {
        await createService(serviceData).unwrap();
        setNotification({
          open: true,
          message: "Услуга добавлена",
          severity: "success",
        });
      } else if (selectedService) {
        await updateService({
          id: selectedService.id,
          ...serviceData,
        }).unwrap();
        setNotification({
          open: true,
          message: "Услуга обновлена",
          severity: "success",
        });
      }
      handleCloseServiceForm();
      refetch();
    } catch (error) {
      console.error("Ошибка сохранения услуги:", error);
      setNotification({
        open: true,
        message: "Ошибка сохранения",
        severity: "error",
      });
    }
  };

  const handleDeleteService = async () => {
    if (serviceToDelete !== null) {
      try {
        await deleteService(serviceToDelete).unwrap();
        setNotification({
          open: true,
          message: "Услуга удалена",
          severity: "success",
        });
        refetch();
      } catch (error) {
        console.error("Ошибка удаления услуги:", error);
        setNotification({
          open: true,
          message: "Ошибка удаления",
          severity: "error",
        });
      } finally {
        setConfirmOpen(false);
        setServiceToDelete(null);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setServiceToDelete(id);
    setConfirmOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          flexWrap: "wrap",
        }}>
        <Typography variant="h4">Услуги</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Поиск услуги"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            sx={{bgcolor: "#24dc13", borderRadius: 4}}
            startIcon={<Add />}
            onClick={() => handleOpenServiceForm(null)}>
            Добавить услугу
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <ServiceTable
        services={filteredServices}
        onEdit={handleOpenServiceForm}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
        isError={isError}
      />

      <ServiceForm
        open={openServiceForm}
        onClose={handleCloseServiceForm}
        onSave={handleSaveService}
        service={selectedService}
        isAdding={isAddingService}
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
        onConfirm={handleDeleteService}
        title="Удаление услуги"
        message="Вы уверены, что хотите удалить запись?"
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  );
};

export default ServicesDashboard;
