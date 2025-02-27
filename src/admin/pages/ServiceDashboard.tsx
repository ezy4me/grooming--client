import { useState } from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
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
      } else if (selectedService) {
        await updateService({
          id: selectedService.id,
          ...serviceData,
        }).unwrap();
      }
      handleCloseServiceForm();
      refetch();
    } catch (error) {
      console.error("Ошибка сохранения услуги:", error);
    }
  };

  const handleDeleteService = async () => {
    if (serviceToDelete !== null) {
      try {
        await deleteService(serviceToDelete).unwrap();
        refetch();
      } catch (error) {
        console.error("Ошибка удаления услуги:", error);
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
        }}>
        <Typography variant="h4">Услуги</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenServiceForm(null)}>
          Добавить услугу
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <ServiceTable
        services={services}
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
