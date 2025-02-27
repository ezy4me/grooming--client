import { Typography, Divider, Box } from "@mui/material";
import { useGetClientsQuery } from "../../services/clientService";
import ClientsTable from "../components/Tables/ClientsTable";

const ClientsDashboard = () => {
  const { data: clients = [], isLoading, isError } = useGetClientsQuery();

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
        <Typography variant="h4">Клиенты</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <ClientsTable clients={clients} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default ClientsDashboard;
