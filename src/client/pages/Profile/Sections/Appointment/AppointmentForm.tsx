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
import { useGetServicesQuery } from "../../../../../services/serviceService";
import { useGetEmployeesQuery } from "../../../../../services/employeeService";
import { useGetAvailableSlotsQuery } from "../../../../../services/appointmentService";
import { useCreateAppointmentMutation } from "../../../../../services/appointmentService";
import { modalStyle } from "../../../../../shared/modalStyle";

interface AppointmentFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (appointmentData: any) => void;
  appointment?: any;
  isAdding: boolean;
  clientId: number;
}

const validationSchema = Yup.object({
  date: Yup.string().required("Дата обязательна"),
  time: Yup.string().required("Время обязательно"),
  status: Yup.string().required("Статус обязателен"),
  employeeId: Yup.number().required("ID сотрудника обязателен"),
  serviceIds: Yup.array().min(1, "Выберите хотя бы одну услугу"),
});

const AppointmentForm = ({
  open,
  onClose,
  onSave,
  appointment,
  isAdding,
  clientId,
}: AppointmentFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      time: "",
      status: "Создана",
      employeeId: 0,
      serviceIds: [],
    },
  });

  const { data: services = [] } = useGetServicesQuery();
  const { data: employees = [] } = useGetEmployeesQuery();

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  const { data: availableSlotsData } = useGetAvailableSlotsQuery(
    {
      date: getValues("date"),
      employeeId: selectedEmployee ? Number(selectedEmployee) : 0,
    },
    {
      skip: !selectedEmployee || !getValues("date"),
    }
  );

  const [createAppointment, { isLoading: isCreating }] =
    useCreateAppointmentMutation();

  useEffect(() => {
    if (selectedEmployee && getValues("date")) {
      setIsLoadingSlots(true);
      setAvailableSlots(availableSlotsData || []);
      setIsLoadingSlots(false);
    }
  }, [selectedEmployee, getValues("date"), availableSlotsData]);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (appointment) {
      const [date, time] = appointment.date.split("T");
      setValue("date", date);
      setValue("time", time.slice(0, 5));
      setValue("status", appointment.status);
      setSelectedEmployee(appointment.employeeId);

      const serviceIds = appointment.services.map((s: any) => s.service.id);
      setValue("serviceIds", serviceIds);
      setSelectedServices(serviceIds);

      calculateTotalCost(serviceIds);
    } else {
      setValue("date", new Date().toISOString().split("T")[0]);
      setValue("time", "");
      setValue("status", "Создана");
      setSelectedEmployee(null);
      setValue("serviceIds", []);
      setSelectedServices([]);
      setTotalCost(0);
    }
  }, [appointment, setValue]);

  const handleDateChange = (date: string) => {
    setValue("date", date);
    if (selectedEmployee && date) {
      setIsLoadingSlots(true);
      setAvailableSlots(availableSlotsData || []);
      setIsLoadingSlots(false);
      setStep(1);
      setValue("time", "");
    }
  };

  const handleEmployeeChange = (event: any, newValue: any) => {
    setSelectedEmployee(newValue ? newValue.id : null);
    setValue("employeeId", newValue ? newValue.id : 0);
    setStep(2);
    setValue("time", "");
  };

  const calculateTotalCost = (selectedServiceIds: number[]) => {
    const cost = selectedServiceIds.reduce((acc, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return acc + (service ? service.price : 0);
    }, 0);
    setTotalCost(cost);
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    const dateTime = new Date(`${data.date}T${data.time}Z`).toISOString();

    try {
      await createAppointment({
        ...data,
        date: dateTime,
        serviceIds: selectedServices,
        clientId: clientId,
        employeeId: selectedEmployee,
      }).unwrap();
      onSave(data);
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
    }
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
              <TextField
                label="Клиент"
                value={`Клиент #${clientId}`}
                fullWidth
                disabled
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
                    onChange={(e) => handleDateChange(e.target.value)}
                    disabled={step > 0}
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
                    disabled={!selectedEmployee || step < 2}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 250, overflowY: "auto" },
                      },
                    }}>
                    {isLoadingSlots ? (
                      <MenuItem disabled>Загрузка...</MenuItem>
                    ) : (
                      availableSlots.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))
                    )}
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
                    disabled={step < 1}
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
                    disabled={step < 3}
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
            <Button variant="contained" type="submit" disabled={isCreating}>
              {isAdding ? "Добавить" : "Сохранить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AppointmentForm;
