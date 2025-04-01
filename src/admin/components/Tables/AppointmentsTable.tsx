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
      field: "client",
      headerName: "Клиент",
      width: 200,
      valueGetter: (_, row) => row.client?.name || "-",
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
      getActions: ({ row, id }) => {
        const isEven = Number(id) % 2 === 1;
        const rowColor = isEven ? "#f5f5f5" : "#ffffff";

        return [
          <GridActionsCellItem
            icon={
              <Edit
                sx={{
                  padding: 1,
                  borderRadius: "50%",
                  backgroundColor: rowColor,
                  color: "#0d0d0d",
                }}
              />
            }
            label="Редактировать"
            onClick={() => onEdit(row)}
          />,
          <GridActionsCellItem
            icon={
              <Delete
                sx={{
                  padding: 1,
                  borderRadius: "50%",
                  backgroundColor: rowColor,
                  color: "#ff1515",
                }}
              />
            }
            label="Удалить"
            onClick={() => onDelete(row.id)}
          />,
        ];
      },
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
      }}>
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress sx={{ color: "#ff3881" }} />
          <Typography sx={{ mt: 1 }}>Загрузка...</Typography>
        </Box>
      ) : isError ? (
        <Typography color="error">Ошибка при загрузке данных.</Typography>
      ) : (
        <DataGrid
          sx={{
            borderRadius: 4,
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:hover": {
              color: "#ff3881",
            },
          }}
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
