import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { type FormStepProps } from "./types";

export default function QuizInfoForm({ handleInputChange }: FormStepProps) {
  if (!handleInputChange) return <></>;
  return (
    <Grid container>
      <Typography variant="h6" gutterBottom>
        Quiz Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="quiz_name"
            name="Quiz Name"
            label="Quiz Name"
            placeholder="Provide a catchy name for your quiz"
            fullWidth
            variant="standard"
            onChange={(e) => handleInputChange("quizName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="quiz_description"
            name="Quiz Descriptiion"
            aria-label="Quiz Description input"
            placeholder="(Optional) Describe your quiz in a few sentences"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
