import { QuestionType } from "../../types";

export const QuestionSearchFilter =
  (term: string) => (question: QuestionType) => {
    return (
      question.question_text.toLowerCase().includes(term.toLowerCase()) ||
      question.correct_answer.toLowerCase().includes(term.toLowerCase()) ||
      question.multiple_choices.toLowerCase().includes(term.toLowerCase())
    );
  };

export const QuestionSortFilter =
  (sortBy: string) => (questionA: QuestionType, questionB: QuestionType) => {
    if (sortBy === "Date (old-new)") {
      return (
        new Date(questionA.created_at).getTime() -
        new Date(questionB.created_at).getTime()
      );
    } else if (sortBy === "Date (new-old)") {
      return (
        new Date(questionB.created_at).getTime() -
        new Date(questionA.created_at).getTime()
      );
    }
    // Add more conditions for other sorting options if needed
    return 0;
  };
