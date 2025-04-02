import { useEffect } from "react";
import { Typography, Modal, Box, Grid, Button, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { modalStyle } from "../../../shared/modalStyle";

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (categoryData: { name: string; description: string }) => void;
  category?: { name: string; description?: string };
  isAdding: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Название категории обязательно"),
  description: Yup.string()
    .max(255, "Описание не должно превышать 255 символов")
    .required("Описание категории обязательно"),
});

const CategoryForm = ({
  open,
  onClose,
  onSave,
  category,
  isAdding,
}: CategoryFormProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description || "");
    } else {
      setValue("name", "");
      setValue("description", "");
    }
  }, [category, setValue]);

  const onSubmit = (data: { name: string; description: string }) => {
    onSave({
      name: data.name,
      description: data.description || "",
    });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={modalStyle}>
        <Typography id="modal-title" variant="h6">
          {isAdding ? "Добавление категории" : "Редактирование категории"}
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
                    label="Название категории"
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

export default CategoryForm;
