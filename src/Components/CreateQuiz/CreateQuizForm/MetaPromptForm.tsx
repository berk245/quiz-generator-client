import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../Views/CreateQuiz/atoms";
import FormStepTitle from "./FormStepTitle";

export default function MetaPromptForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    setNewQuizData({
      ...newQuizData,
      metaPrompt: e.target.value,
    });
  };

  return (
    <Grid container>
      <FormStepTitle>Meta-prompts</FormStepTitle>

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
            placeholder="Example: ask questions as a mysterious wizard..."
            fullWidth
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
