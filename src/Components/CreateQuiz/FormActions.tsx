import { Box, Button } from "@mui/material";
import { useAtom } from "jotai";
import { newQuizDataAtom, activeStepAtom } from "../../Views/CreateQuiz/atoms";
import { validateStep } from "./validators";

function FormActions({ createQuiz }: { createQuiz: () => void }) {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [newQuizData] = useAtom(newQuizDataAtom);

  const handleNext = () => {
    const { isStepValid, errorMessage } = validateStep(activeStep, newQuizData);

    if (!isStepValid) {
      alert(errorMessage);
      return;
    }
    if (activeStep < 3) setActiveStep(activeStep + 1);
    else if (activeStep === 3) {
      createQuiz();
    } else return;
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <Button
        onClick={handleBack}
        sx={{ mt: 3, ml: 1 }}
        disabled={activeStep === 0}
      >
        Back
      </Button>
      <Button
        variant="contained"
        id="create-quiz-form-action-btn"
        onClick={handleNext}
        sx={{ mt: 3, ml: 1 }}
      >
        {activeStep === 3 ? "Create Quiz" : "Next"}
      </Button>
    </Box>
  );
}

export default FormActions;
