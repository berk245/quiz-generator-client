import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../Views/CreateQuiz/atoms";

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
      <Typography variant="h6" gutterBottom>
        Quiz Info
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="quizName"
            name="Quiz Name"
            label="Quiz Name"
            placeholder="Provide a catchy name for your quiz"
            fullWidth
            variant="standard"
            value={newQuizData.quizName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
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
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
