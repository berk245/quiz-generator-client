import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reqOptions } from "./constants";

export const GetQuizzesFn = async () => {
  const res = await axios.get(
    process.env.REACT_APP_SERVER_URL + "/quizzes",
    reqOptions
  );
  return res.data || [];
};

export const useGetQuizzes = () => {
  return useQuery({
    queryKey: ["get_quizzes"],
    queryFn: GetQuizzesFn,
  });
  //
};

interface CreateQuizRequestType {
  quizTitle: string;
  description: string;
  keywords: string[];
  metaPrompt: string;
  files: File[];
}

const CreateQuizFn = async (props: CreateQuizRequestType) => {
  const formData = new FormData();

  formData.append("quiz_title", props.quizTitle);
  formData.append("quiz_description", props.description);
  formData.append("keywords", props.keywords.join(","));
  // To-do: create a loop to append multiple files
  formData.append("source_file", props.files[0]);
  formData.append("meta_prompt", props.metaPrompt);

  const res = await axios({
    method: "POST",
    url: process.env.REACT_APP_SERVER_URL + "/quizzes",
    data: formData,
    ...reqOptions,
  });

  return res.data;
};

export const useCreateQuiz = () => {
  return useMutation({
    mutationKey: ["createNewQuiz"],
    mutationFn: CreateQuizFn,
    onSuccess: (res) => {
      setTimeout(() => {
        window.location.replace(`/quizzes/${res.quiz_id}`);
      }, 3000);
    },
    onError: (err) => {
      console.log(err);
      alert("Something went wrong. Please try creating the quiz again.");
    },
  });
};

interface GetQuizFnProps {
  quizId?: string;
}

export const GetQuizFn = async (quizId?: string) => {
  if (!quizId) return;
  const res = await axios.get(
    process.env.REACT_APP_SERVER_URL + `/quiz?quiz_id=${quizId}`,
    reqOptions
  );
  return res.data.data;
};

export const useGetQuiz = (props: GetQuizFnProps) => {
  return useQuery({
    queryKey: ["get_quiz", props.quizId],
    queryFn: () => GetQuizFn(props.quizId),
  });
};

export const DeleteQuizFn = async (quizId: string) => {
  if (!quizId) return;
  const res = await axios.delete(
    process.env.REACT_APP_SERVER_URL + `/quiz?quiz_id=${quizId}`,
    reqOptions
  );
  return res.data.data;
};

export const useDeleteQuiz = () => {
  return useMutation({
    mutationKey: ["deleteQuiz"],
    mutationFn: DeleteQuizFn,
  });
};
