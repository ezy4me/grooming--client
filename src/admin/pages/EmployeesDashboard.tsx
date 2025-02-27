import { useState } from "react";
import { Typography, Button, Divider, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../services/employeeService";
import EmployeeForm from "../components/Forms/EmployeeForm";
import EmployeesTable from "../components/Tables/EmployeesTable";

const EmployeesDashboard = () => {
  const {
    data: employees = [],
    isLoading,
    isError,
    refetch,
  } = useGetEmployeesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const handleOpenEmployeeForm = (employee: any | null) => {
    setSelectedEmployee(employee);
    setIsAddingEmployee(!employee);
    setOpenEmployeeForm(true);
  };

  const handleCloseEmployeeForm = () => {
    setOpenEmployeeForm(false);
  };

  const handleSaveEmployee = async (employeeData: {
    fullName: string;
    phone: string;
    birthday: string;
    userId: number;
  }) => {
    try {
      if (isAddingEmployee) {
        await createEmployee(employeeData).unwrap();
      } else if (selectedEmployee) {
        await updateEmployee({
          id: selectedEmployee.id,
          ...employeeData,
        }).unwrap();
      }
      handleCloseEmployeeForm();
      refetch();
    } catch (error) {
      console.error("Ошибка сохранения сотрудника:", error);
    }
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
        <Typography variant="h4">Сотрудники</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenEmployeeForm(null)}>
          Добавить сотрудника
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <EmployeesTable
        employees={employees}
        onEdit={handleOpenEmployeeForm}
        onDelete={() => {}}
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
    </div>
  );
};

export default EmployeesDashboard;
