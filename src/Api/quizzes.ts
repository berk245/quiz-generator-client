import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { QuizType } from "../types";

const reqOptions = {
  headers: {
    Authorization: Cookies.get("auth_token"),
  },
};

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
      console.log(res);
      alert("Quiz successfully created.");
    },
  });
};
