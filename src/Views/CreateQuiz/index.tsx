import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import DefaultLayout from "../../Layouts/DefaultLayout";
import CreateQuizFormContainer from "../../Components/CreateQuiz/FormContainer";
import { useAtom } from "jotai";
import { activeStepAtom, stepNamesAtom, newQuizDataAtom } from "./atoms";
import FormActions from "../../Components/CreateQuiz/FormContainer/FormActions";
import { useCreateQuiz } from "../../Api/quizzes";
import {
  LoadingBackdrop,
  SuccessBackdrop,
} from "../../Components/CreateQuiz/FormContainer/Backdrops/LoadingBackdrop";

export default function CreateQuiz() {
  const [activeStep, setActiveStep] = useAtom(activeStepAtom);
  const [stepNames] = useAtom(stepNamesAtom);
  const [newQuizData] = useAtom(newQuizDataAtom);

  const { mutate, isPending, isSuccess } = useCreateQuiz();

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
            p: { xs: 2, md: 5 },
            minWidth: "30rem",
          }}
        >
          {/* Quiz creation request in progress */}
          {isPending && <LoadingBackdrop isPending={isPending} />}
          {/* Quiz creation request successful */}
          {isSuccess && <SuccessBackdrop isSuccess={isSuccess} />}

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {stepNames.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <CreateQuizFormContainer />
          <FormActions createQuiz={() => mutate(newQuizData)} />
        </Paper>
      </Container>
    </DefaultLayout>
  );
}
