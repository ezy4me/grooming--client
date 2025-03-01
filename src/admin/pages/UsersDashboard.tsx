import { useState } from "react";
import { Typography, Divider, Box, TextField, Button } from "@mui/material";
import { useGetUsersQuery } from "../../services/userService"; 
import UsersTable from "../components/Tables/UsersTable";
import UserForm from "../components/Forms/UserForm";
import { useRegisterMutation } from "../../services/authApi"; 

const UsersDashboard = () => {
  const { data: users = [], isLoading, isError, refetch } = useGetUsersQuery();
  const [registerUser] = useRegisterMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [openUserForm, setOpenUserForm] = useState(false);
  const [isAdding, setIsAdding] = useState(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenUserForm = () => {
    setIsAdding(true);
    setOpenUserForm(true);
  };

  const handleCloseUserForm = () => {
    setOpenUserForm(false);
  };

  const handleSaveUser = async (newUser: {
    email: string;
    password: string;
    passwordRepeat: string;
    role: string;
  }) => {
    try {
      await registerUser(newUser).unwrap();
      refetch();
      handleCloseUserForm();
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          flexWrap: "wrap",
        }}>
        <Typography variant="h4">Пользователи</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Поиск пользователя"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{bgcolor: "#24dc13"}}
            onClick={handleOpenUserForm}>
            Добавить пользователя
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <UsersTable
        users={filteredUsers}
        isLoading={isLoading}
        isError={isError}
      />

      <UserForm
        open={openUserForm}
        onClose={handleCloseUserForm}
        isAdding={isAdding}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UsersDashboard;
