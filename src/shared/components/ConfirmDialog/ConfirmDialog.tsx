import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
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
    <Dialog
      sx={{ borderRadius: 4 }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm">
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "1.25rem",
          textTransform: "uppercase",
        }}>
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ py: 1 }}>
          <Typography variant="h6">{message}</Typography>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: 4 }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          sx={{ bgcolor: "#ff2f2f", borderRadius: 4 }}
          variant="contained"
          autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
