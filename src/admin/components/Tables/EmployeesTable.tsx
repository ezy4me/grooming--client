import React from "react";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { Edit, Delete } from "@mui/icons-material";
import { Typography, CircularProgress, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageCell from "../../../shared/components/ImageCell/ImageCell";

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

const EmployeesTable: React.FC<any> = ({
  employees,
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
      field: "image",
      headerName: "Фото",
      width: 150,
      renderCell: (params) => {
        const employeeId = params.row.id;
        const imageUrl = `http://localhost:3000/employee/${employeeId}/image`;
        return (
          <ImageCell
            imageUrl={imageUrl}
            defaultImage="/paws_1.png"
            altText="Employee Image"
            size={50}
          />
        );
      },
    },
    { field: "fullName", headerName: "Имя", width: 200 },
    { field: "phone", headerName: "Телефон", width: 150 },
    {
      field: "birthday",
      headerName: "День рождения",
      width: 150,
      valueGetter: (_, row) => formatDate(row.birthday),
    },
    {
      field: "user",
      headerName: "Почта",
      width: 150,
      valueGetter: (_, row) => row.user?.email || "-",
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
          rows={employees}
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

export default EmployeesTable;
