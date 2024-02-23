import {
  Grid,
  Typography,
  Button,
  LinearProgress,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetQuestions } from "../../../Api/questions";
import SearchInput from "../../../Ui/SearchInput";
import { SortBySelector } from "../../Quizzes/SortBySelector";
import { GetApp, AddCircle } from "@mui/icons-material";
import { QuestionType } from "../../../types";

import {
  QuestionSearchFilter,
  QuestionSortFilter,
} from "../questionDetailHelpers";
import { QuestionSortSelect } from "./QuestionsSortSelector";

function QuizQuestionsSection() {
  const [sortBy, setSortBy] = useState("Date (new-old)");
  const [searchTerm, setSearchTerm] = useState("");

  const { quizId } = useParams();

  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetQuestions({ quizId });

  const filteredQuestions: QuestionType[] = questions
    ? questions
        .filter(QuestionSearchFilter(searchTerm))
        .sort(QuestionSortFilter(sortBy))
    : [];

  const handleSortChange = (e: SelectChangeEvent) => {
    console.log("Vhange");
    setSortBy(e.target.value);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  if (isLoading) {
    return (
      <Grid xs padding={2}>
        <LinearProgress
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "0 1rem",
          }}
        />
      </Grid>
    );
  }

  return (
    <Grid
      item
      xs={8}
      sm={9.75}
      padding={"0rem 1rem"}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <QuestionsHeader>
        <QuestionSortSelect
          sortValue={sortBy}
          handleSortChange={handleSortChange}
        />
        <SearchInput
          labelText="Search Questions"
          onValueChange={handleSearch}
          variant="outlined"
          size="small"
          className="quiz-search-input"
        />
      </QuestionsHeader>
      <QuestionsList questions={filteredQuestions} />
    </Grid>
  );
}

export default QuizQuestionsSection;

const QuestionsHeader = ({ children }: React.PropsWithChildren) => {
  return (
    <Grid
      container
      direction="row"
      sx={{
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={5}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: { xs: "0.75rem", lg: "1.25rem" },
        }}
        alignItems="center"
      >
        <Typography sx={{ fontSize: { xs: "1.25rem", lg: "1.5rem" } }}>
          Questions
        </Typography>
        <Button variant="contained">
          <AddCircle sx={{ marginRight: "0.5rem" }} />
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "none", lg: "block" }, textTransform: "none" }}
          >
            Generate More Questions
          </Typography>
        </Button>
      </Grid>

      <Grid
        item
        xs={7}
        justifyContent="flex-end"
        sx={{
          flexDirection: "row",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Button variant="outlined" title="Export questions to CSV">
          <GetApp sx={{ marginRight: "0.5rem" }} />
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: "none", lg: "block" }, textTransform: "none" }}
          >
            Export to CSV
          </Typography>
        </Button>
        {children}
      </Grid>
    </Grid>
  );
};

const QuestionsList = ({ questions }: { questions: QuestionType[] }) => {
  return (
    <Grid container direction="column">
      <Grid
        container
        direction="column"
        height="100%"
        sx={{
          border: "1px solid #ebebeb",
          borderRadius: "5px",
          padding: "0.5rem",
        }}
      >
        {questions.map((question) => {
          return <QuestionBox question={question} key={question.question_id} />;
        })}
      </Grid>
    </Grid>
  );
};

const QuestionBox = ({ question }: { question: QuestionType }) => {
  return <p>{question.question_text}</p>;
};
