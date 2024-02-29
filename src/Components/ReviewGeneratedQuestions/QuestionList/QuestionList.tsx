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
  const [generatedQuestionsCopy] = useState([...generatedQuestions]);

  const removeQuestion = (question: QuestionType) => {
    const newList = [...generatedQuestions].filter(
      (a) => a.question_id !== question.question_id
    );
    if (newList.length) {
      setGeneratedQuestions(newList);
    } else {
      // If the removed question is the last one, wait a couple seconds to show feedback
      setTimeout(() => {
        setGeneratedQuestions(newList);
      }, 2000);
    }
  };
  return (
    <Box
      display={"flex"}
      gap={"1rem"}
      flexDirection={"column"}
      flexBasis={"80%"}
      sx={{ overflow: "auto" }}
    >
      {generatedQuestionsCopy.map((question, index) => {
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
