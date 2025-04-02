import {
  Typography,
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { modalStyle } from "../../../shared/modalStyle";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  isAdding: boolean;
  onSave: (newUser: {
    email: string;
    password: string;
    passwordRepeat: string;
    role: string;
  }) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Некорректный email").required("Email обязателен"),
  password: Yup.string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Пароли не совпадают")
    .required("Повторите пароль"),
  role: Yup.string().required("Роль обязательна"),
});

const UserForm = ({ open, onClose, isAdding, onSave }: UserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
      role: "user",
    },
  });

  const onSubmit = async (data: {
    email: string;
    password: string;
    passwordRepeat: string;
    role: string;
  }) => {
    await onSave(data);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6">
          {isAdding ? "Регистрация пользователя" : "Редактировать пользователя"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Пароль"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="passwordRepeat"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Повторите пароль"
                    fullWidth
                    error={!!errors.passwordRepeat}
                    helperText={errors.passwordRepeat?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Роль</InputLabel>
                    <Select {...field} label="Роль">
                      <MenuItem value="USER">Пользователь</MenuItem>
                      <MenuItem value="ADMIN">Администратор</MenuItem>
                      <MenuItem value="EMPLOYEE">Работник</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button sx={{ borderRadius: 4 }} onClick={onClose}>
              Отмена
            </Button>
            <Button sx={{ borderRadius: 4 }} variant="contained" type="submit">
              {isAdding ? "Зарегистрировать" : "Сохранить"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserForm;
