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

  const removeQuestionFromList = (question: QuestionType) => {
    const newList = [...generatedQuestions].filter((a) => {
      return a.question_id !== question.question_id;
    });
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
      {generatedQuestions.map((question) => {
        return (
          <QuestionInReview
            question={question}
            key={question.question_id}
            removeQuestionFromList={removeQuestionFromList}
          />
        );
      })}
    </Box>
  );
};

export default GeneratedQuestionsList;
