import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
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
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateString));
};

const AppointmentsTable: React.FC<any> = ({
  appointments,
  onEdit,
  onDelete,
  isLoading,
  isError,
}) => {
  const classes = useStyles(); 

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "date",
      headerName: "Дата",
      width: 200,
      valueGetter: (_, row) => formatDate(row.date),
    },
    { field: "status", headerName: "Статус", width: 150 },
    {
      field: "employee",
      headerName: "Сотрудник",
      width: 200,
      valueGetter: (_, row) => row.employee?.fullName || "-",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      width: 200,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Редактировать"
          onClick={() => onEdit(row)}
          color="primary"
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Удалить"
          onClick={() => onDelete(row.id)}
          color="error"
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography sx={{ mt: 1 }}>Загрузка...</Typography>
        </Box>
      ) : isError ? (
        <Typography color="error">Ошибка при загрузке данных.</Typography>
      ) : (
        <DataGrid
          rows={appointments}
          columns={columns}
          pageSizeOptions={[10, 20]}
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

export default AppointmentsTable;
