import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

function FormStepTitle({ children }: PropsWithChildren) {
  return (
    <Typography variant="h6" gutterBottom mb={3}>
      {children}
    </Typography>
  );
}

export default FormStepTitle;
