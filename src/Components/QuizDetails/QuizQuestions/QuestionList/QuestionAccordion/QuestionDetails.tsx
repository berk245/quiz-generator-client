import { Grid, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { QuestionType } from "../../../../../types";

export const QuestionDetails = ({
  question,
  toggleEdit,
}: {
  question: QuestionType;
  toggleEdit: (set: boolean) => void;
}) => {
  return (
    <Grid spacing={3} container>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: "0.9rem",
          gap: "0.5rem",
        }}
      >
        <span> Correct answer: {question.correct_answer}</span>
        {question.multiple_choices && (
          <span> Multiple choices: {question.correct_answer}</span>
        )}
      </Grid>
      <Grid item xs={12} sx={{ width: "100%" }}>
        <Button
          onClick={() => toggleEdit(true)}
          variant="outlined"
          sx={{
            padding: "0.15rem 0.5rem",
            textTransform: "none",
            fontSize: "0.85rem",
            width: "100%",
            // marginTop: "1rem",
            ":hover": {
              opacity: "0.8",
            },
          }}
          startIcon={<Edit sx={{ width: "0.9rem" }} />}
        >
          Edit Question
        </Button>
      </Grid>
    </Grid>
  );
};
