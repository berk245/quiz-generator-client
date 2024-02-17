import { Backdrop, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

export const SuccessBackdrop = ({ isSuccess }: { isSuccess: boolean }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isSuccess}
    >
      <Paper sx={{ padding: "1.5rem 2rem" }}>
        <Grid
          direction="column"
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
          display="flex"
          gap={"1rem"}
        >
          <CheckCircle color="success" sx={{ opacity: 1, fontSize: "3rem" }} />
          <Grid
            direction="column"
            display="flex"
            gap={"0.75rem"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography sx={{ fontSize: "0.9rem" }}>
              Quiz created successfully. You will be redirected to the quiz
              details page in a moment.
            </Typography>
            <Typography sx={{ fontSize: "0.8rem" }}>
              Please click <a href="/quizzes">here</a> if redirection does not
              work.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Backdrop>
  );
};
