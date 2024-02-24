import Cookies from "js-cookie";

export const reqOptions = {
  headers: {
    Authorization: Cookies.get("auth_token"),
  },
};
