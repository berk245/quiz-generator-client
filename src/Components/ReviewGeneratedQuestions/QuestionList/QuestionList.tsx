import { useState } from "react";
import { generatedQuestionsAtom } from "../../../Views/GenerateQuestions/atoms";
import { useAtom } from "jotai";
import { Box } from "@mui/material";
import { QuestionType } from "../../../types";
import QuestionInReview from "./QuestionInReview";

const GeneratedQuestionsList = () => {
  const [generatedQuestions, setGeneratedQuestions] = useAtom(
    generatedQuestionsAtom
  );

  const removeQuestion = (question: QuestionType) => {
    const newList = [...generatedQuestions].filter(
      (a) => a.question_id !== question.question_id
    );
    setGeneratedQuestions(newList);
  };
  return (
    <Box
      display={"flex"}
      gap={"1rem"}
      flexDirection={"column"}
      flexBasis={"80%"}
      sx={{ overflow: "auto" }}
    >
      {generatedQuestions.map((question, index) => {
        return (
          <QuestionInReview
            question={question}
            key={index}
            removeQuestion={removeQuestion}
          />
        );
      })}
    </Box>
  );
};

export default GeneratedQuestionsList;
