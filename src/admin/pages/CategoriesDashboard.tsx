import { useState } from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../services/categoryService";
import CategoriesTable from "../components/Tables/CategoriesTable";
import CategoryForm from "../components/Forms/CategoryForm";
import ConfirmDialog from "../../shared/components/ConfirmDialog/ConfirmDialog";
import Notification from "../../shared/components/Notification/Notification";

const CategoriesDashboard = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleOpenCategoryForm = (category: any | null) => {
    setSelectedCategory(category);
    setIsAddingCategory(!category);
    setOpenCategoryForm(true);
  };

  const handleCloseCategoryForm = () => {
    setOpenCategoryForm(false);
  };

  const handleSaveCategory = async (categoryData: {
    name: string;
    description: string;
  }) => {
    try {
      if (isAddingCategory) {
        await createCategory(categoryData).unwrap();
        setNotification({
          open: true,
          message: "Категория добавлена",
          severity: "success",
        });
      } else if (selectedCategory) {
        await updateCategory({
          id: selectedCategory.id,
          ...categoryData,
        }).unwrap();
        setNotification({
          open: true,
          message: "Категория обновлена",
          severity: "success",
        });
      }
      handleCloseCategoryForm();
      refetch();
    } catch (error) {
      console.error("Ошибка сохранения категории:", error);
      setNotification({
        open: true,
        message: "Ошибка сохранения",
        severity: "error",
      });
    }
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete !== null) {
      try {
        await deleteCategory(categoryToDelete).unwrap();
        setNotification({
          open: true,
          message: "Категория удалена",
          severity: "success",
        });
        refetch();
      } catch (error) {
        console.error("Ошибка удаления категории:", error);
        setNotification({
          open: true,
          message: "Ошибка удаления",
          severity: "error",
        });
      } finally {
        setConfirmOpen(false);
        setCategoryToDelete(null);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
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
        <Typography variant="h4">Категории услуг</Typography>
        <Button
          variant="contained"
          sx={{bgcolor: "#24dc13", borderRadius: 4}}
          startIcon={<Add />}
          onClick={() => handleOpenCategoryForm(null)}>
          Добавить категорию
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <CategoriesTable
        categories={categories}
        onEdit={handleOpenCategoryForm}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
        isError={isError}
      />

      <CategoryForm
        open={openCategoryForm}
        onClose={handleCloseCategoryForm}
        onSave={handleSaveCategory}
        category={selectedCategory}
        isAdding={isAddingCategory}
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
        onConfirm={handleDeleteCategory}
        title="Удаление категории"
        message="Вы уверены, что хотите удалить запись?"
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  );
};

export default CategoriesDashboard;
