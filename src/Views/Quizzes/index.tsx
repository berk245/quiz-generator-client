import { Button, SelectChangeEvent } from "@mui/material";
import DefaultLayout from "../../Layouts/DefaultLayout";
import Flex from "../../Ui/Flex";
import "./quizzes-view.css";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import SearchInput from "../../Ui/SearchInput";
import { SortBySelector } from "../../Components/Quizzes/SortBySelector";

function QuizzesView() {
  const [sortBy, setSortBy] = useState("Date (ascending)");
  const [searchTerm, setSearchTerm] = useState("");

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
              size="small"
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
      </Flex>

      <Flex className="search-sort-line flex-items-center" dir="row">
        <SearchInput
          labelText="Search Quizzes"
          onValueChange={handleSearch}
          variant="outlined"
          size="small"
        ></SearchInput>
        <SortBySelector
          sortValue={sortBy}
          handleSortChange={handleSortChange}
        />
      </Flex>

      {/* Box Links */}
      <Flex className="quiz-boxes-container" dir="row">
        <div className="quiz-box">Quiz Box</div>
      </Flex>
    </DefaultLayout>
  );
}

export default QuizzesView;
