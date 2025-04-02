import { useState } from "react";
import { Typography, Divider, Box, TextField, Button } from "@mui/material";
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../services/employeeService";
import EmployeeForm from "../components/Forms/EmployeeForm";
import EmployeesTable from "../components/Tables/EmployeesTable";
import Notification from "../../shared/components/Notification/Notification";
import ConfirmDialog from "../../shared/components/ConfirmDialog/ConfirmDialog";
import Add from "@mui/icons-material/Add";

const EmployeesDashboard = () => {
  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
  } = useGetEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  const handleOpenEmployeeForm = (employee: any | null) => {
    setSelectedEmployee(employee);
    setIsAddingEmployee(!employee);
    setOpenEmployeeForm(true);
  };

  const handleCloseEmployeeForm = () => {
    setOpenEmployeeForm(false);
  };

  const handleSaveEmployee = async (employeeData: any) => {
    try {
      if (isAddingEmployee) {
        await createEmployee(employeeData).unwrap();
        setNotification({
          open: true,
          message: "Сотрудник добавлен",
          severity: "success",
        });
      } else if (selectedEmployee) {
        console.log(employeeData);

        await updateEmployee({
          id: selectedEmployee.id,
          data: employeeData,
        }).unwrap();
        setNotification({
          open: true,
          message: "Сотрудник обновлён",
          severity: "success",
        });
      }
      handleCloseEmployeeForm();
      refetch();
    } catch (error: any) {
      console.log(error);
      setNotification({
        open: true,
        message: "Ошибка сохранения",
        severity: "error",
      });
    }
  };

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteEmployee = async () => {
    if (employeeToDelete !== null) {
      try {
        await deleteEmployee(employeeToDelete).unwrap();
        setNotification({
          open: true,
          message: "Сотрудник удалён",
          severity: "success",
        });
        refetch();
      } catch (error: any) {
        console.log(error.message);
        setNotification({
          open: true,
          message: "Ошибка при удалении",
          severity: "error",
        });
      } finally {
        setConfirmOpen(false);
        setEmployeeToDelete(null);
      }
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Typography variant="h4">Сотрудники</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Поиск сотрудника"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />

          <Button
            variant="contained"
            sx={{ bgcolor: "#24dc13", borderRadius: 4 }}
            startIcon={<Add />}
            onClick={() => handleOpenEmployeeForm(null)}>
            Добавить
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <EmployeesTable
        employees={filteredEmployees}
        onEdit={handleOpenEmployeeForm}
        onDelete={handleDeleteClick}
        isLoading={isLoading}
        isError={isError}
      />

      <EmployeeForm
        open={openEmployeeForm}
        onClose={handleCloseEmployeeForm}
        onSave={handleSaveEmployee}
        employee={selectedEmployee}
        isAdding={isAddingEmployee}
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
        onConfirm={handleDeleteEmployee}
        title="Удаление сотрудника"
        message="Вы уверены, что хотите удалить сотрудника?"
        confirmText="Удалить"
        cancelText="Отмена"
      />
    </div>
  );
};

export default EmployeesDashboard;
