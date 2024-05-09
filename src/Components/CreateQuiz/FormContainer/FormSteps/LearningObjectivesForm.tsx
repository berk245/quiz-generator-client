import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../../Views/CreateQuiz/atoms";
import FormStepTitle from "./FormStepTitle";

export default function LearningObjectivesForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    setNewQuizData({
      ...newQuizData,
      learningObjectives: e.target.value,
    });
  };

  return (
    <Grid container>
      <FormStepTitle>Learning Objectives</FormStepTitle>

      <Grid item gap={3}>
        <Typography variant="subtitle2">
          Please enter the primary learning objectives that reflect the main
          content of your provided text. These objectives will guide the
          creation of quiz questions to assess understanding and retention of
          these key concepts.
        </Typography>
        <Grid item xs={12} sm={12} mt={4}>
          <TextField
            required
            id="learningObjectives"
            multiline
            size="small"
            name="Learning Objectives"
            placeholder="Example learning objective: Understand the basic principles of supply and demand and how they influence market prices."
            fullWidth
            error={newQuizData.learningObjectives.length > 1000}
            variant="standard"
            value={newQuizData.learningObjectives}
            onChange={handleChange}
            sx={{ fontSize: "0.75rem" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
