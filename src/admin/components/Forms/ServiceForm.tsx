import { useEffect } from "react";
import {
  Typography,
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetCategoriesQuery } from "../../../services/categoryService";

interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (serviceData: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
  }) => void;
  service?: {
    name: string;
    description?: string;
    price: number;
    categoryId: number;
  };
  isAdding: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Название услуги обязательно"),
  description: Yup.string()
    .max(255, "Описание не должно превышать 255 символов")
    .required("Описание услуги обязательно"),
  price: Yup.number()
    .positive("Цена должна быть положительной")
    .required("Цена обязательна"),
  categoryId: Yup.number().required("Категория обязательна"),
});

const ServiceForm = ({
  open,
  onClose,
  onSave,
  service,
  isAdding,
}: ServiceFormProps) => {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { name: "", description: "", price: 0, categoryId: 0 },
  });

  useEffect(() => {
    if (service) {
      setValue("name", service.name);
      setValue("description", service.description || "");
      setValue("price", service.price);
      setValue("categoryId", service.categoryId);
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("price", 0);
      setValue("categoryId", 0);
    }
  }, [service, setValue]);

  const onSubmit = (data: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
  }) => {
    onSave(data);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6">
          {isAdding ? "Добавление услуги" : "Редактирование услуги"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Название услуги"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Описание"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Цена"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.categoryId}>
                    <InputLabel>Категория</InputLabel>
                    <Select {...field} label="Категория">
                      {categoriesLoading ? (
                        <MenuItem disabled>Загрузка...</MenuItem>
                      ) : (
                        categories.map(
                          (category: { id: number; name: string }) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          )
                        )
                      )}
                    </Select>
                  </FormControl>
                )}
              />
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

export default ServiceForm;
