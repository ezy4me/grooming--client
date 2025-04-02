import React, { useState, useEffect } from "react";
import {
  Typography,
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { modalStyle } from "../../../shared/modalStyle";
import { useGetUsersQuery } from "../../../services/userService";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface EmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (employeeData: any) => void;
  employee?: {
    fullName: string;
    phone: string;
    birthday: string;
    userId: number;
    imageId?: number;
  };
  isAdding: boolean;
}

const MIN_AGE = 18;
const today = new Date();
const minBirthDate = new Date(
  today.getFullYear() - MIN_AGE,
  today.getMonth(),
  today.getDate()
);

const validationSchema = Yup.object({
  fullName: Yup.string().required("Полное имя обязательно"),
  phone: Yup.string()
    .required("Телефон обязателен")
    .matches(/^\+?[0-9]{10,15}$/, "Неверный формат телефона"),
  birthday: Yup.date()
    .required("Дата рождения обязательна")
    .max(minBirthDate, `Сотрудник должен быть старше ${MIN_AGE} лет`),
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { fullName: "", phone: "", birthday: new Date(), userId: 0 },
  });

  const { data: users, isLoading } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    email: string;
  } | null>(null);
  const [image, setImage] = useState<File | null>(null);

useEffect(() => {
  if (employee) {
    setValue("fullName", employee.fullName);
    setValue("phone", employee.phone);
    
    const formattedDate = new Date(employee.birthday); 
    setValue("birthday", formattedDate); 
    
    setValue("userId", employee.userId);

    const existingUser = users?.find((user) => user.id === employee.userId);
    setSelectedUser(existingUser || null);
  } else {
    setValue("fullName", "");
    setValue("phone", "");
    
    setValue("birthday", new Date()); 
    setValue("userId", 0);
    setSelectedUser(null);
  }
}, [employee, setValue, users]);
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const formValues = watch();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Отправляемые данные", formValues);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("phone", data.phone);
    formData.append("birthday", new Date(data.birthday).toISOString());
    formData.append("userId", String(data.userId));

    if (image) {
      formData.append("image", image);
    } else if (employee?.imageId) {
      formData.append("imageId", String(employee.imageId));
    }

    onSave(formData);
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
                render={() => (
                  <FormControl fullWidth error={!!errors.userId}>
                    <Autocomplete
                      options={users || []}
                      getOptionLabel={(option) => option.email}
                      value={selectedUser}
                      onChange={(_, newValue) => {
                        setSelectedUser(newValue);
                        setValue("userId", newValue ? newValue.id : 0);
                      }}
                      loading={isLoading}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Пользователь"
                          error={!!errors.userId}
                          helperText={errors.userId?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {isLoading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                      sx={{ maxHeight: 200, overflowY: "auto" }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}>
                Загрузить изображение
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
              {image && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {image.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button sx={{ borderRadius: 4 }} onClick={onClose}>
              Отмена
            </Button>
            <Button sx={{ borderRadius: 4 }} variant="contained" type="submit">
              {isAdding ? "Добавить" : "Сохранить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EmployeeForm;
