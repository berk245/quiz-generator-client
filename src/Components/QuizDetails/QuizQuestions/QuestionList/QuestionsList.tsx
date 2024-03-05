import { Grid } from "@mui/material";
import { QuestionType } from "../../../../types";
import { QuestionAccordionBox } from "./QuestionAccordion/QuestionAccordionBox";

export const QuestionsList = ({ questions }: { questions: QuestionType[] }) => {
  return (
    <Grid container direction="column">
      <Grid
        container
        direction="column"
        height="100%"
        sx={{
          border: "1px solid #ebebeb",
          borderRadius: "5px",
          overflow: "auto",
        }}
      >
        {questions.map((question) => {
          return (
            <QuestionAccordionBox
              question={question}
              key={question.question_id}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};
