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
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Название категории", width: 200 },
    { field: "description", headerName: "Описание категории", width: 200 },
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
    <div
      style={{
        height: 400,
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
    </div>
  );
};

export default CategoryTable;
