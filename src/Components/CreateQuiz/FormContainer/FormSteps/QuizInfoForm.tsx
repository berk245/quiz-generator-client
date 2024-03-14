import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../../Views/CreateQuiz/atoms";
import FormStepTitle from "./FormStepTitle";

export default function QuizInfoForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    setNewQuizData({
      ...newQuizData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Grid container>
      <FormStepTitle>Quiz Info</FormStepTitle>

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            required
            id="quizTitle"
            name="Quiz Name"
            label="Quiz Name"
            placeholder="Provide a catchy name for your quiz"
            fullWidth
            variant="standard"
            value={newQuizData.quizTitle}
            onChange={handleChange}
            error={newQuizData.quizTitle.length > 60}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="Quiz Description"
            label="Quiz Description"
            aria-label="Quiz Description input"
            placeholder="(Optional) Describe your quiz in a few sentences"
            fullWidth
            variant="standard"
            value={newQuizData.description}
            onChange={handleChange}
            error={newQuizData.description.length > 255}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
