import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const GetQuizzesFn = async () => {
  const res = await axios.get(process.env.REACT_APP_SERVER_URL + "/quizzes", {
    headers: {
      Authorization: Cookies.get("auth_token"),
    },
  });
  return res.data || [];
};

export const useGetQuizzes = () => {
  return useQuery({
    queryKey: ["get_quizzes"],
    queryFn: GetQuizzesFn,
  });
  //
};
