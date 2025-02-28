import { useState } from "react";
import { Typography, Divider, Box, TextField } from "@mui/material";
import { useGetClientsQuery } from "../../services/clientService";
import ClientsTable from "../components/Tables/ClientsTable";

const ClientsDashboard = () => {
  const { data: clients = [], isLoading, isError } = useGetClientsQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Typography variant="h4">Клиенты</Typography>
        <TextField
          label="Поиск клиента"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      <ClientsTable
        clients={filteredClients} 
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};

export default ClientsDashboard;
