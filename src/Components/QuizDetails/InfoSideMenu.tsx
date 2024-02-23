import { Grid } from "@mui/material";
import { QuizType } from "../../types";
import { QuizInfoSection } from "./QuizInfoSection";
import { SourcesList } from "./SourcesList";

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

export const InfoSideMenu = ({ quizInfo }: { quizInfo: QuizInfoType }) => {
  const { quiz, sources } = quizInfo;

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
      <QuizInfoSection quiz={quiz} />
      <SourcesList sources={sources} />
    </Grid>
  );
};
