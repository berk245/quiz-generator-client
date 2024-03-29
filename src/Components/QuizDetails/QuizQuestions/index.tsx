import {
  Grid,
  LinearProgress,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetQuestions } from "../../../Api/questions";
import SearchInput from "../../../Ui/SearchInput";

import { QuestionType } from "../../../types";

import {
  QuestionSearchFilter,
  QuestionSortFilter,
} from "../questionDetailHelpers";
import { QuestionSortSelect } from "./QuestionsSortSelector";
import { QuestionsHeader } from "./QuestionsHeader";
import { QuestionsList } from "./QuestionList/QuestionsList";

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
    setSortBy(e.target.value);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  if (isLoading) {
    return (
      <Grid item xs padding={2}>
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

  if (isError) {
    return (
      <Typography variant="subtitle2">
        There was an error accessing your quizzes: {error.message}. Please try
        refreshing the page.
      </Typography>
    );
  }

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
        overflow: "auto",
      }}
    >
      <QuestionsHeader questions={questions}>
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
      {questions.length === 0 && (
        <Typography variant="subtitle2">
          You don't have any questions. Click the{" "}
          <strong>Generate Questions</strong> button to get started.
        </Typography>
      )}
      {questions.length > 0 && filteredQuestions.length === 0 && (
        <Typography variant="subtitle2">No matching questions.</Typography>
      )}
    </Grid>
  );
}

export default QuizQuestionsSection;
