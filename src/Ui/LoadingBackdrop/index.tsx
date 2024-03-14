import { CheckCircleRounded } from "@mui/icons-material";
import { Alert, Backdrop, CircularProgress } from "@mui/material";

const LoadingBackdrop = ({
  isPending,
  isSubmitSuccess,
  isError,
  successText,
  errorText,
}: {
  isPending: boolean;
  isSubmitSuccess: boolean;
  isError: boolean;
  successText: string;
  errorText: string;
}) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: 2 }}
      open={isPending || isSubmitSuccess || isError}
    >
      {isPending && <CircularProgress size={60} thickness={4} />}
      {isSubmitSuccess && (
        <Alert
          icon={<CheckCircleRounded fontSize="inherit" />}
          severity="success"
        >
          {successText}
        </Alert>
      )}

      {isError && <Alert severity="error">{errorText}</Alert>}
    </Backdrop>
  );
};

export default LoadingBackdrop;
