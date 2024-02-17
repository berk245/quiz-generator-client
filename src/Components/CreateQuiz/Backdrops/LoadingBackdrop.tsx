import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingBackdrop = ({ isPending }: { isPending: boolean }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
      }}
      open={isPending}
    >
      <CircularProgress color="inherit" />
      <br />
      <span>Creating your quiz</span>
    </Backdrop>
  );
};
