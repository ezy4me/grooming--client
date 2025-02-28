import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Подтверждение",
  message = "Вы уверены, что хотите выполнить это действие?",
  confirmText = "Подтвердить",
  cancelText = "Отмена",
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 1 }}>
          <Typography variant="body1">{message}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={onClose} variant="contained">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          sx={{ bgcolor: "#ff642f" }}
          variant="contained"
          autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
