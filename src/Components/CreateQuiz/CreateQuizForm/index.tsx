import * as React from "react";
import Typography from "@mui/material/Typography";
import FormActions from "./FormActions";
import QuizInfoForm from "./QuizInfoForm";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { activeStepAtom } from "../../../Views/CreateQuiz/atoms";
import KeywordsForm from "./KeywordsForm";
export default function CreateQuizForm() {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <QuizInfoForm />;
      case 1:
        return <></>;
      case 2:
        return <KeywordsForm />;
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
