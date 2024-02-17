import FormActions from "./FormActions";
import QuizInfoForm from "./FormSteps/QuizInfoForm";
import { Grid } from "@mui/material";
import { useAtom } from "jotai";
import { activeStepAtom } from "../../../Views/CreateQuiz/atoms";
import KeywordsForm from "./FormSteps/KeywordsForm";
import SourceUploadForm from "./FormSteps/SourceUploadForm";
import MetaPromptForm from "./FormSteps/MetaPromptForm";

export default function CreateQuizFormContainer() {
  const [activeStep] = useAtom(activeStepAtom);

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <QuizInfoForm />;
      case 1:
        return <SourceUploadForm />;
      case 2:
        return <KeywordsForm />;
      case 3:
        return <MetaPromptForm />;
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
    >
      <Grid item xs={11}>
        {getStepContent(activeStep)}
      </Grid>
    </Grid>
  );
}
