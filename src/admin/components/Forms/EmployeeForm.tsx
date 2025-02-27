import { useEffect } from "react";
import { Typography, Modal, Box, Grid, Button, TextField } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (employeeData: {
    fullName: string;
    phone: string;
    birthday: string; // Строка с датой в формате ISO
    userId: number;
  }) => void;
  employee?: {
    fullName: string;
    phone: string;
    birthday: string; // Строка с датой в формате ISO
    userId: number;
  };
  isAdding: boolean;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Полное имя обязательно"),
  phone: Yup.string().required("Телефон обязателен"),
  birthday: Yup.date().nullable().required("Дата рождения обязательна"),
  userId: Yup.number().required("ID пользователя обязателен"),
});

const EmployeeForm = ({
  open,
  onClose,
  onSave,
  employee,
  isAdding,
}: EmployeeFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { fullName: "", phone: "", birthday: undefined, userId: 0 },
  });

  useEffect(() => {
    if (employee) {
      setValue("fullName", employee.fullName);
      setValue("phone", employee.phone);
      setValue("birthday", new Date(employee.birthday));
      setValue("userId", employee.userId);
    } else {
      setValue("fullName", "");
      setValue("phone", "");
      setValue("birthday", new Date());
      setValue("userId", 0);
    }
  }, [employee, setValue]);

  const onSubmit: SubmitHandler<{
    fullName: string;
    phone: string;
    birthday: any; 
    userId: number;
  }> = (data) => {
    const formattedData = {
      ...data,
      birthday: new Date(data.birthday).toISOString(), 
    };
    onSave(formattedData); 
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6">
          {isAdding ? "Добавить сотрудника" : "Редактировать сотрудника"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Полное имя"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Телефон"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="birthday"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Дата рождения"
                    fullWidth
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.birthday}
                    helperText={errors.birthday?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ID пользователя"
                    fullWidth
                    error={!!errors.userId}
                    helperText={errors.userId?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}>
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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default EmployeeForm;
