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

const CategoryTable: React.FC<any> = ({
  categories,
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
    { field: "name", headerName: "Название категории", width: 200 },
    { field: "description", headerName: "Описание категории", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Действия",
      width: 200,
      getActions: ({ row }) => {
        const isEven = Number(row.indexRelativeToCurrentPage) % 2 === 0;
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
          rows={categories}
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

export default CategoryTable;
