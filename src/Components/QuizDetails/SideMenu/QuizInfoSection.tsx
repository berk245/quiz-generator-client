import { Grid } from "@mui/material";
import { QuizType } from "../../../types";

export const QuizInfoSection = ({ quiz }: { quiz: QuizType }) => {
  const titleKeyPairs = [
    {
      title: "Quiz Title",
      val: quiz.quiz_title,
    },
    {
      title: "Quiz Description",
      val: quiz.quiz_description,
    },
    { title: "Learning Objectives", val: quiz.learning_objectives },
    { title: "Keywords", val: quiz.keywords },
  ];

  return (
    <>
      {titleKeyPairs.map(({ title, val }, index) => {
        return (
          <Grid
            container
            key={index}
            direction="column"
            sx={{
              display: "flex",
              gap: "0.25rem",
              fontSize: "0.9rem",
              padding: "0.25rem 0.25rem 0.25rem 0",
              lineHeight: "1.75",
            }}
          >
            <strong>{title}</strong>
            <span>{val || "Not available"}</span>
          </Grid>
        );
      })}
    </>
  );
};
