import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

import { useAtom } from "jotai";
import {
  newQuizDataAtom,
  activeStepAtom,
} from "../../../Views/CreateQuiz/atoms";
import { useCreateQuiz } from "../../../Api/quizzes";
import { CheckCircle } from "@mui/icons-material";
import Flex from "../../../Ui/Flex";

function FormActions() {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [newQuizData] = useAtom(newQuizDataAtom);

  const { mutate: createQuiz, isPending, isSuccess } = useCreateQuiz();

  const handleNext = () => {
    const { isStepValid, errorMessage } = validateStep();
    if (!isStepValid) {
      alert(errorMessage);
      return;
    }
    if (activeStep < 3) setActiveStep(activeStep + 1);
    else if (activeStep === 3) {
      createQuiz(newQuizData);
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

  if (isPending) return <LoadingBackdrop isPending={isPending} />;

  if (isSuccess) return <SuccessBackdrop isSuccess={isSuccess} />;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

const LoadingBackdrop = ({ isPending }: { isPending: boolean }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: "column",
      }}
      open={!isPending}
    >
      <CircularProgress color="inherit" />
      <br />
      <span>Creating your quiz</span>
    </Backdrop>
  );
};

const SuccessBackdrop = ({ isSuccess }: { isSuccess: boolean }) => {
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
