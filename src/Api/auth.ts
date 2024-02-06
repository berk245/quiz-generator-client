import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface LoginFunctionInterface {
  email: string;
  password: string;
}

const LoginFunction = async ({ email, password }: LoginFunctionInterface) => {
  const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/login", {
    email: email,
    password: password,
  });
  return res.data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: LoginFunction,
    onSuccess: (res) => {
      console.log(res);
      // To-do: Handle cookie/JWT setting
      // To-do: Handle redirect to dashboard

      // window.location.replace('/signup')
    },
  });
};

const SignupFunction = async ({ email, password }: LoginFunctionInterface) => {
  const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/signup", {
    email: email,
    password: password,
  });
  return res.data;
};

export const useSignupUser = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: SignupFunction,
    onSuccess: (res) => {
      alert("Signup successful. Redirecting you to login page.");
      window.location.replace("/login");
    },
  });
};
