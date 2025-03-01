import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, CircularProgress, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  "even-row": {
    backgroundColor: "#f5f5f5",
  },
  "odd-row": {
    backgroundColor: "#ffffff",
  },
});

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ru-RU").format(date);
};

const ClientsTable: React.FC<any> = ({ clients, isLoading, isError }) => {
  const classes = useStyles();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    { field: "name", headerName: "Имя", width: 200 },
    { field: "phone", headerName: "Телефон", width: 150 },
    {
      field: "user",
      headerName: "Почта",
      width: 150,
      valueGetter: (_, row) => row.user?.email || "-",
    },
    {
      field: "createdAt",
      headerName: "Дата создания",
      width: 150,
      valueGetter: (_, row) => formatDate(row.user?.createdAt),
    },
  ];

  return (
    <Box
      sx={{
        height: '100%',
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Загрузка...</Typography>
        </Box>
      ) : isError ? (
        <Typography color="error">Ошибка при загрузке данных.</Typography>
      ) : (
        <DataGrid
          rows={clients}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[20]}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? classes["even-row"]
              : classes["odd-row"]
          }
        />
      )}
    </Box>
  );
};

export default ClientsTable;
