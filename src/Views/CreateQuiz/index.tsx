import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DefaultLayout from "../../Layouts/DefaultLayout";
import CreateQuizForm from "../../Components/CreateQuiz/CreateQuizForm";
import { useAtom } from "jotai";
import { activeStepAtom, stepNamesAtom, newQuizDataAtom } from "./atoms";

export default function CreateQuiz() {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [stepNames] = useAtom(stepNamesAtom);

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h5" align="left" sx={{ mt: 4 }}>
          Create New Quiz
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            my: { xs: 3, md: 4 },
            p: { xs: 2, md: 3 },
            minWidth: "30rem",
          }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {stepNames.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <CreateQuizForm />
        </Paper>
      </Container>
    </DefaultLayout>
  );
}
