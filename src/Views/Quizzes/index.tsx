import { Button, LinearProgress, SelectChangeEvent } from "@mui/material";
import DefaultLayout from "../../Layouts/DefaultLayout";
import Flex from "../../Ui/Flex";
import "./quizzes-view.css";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import SearchInput from "../../Ui/SearchInput";
import { SortBySelector } from "../../Components/Quizzes/SortBySelector";
import SingleQuizBox from "../../Components/Quizzes/SingleQuizBox";
import { QuizType } from "../../types";
import { useGetQuizzes } from "../../Api/quizzes";
import { searchFilter, sortFilter } from "../../Components/Quizzes/helpers";
import { Link } from "react-router-dom";

function QuizzesView() {
  const [sortBy, setSortBy] = useState("Date (ascending)");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: serverResponse, isLoading, isError, error } = useGetQuizzes();

  const filteredQuizzes: QuizType[] = serverResponse?.data
    ? serverResponse.data
        .filter(searchFilter(searchTerm))
        .sort(sortFilter(sortBy))
    : [];

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <DefaultLayout>
      <Flex className="quizzes-view-container" dir="column">
        <Flex className="quizzes-view-title-container" dir="column">
          <Flex className="quizzes-view-title-line flex-items-center" dir="row">
            <span className="quizzes-view-main-title">Your Quizzes</span>
            <Link to="/quizzes/new">
              <Button
                className="quizzes-view-add-new-button"
                variant="contained"
                startIcon={<AddCircleOutline />}
                size="medium"
                color="error"
              >
                Create a New Quiz
              </Button>
            </Link>
          </Flex>
          <span className="quizzes-view-subtitle">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam
            recusandae non amet sit architecto expedita molestias pariatur quo,
            perferendis ex, nobis sapiente quasi, aperiam molestiae corporis
            quisquam nostrum eum! Quo impedit, velit atque vel odit incidunt
            amet itaque asperiores error quos, earum neque. Expedita sed
            blanditiis earum velit quo totam.
          </span>
        </Flex>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Flex className="quizzes-view-content-section" dir="column">
            <Flex className="search-sort-line flex-items-center" dir="row">
              <SearchInput
                labelText="Search Quizzes"
                onValueChange={handleSearch}
                variant="outlined"
                size="small"
                className="quiz-search-input"
              ></SearchInput>
              <SortBySelector
                sortValue={sortBy}
                handleSortChange={handleSortChange}
              />
            </Flex>
            <div className="quiz-boxes-container" dir="row">
              {filteredQuizzes.map((quiz) => {
                return <SingleQuizBox key={quiz.quiz_id} quiz={quiz} />;
              })}
            </div>
          </Flex>
        )}
      </Flex>
    </DefaultLayout>
  );
}

export default QuizzesView;
