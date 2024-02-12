import { Button, SelectChangeEvent } from "@mui/material";
import DefaultLayout from "../../Layouts/DefaultLayout";
import Flex from "../../Ui/Flex";
import "./quizzes-view.css";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import SearchInput from "../../Ui/SearchInput";
import { SortBySelector } from "../../Components/Quizzes/SortBySelector";
import SingleQuizBox from "../../Components/Quizzes/SingleQuizBox";
import { QuizType } from "../../types";
const fakeQuizzes = [
  {
    id: "123456",
    quiz_title: "Clean Code Quiz 3",
    quiz_description: "Module description based set of questions",
    created_at: new Date(),
    is_active: true,
  },
  {
    id: "1234",
    quiz_title: "Collab test",
    quiz_description: "Some trial and error experiment",
    created_at: new Date(),
    is_active: true,
  },
];

function QuizzesView() {
  const [sortBy, setSortBy] = useState("Date (ascending)");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuizzes = fakeQuizzes
    .filter(searchFilter(searchTerm))
    .sort(sortFilter(sortBy));

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
            <Button
              className="quizzes-view-add-new-button"
              variant="contained"
              startIcon={<AddCircleOutline />}
              size="medium"
              color="error"
            >
              Create a New Quiz
            </Button>
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
              return <SingleQuizBox key={quiz.id} quiz={quiz} />;
            })}
          </div>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
}

export default QuizzesView;

// Search filter function
const searchFilter = (term: string) => (quiz: QuizType) => {
  return (
    quiz.quiz_title.toLowerCase().includes(term.toLowerCase()) ||
    quiz.quiz_description.toLowerCase().includes(term.toLowerCase())
  );
};

// Sort filter function
const sortFilter = (sortBy: string) => (quizA: QuizType, quizB: QuizType) => {
  console.log(sortBy);
  if (sortBy === "Date (ascending)") {
    return (
      new Date(quizA.created_at).getTime() -
      new Date(quizB.created_at).getTime()
    );
  } else if (sortBy === "Date (descending)") {
    return (
      new Date(quizB.created_at).getTime() -
      new Date(quizA.created_at).getTime()
    );
  } else if (sortBy === "Name (a-z)") {
    return quizA.quiz_title.localeCompare(quizB.quiz_title);
  } else if (sortBy === "Name (z-a)") {
    return quizB.quiz_title.localeCompare(quizA.quiz_title);
  }
  // Add more conditions for other sorting options if needed
  return 0;
};
