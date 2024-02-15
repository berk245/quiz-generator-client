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

// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';

const steps = ["Quiz Info", "Sources", "Keywords & Concepts", "Meta-prompts"];

export default function CreateQuiz() {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    quizName: "",
    description: "",
    keywords: [],
    concepts: [],
    metaPrompts: "",
    files: [] as File[], // An array to store multiple files
  });

  const handleInputChange = (
    field: string,
    value: string | File[] | string[]
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    handleInputChange("files", Array.from(files));
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h5" align="left" sx={{ mt: 4 }}>
          Create New Quiz
        </Typography>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 } }}
        >
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <CreateQuizForm
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            handleInputChange={handleInputChange}
            handleFileChange={handleFileChange}
          />
        </Paper>
      </Container>
    </DefaultLayout>
  );
}
