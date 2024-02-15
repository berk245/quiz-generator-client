import * as React from "react";
import Typography from "@mui/material/Typography";
import FormActions from "./FormActions";
import QuizInfoForm from "./QuizInfoForm";
import { Grid } from "@mui/material";

interface CreateQuizFormProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleInputChange: (field: string, value: string | File[] | string[]) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateQuizForm({
  activeStep,
  setActiveStep,
  handleInputChange,
  handleFileChange,
}: CreateQuizFormProps) {
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <QuizInfoForm
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        );
      case 1:
        return <></>;
      case 2:
        return <></>;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Grid
      container
      justifyContent={"center"}
      minHeight={"10rem"}
      gap={"1rem"}
      alignContent={"space-between"}
      padding={"0 2rem"}
    >
      <Grid item xs={11}>
        {getStepContent(activeStep)}
      </Grid>
      <Grid item xs={11}>
        <FormActions activeStep={activeStep} setActiveStep={setActiveStep} />
      </Grid>
    </Grid>
  );
}
