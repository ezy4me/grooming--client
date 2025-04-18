import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { GetApp } from "@mui/icons-material";
import { Typography, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useGenerateClientAppointmentReportMutation } from "../../../services/clientService";

const useStyles = makeStyles({
  "even-row": {
    backgroundColor: "#f5f5f5",
  },
  "odd-row": {
    backgroundColor: "#ffffff",
  },
});

const ClientsTable: React.FC<any> = ({ clients, isLoading, isError }) => {
  const classes = useStyles();

  const [generateClientAppointmentReport] = useGenerateClientAppointmentReportMutation(); 

  const handleGenerateReport = async (clientId: number) => {
    try {
      const reportBlob: any = await generateClientAppointmentReport(
        clientId
      ).unwrap();
      const url = URL.createObjectURL(reportBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Записи Клиента_${clientId}.docx`;
      link.click();
      URL.revokeObjectURL(url); 
    } catch (error) {
      console.error("Ошибка при получении отчета:", error);
    }
  };

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
    {
      field: "actions",
      type: "actions",
      headerName: "Отчет",
      width: 200,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<GetApp />}
          label="Отчет"
          onClick={() => handleGenerateReport(row.id)}
          color="primary"
        />,
      ],
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ru-RU").format(date);
  };

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
