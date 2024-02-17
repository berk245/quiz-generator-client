import { Box, Button } from "@mui/material";
import { useAtom } from "jotai";
import { newQuizDataAtom, activeStepAtom } from "../../Views/CreateQuiz/atoms";

function FormActions({ createQuiz }: { createQuiz: () => void }) {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [newQuizData] = useAtom(newQuizDataAtom);

  const handleNext = () => {
    const { isStepValid, errorMessage } = validateStep();
    if (!isStepValid) {
      alert(errorMessage);
      return;
    }
    if (activeStep < 3) setActiveStep(activeStep + 1);
    else if (activeStep === 3) {
      createQuiz();
    } else return;
  };

  const validateStep = () => {
    let errorMessage = "";
    let isStepValid = true;
    if (activeStep === 0) {
      if (!newQuizData.quizTitle) {
        isStepValid = false;
        errorMessage = "Please enter a name for your quiz.";
      }
    } else if (activeStep === 1) {
      if (!newQuizData.files.length) {
        isStepValid = false;
        errorMessage = "Please select a source for your quiz.";
      }
    }

    return { isStepValid, errorMessage };
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
      <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
        {activeStep === 3 ? "Create Quiz" : "Next"}
      </Button>
    </Box>
  );
}

export default FormActions;
