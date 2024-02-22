import { useParams } from "react-router-dom";
import { useGetQuiz } from "../../Api/quizzes";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { Grid, Container, Typography } from "@mui/material";
import { QuizType } from "../../types";
import Flex from "../../Ui/Flex";

function QuizDetailsView() {
  const { quizId } = useParams();

  const { data: quizInfo, isLoading, isError, error } = useGetQuiz({ quizId });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <DefaultLayout>
      <Grid container sx={{ height: "100%" }}>
        <QuizInfoSection quizInfo={quizInfo} />
        <Grid item xs="auto">
          Right Section
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}

export default QuizDetailsView;

interface ResponseSourceType {
  created_at: string;
  file_hash: string;
  file_name: string;
  source_id: number;
}

interface QuizInfoType {
  quiz: QuizType;
  sources: ResponseSourceType[];
}

const QuizInfoSection = ({ quizInfo }: { quizInfo: QuizInfoType }) => {
  const { quiz, sources } = quizInfo;

  const titleKeyPairs = [
    {
      title: "Quiz Title",
      val: quiz.quiz_title,
    },
    {
      title: "Quiz Description",
      val: quiz.quiz_description,
    },
    { title: "Keywords", val: quiz.keywords },
    { title: "Metaprompt", val: quiz.meta_prompt },
  ];

  return (
    <Grid
      item
      xs={4.5}
      sm={3}
      md={2}
      direction="column"
      sx={{
        borderRight: "1px solid silver",
        height: "100%",
        display: "flex",
        gap: "0.5rem",
        minWidth: "12.5rem",
        overflow: "hidden",
      }}
    >
      {titleKeyPairs.map(({ title, val }, index) => {
        return (
          <Grid
            item
            key={index}
            direction="column"
            sx={{
              display: "flex",
              gap: "0.25rem",
              fontSize: "0.9rem",
              padding: "0.25rem 0.25rem 0.25rem 0",
              lineHeight: "1.5",
            }}
          >
            <strong>{title}</strong>
            <span>{val || "Not available"}</span>
          </Grid>
        );
      })}

      <Grid
        direction="column"
        sx={{
          display: "flex",
          gap: "0.75rem",
          fontSize: "0.9rem",
          padding: "0.25rem 0.25rem 0.25rem 0",
          overflow: "auto",
        }}
      >
        <strong>Sources</strong>

        {sources.map((source, index) => {
          return (
            <span key={index}>
              {index + 1}) {source.file_name}
            </span>
          );
        })}
      </Grid>
    </Grid>
  );
};
