import { generatedQuestionsAtom } from "../../Views/GenerateQuestions/atoms";
import { useAtom } from "jotai";
import { Grid, Button, Alert, Typography } from "@mui/material";

import { CheckCircleRounded } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import GeneratedQuestionsList from "./QuestionList/QuestionList";

function ReviewGeneratedQuestions() {
  const [generatedQuestions] = useAtom(generatedQuestionsAtom);

  return (
    <Grid
      item
      xs={8}
      sm={9.75}
      padding={"0rem 1rem"}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "1.25rem", lg: "1.5rem" }, flexBasis: "5%" }}
      >
        Review Questions
      </Typography>
      <Typography variant="subtitle2" flexBasis={"5%"}>
        Here are the questions generated based on your specifications. You can
        review each question and decide whether to accept or dismiss it.
        Accepted questions will be added to your quiz.
      </Typography>

      {generatedQuestions.length ? (
        <GeneratedQuestionsList />
      ) : (
        <PostReviewLinks />
      )}
    </Grid>
  );
}

export default ReviewGeneratedQuestions;

const PostReviewLinks = () => {
  const { quizId } = useParams();

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <Alert
        icon={<CheckCircleRounded fontSize="inherit" />}
        severity="success"
      >
        <span>That was all!</span>
      </Alert>
      <Grid
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to={`quizzes/${quizId}`}>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Back to quiz overview
          </Button>
        </Link>
        <Link to="" reloadDocument>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Generate more questions
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
