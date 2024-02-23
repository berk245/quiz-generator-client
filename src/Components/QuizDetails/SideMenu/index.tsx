import { Grid } from "@mui/material";
import { QuizType } from "../../../types";
import { QuizInfoSection } from "./QuizInfoSection";
import { SourcesList } from "./SourcesList";
import { useParams } from "react-router-dom";
import { useGetQuiz } from "../../../Api/quizzes";

export interface ResponseSourceType {
  created_at: string;
  file_hash: string;
  file_name: string;
  source_id: number;
}

export interface QuizInfoType {
  quiz: QuizType;
  sources: ResponseSourceType[];
}

export const InfoSideMenu = () => {
  const { quizId } = useParams();

  const { data: quizInfo, isLoading, isError, error } = useGetQuiz({ quizId });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <Grid
      item
      xs={4}
      sm={2.25}
      sx={{
        borderRight: "1px solid silver",
        height: "100%",
        display: "flex",
        gap: "0.5rem",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      <QuizInfoSection quiz={quizInfo?.quiz} />
      <SourcesList sources={quizInfo?.sources} />
    </Grid>
  );
};
