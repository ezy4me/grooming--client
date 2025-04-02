import { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetServicesQuery } from "../../../services/serviceService";
import { useGetEmployeesQuery } from "../../../services/employeeService";
import { useGetClientsQuery } from "../../../services/clientService";
import { modalStyle } from "../../../shared/modalStyle";

interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (appointmentData: any) => void;
  appointment?: any;
  isAdding: boolean;
}

const validationSchema = Yup.object({
  date: Yup.string().required("Дата обязательна"),
  time: Yup.string().required("Время обязательно"),
  status: Yup.string().required("Статус обязателен"),
  employeeId: Yup.number().required("ID сотрудника обязателен"),
  clientId: Yup.number().required("ID клиента обязателен"),
  serviceIds: Yup.array().min(1, "Выберите хотя бы одну услугу"),
});

const generateTimeSlots = () => {
  const times = [];
  for (let hour = 9; hour < 21; hour++) {
    times.push(`${hour.toString().padStart(2, "0")}:00`);
    times.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return times;
};

const AppointmentForm = ({
  open,
  onClose,
  onSave,
  appointment,
  isAdding,
}: AppointmentFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      date: "",
      time: "",
      status: "pending",
      employeeId: 0,
      clientId: 0,
      serviceIds: [],
    },
  });

  const { data: services = [] } = useGetServicesQuery();
  const { data: employees = [] } = useGetEmployeesQuery();
  const { data: clients = [] } = useGetClientsQuery();

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (appointment) {
      const [date, time] = appointment.date.split("T");
      setValue("date", date);
      setValue("time", time.slice(0, 5));
      setValue("status", appointment.status);
      setSelectedEmployee(appointment.employeeId);
      setSelectedClient(appointment.client.id);

      const serviceIds = appointment.services.map((s: any) => s.service.id);
      setValue("serviceIds", serviceIds);
      setSelectedServices(serviceIds);

      calculateTotalCost(serviceIds);
    } else {
      setValue("date", "");
      setValue("time", "");
      setValue("status", "pending");
      setSelectedEmployee(null);
      setSelectedClient(null);
      setValue("serviceIds", []);
      setSelectedServices([]);
      setTotalCost(0);
    }
  }, [appointment, setValue]);

  // const handleServiceChange = (event: SelectChangeEvent<number[]>) => {
  //   const selected = event.target.value as number[];
  //   setSelectedServices(selected);
  //   setValue("serviceIds", selected);
  //   calculateTotalCost(selected);
  // };

  const handleEmployeeChange = (event: any, newValue: any) => {
    setSelectedEmployee(newValue ? newValue.id : null);
    setValue("employeeId", newValue ? newValue.id : 0);
  };

  const handleClientChange = (event: any, newValue: any) => {
    setSelectedClient(newValue ? newValue.id : null);
    setValue("clientId", newValue ? newValue.id : 0);
  };

  const calculateTotalCost = (selectedServiceIds: number[]) => {
    const cost = selectedServiceIds.reduce((acc, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return acc + (service ? service.price : 0);
    }, 0);
    setTotalCost(cost);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const dateTime = new Date(`${data.date}T${data.time}:00Z`).toISOString();

    onSave({
      ...data,
      date: dateTime,
      serviceIds: selectedServices,
      clientId: selectedClient,
      employeeId: selectedEmployee,
    });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6">
          {isAdding ? "Добавить запись" : "Редактировать запись"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Autocomplete
                options={clients}
                getOptionLabel={(option) => option.name}
                value={clients.find((c) => c.id === selectedClient) || null}
                onChange={handleClientChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Клиент"
                    fullWidth
                    error={!!errors.clientId}
                    helperText={errors.clientId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Дата"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Время"
                    fullWidth
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: "auto" },
                      },
                    }}>
                    {generateTimeSlots().map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={employees}
                getOptionLabel={(option) => option.fullName}
                value={employees.find((e) => e.id === selectedEmployee) || null}
                onChange={handleEmployeeChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Сотрудник"
                    fullWidth
                    error={!!errors.employeeId}
                    helperText={errors.employeeId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={services}
                getOptionLabel={(option) => `${option.name} (${option.price}₽)`}
                value={services.filter((s) => selectedServices.includes(s.id))}
                onChange={(_, newValue) => {
                  const ids = newValue.map((s) => s.id);
                  setSelectedServices(ids);
                  setValue("serviceIds", ids);
                  calculateTotalCost(ids);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Услуги"
                    fullWidth
                    error={!!errors.serviceIds}
                    helperText={errors.serviceIds?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Итоговая стоимость: {totalCost}₽
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={onClose}>Отмена</Button>
            <Button variant="contained" type="submit">
              {isAdding ? "Добавить" : "Сохранить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AppointmentForm;
