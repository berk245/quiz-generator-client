import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { reqOptions } from "./constants";

interface GetQuestionsProps {
  quizId?: string;
}

export const GetQuestionsFn = async (quizId?: string) => {
  if (!quizId) return;
  const res = await axios.get(
    process.env.REACT_APP_SERVER_URL + `/questions?quiz_id=${quizId}`,
    reqOptions
  );
  return res.data.data.questions;
};

export const useGetQuestions = (props: GetQuestionsProps) => {
  return useQuery({
    queryKey: ["get_questions", props.quizId],
    queryFn: () => GetQuestionsFn(props.quizId),
  });
};
