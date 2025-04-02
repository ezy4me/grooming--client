import { useEffect, useState } from "react";
import {
  Typography,
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { SelectChangeEvent } from "@mui/material";
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
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (appointment) {
      console.log(appointment);
      const [date, time] = appointment.date.split("T");
      setValue("date", date);
      setValue("time", time.slice(0, 5));
      setValue("status", appointment.status);
      setSelectedEmployee(appointment.employeeId);
      setSelectedClient(appointment.client.id);

      const serviceIds = appointment.services.map((s: any) => s.service.id);
      setValue("serviceIds", serviceIds);
      setSelectedServices(serviceIds);

      if (serviceIds.length > 0) {
        calculateTotalCost(serviceIds);
      } else {
        setTotalCost(0);
      }
    } else {
      setValue("date", "");
      setValue("time", "");
      setValue("status", "pending");
      setSelectedEmployee(0);
      setSelectedClient(null);
      setValue("serviceIds", []);
      setSelectedServices([]);
      setTotalCost(0);
    }
  }, [appointment, setValue]);

  const handleServiceChange = (event: SelectChangeEvent<number[]>) => {
    const selected = event.target.value as number[];
    setSelectedServices(selected);
    setValue("serviceIds", selected);
    calculateTotalCost(selected);
  };

  const handleEmployeeChange = (event: SelectChangeEvent<number>) => {
    setSelectedEmployee(Number(event.target.value));
    setValue("employeeId", Number(event.target.value));
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

    console.log("Submitted Data:", {
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
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, 
                      overflowY: 'auto',
                    },
                  },
                }}
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
                  <TextField
                    {...field}
                    label="Время"
                    fullWidth
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.time}
                    helperText={errors.time?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.employeeId}>
                <InputLabel>Сотрудник</InputLabel>
                <Select
                  value={selectedEmployee}
                  onChange={handleEmployeeChange}
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, 
                        overflowY: 'auto',
                      },
                    },
                  }}
                  label="Сотрудник">
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.fullName}
                    </MenuItem>
                  ))}
                </Select>
                {errors.employeeId && <span>{errors.employeeId.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.serviceIds}>
                <InputLabel>Услуги</InputLabel>
                <Select
                  multiple
                  value={selectedServices}
                  onChange={handleServiceChange} 
                  displayEmpty
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, 
                        overflowY: 'auto',
                      },
                    },
                  }}
                  input={<OutlinedInput label="Услуги" />}
                  renderValue={(selected) =>
                    selected
                      .map((id) => services.find((s) => s.id === id)?.name)
                      .join(", ")
                  }>
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>
                      <Checkbox
                        checked={selectedServices.indexOf(service.id) > -1}
                      />
                      <ListItemText
                        primary={`${service.name} (${service.price}₽)`}
                      />
                    </MenuItem>
                  ))}
                </Select>
                {errors.serviceIds && <span>{errors.serviceIds.message}</span>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                Итоговая стоимость: {totalCost}₽
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button sx={{borderRadius: 4}} onClick={onClose}>Отмена</Button>
            <Button sx={{borderRadius: 4}} variant="contained" type="submit">
              {isAdding ? "Добавить" : "Сохранить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};


export default AppointmentForm;
