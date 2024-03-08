import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../../Views/CreateQuiz/atoms";
import FormStepTitle from "./FormStepTitle";

export default function QuizInstructionsForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    setNewQuizData({
      ...newQuizData,
      metaPrompt: e.target.value,
    });
  };

  return (
    <Grid container>
      <FormStepTitle>Quiz Level Instructions</FormStepTitle>

      <Grid item gap={3}>
        <Typography variant="subtitle2">
          Enhance your quiz with personalized touches! Share any special
          instructions or preferences for question generation that apply to
          every question.
        </Typography>
        <Grid item xs={12} sm={12} mt={4}>
          <TextField
            required
            id="metaPrompt"
            multiline
            size="small"
            name="Quiz metaPrompt Input"
            placeholder="Example: Create questions suitable for high school students familiar with programming concepts but new to the language. Emphasize syntax and programming language quirks over fundamental concepts."
            fullWidth
            error={newQuizData.metaPrompt.length > 1000}
            variant="standard"
            value={newQuizData.metaPrompt}
            onChange={handleChange}
            sx={{ fontSize: "0.75rem" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
