import QuizInfoForm from "./FormSteps/QuizInfoForm";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { activeStepAtom } from "../../../Views/CreateQuiz/atoms";
import KeywordsForm from "./FormSteps/KeywordsForm";
import SourceUploadForm from "./FormSteps/SourceUploadForm";
import LearningObjectivesForm from "./FormSteps/LearningObjectivesForm";

export default function CreateQuizFormContainer() {
  const [activeStep] = useAtom(activeStepAtom);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <QuizInfoForm />;
      case 1:
        return <SourceUploadForm />;
      case 2:
        return <LearningObjectivesForm />;
      case 3:
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
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "0.9rem",
          lineHeight: 2,
        },
      }}
    >
      <Grid item xs={11}>
        {getStepContent(activeStep)}
      </Grid>
    </Grid>
  );
}
