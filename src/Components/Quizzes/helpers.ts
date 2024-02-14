import { QuizType } from "../../types";
// Search filter function
export const searchFilter = (term: string) => (quiz: QuizType) => {
  return (
    quiz.quiz_title.toLowerCase().includes(term.toLowerCase()) ||
    quiz.quiz_description.toLowerCase().includes(term.toLowerCase())
  );
};

// Sort filter function
export const sortFilter =
  (sortBy: string) => (quizA: QuizType, quizB: QuizType) => {
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
