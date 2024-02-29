import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { reqOptions } from "./constants";
import { QuestionType } from "../types";

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

const UpdateQuestionFn = async (updatedQuestion: QuestionType) => {
  const res = await axios({
    method: "PUT",
    url: process.env.REACT_APP_SERVER_URL + "/questions",
    data: JSON.stringify(updatedQuestion),
    ...reqOptions,
  });

  return res.data;
};

export const useUpdateQuestion = () => {
  return useMutation({
    mutationKey: ["updateQuestion"],
    mutationFn: UpdateQuestionFn,
    onSuccess: (res) => {
      alert("Update successful.");
      window.location.reload();
    },
    onError: (err) => {
      console.log(err);
      alert("Something went wrong. Please try again.");
    },
  });
};

export interface GenerateQuestionSettingsProps {
  quiz_id: string;
  amount: number;
  question_type: string;
  instructions?: string;
}

const GenerateQuestionsFn = async (
  GenerateQuestionSettings: GenerateQuestionSettingsProps
) => {
  const res = await axios({
    method: "POST",
    url: process.env.REACT_APP_SERVER_URL + "/questions/generate",
    data: JSON.stringify(GenerateQuestionSettings),
    ...reqOptions,
  });

  return res.data;
};

export const useGenerateQuestions = () => {
  return useMutation({
    mutationKey: ["generateQuestions"],
    mutationFn: GenerateQuestionsFn,
    onError: (err) => {
      alert("Something went wrong. Please try again.");
    },
  });
};

export interface AcceptQuestionProps {
  quiz_id: string;
  question: QuestionType;
}

const AcceptQuestionFn = async (acceptQuestionProps: AcceptQuestionProps) => {
  const res = await axios({
    method: "POST",
    url: process.env.REACT_APP_SERVER_URL + "/questions",
    data: JSON.stringify(acceptQuestionProps),
    ...reqOptions,
  });

  return res.data;
};

export const useAcceptQuestion = () => {
  return useMutation({
    mutationKey: ["acceptQuestion"],
    mutationFn: AcceptQuestionFn,
    onError: (err) => {
      alert("Something went wrong. Please try again.");
    },
  });
};
