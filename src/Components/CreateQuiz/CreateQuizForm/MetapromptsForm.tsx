import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { newQuizDataAtom } from "../../../Views/CreateQuiz/atoms";

export default function MetapromptsForm() {
  const [newQuizData, setNewQuizData] = useAtom(newQuizDataAtom);

  const handleChange = (e: any) => {
    setNewQuizData({
      ...newQuizData,
      metaPrompts: e.target.value,
    });
  };

  return (
    <Grid container gap={2}>
      <Typography variant="h6" gutterBottom>
        Meta-prompts
      </Typography>
      <Grid item gap={5}>
        <Typography variant="subtitle1">
          Enhance your quiz with personalized touches! Share any special
          instructions or preferences for question generation that apply to
          every question.
        </Typography>
        <Grid item xs={12} sm={12} mt={4}>
          <TextField
            required
            id="metaprompts"
            multiline
            size="small"
            name="Quiz Metaprompts Input"
            placeholder="Example: ask questions as a mysterious wizard..."
            fullWidth
            variant="standard"
            value={newQuizData.metaPrompts}
            onChange={handleChange}
            sx={{ fontSize: "0.75rem" }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
