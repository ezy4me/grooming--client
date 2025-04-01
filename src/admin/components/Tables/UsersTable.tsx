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

const UsersTable: React.FC<any> = ({ users, isLoading, isError }) => {
  const classes = useStyles();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      align: "center",
      headerAlign: "center",
    },
    { field: "email", headerName: "Почта", width: 200 },
    { field: "role", headerName: "Роль", width: 150 },
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
          <CircularProgress sx={{ color: "#ff3881"}} />
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
          rows={users}
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

export default UsersTable;
