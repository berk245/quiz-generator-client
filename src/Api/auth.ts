import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "./helpers";

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
      setCookie('auth_token', res.user_token)
      window.location.replace('/dashboard')
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

