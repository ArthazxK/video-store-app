import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = `${apiUrl}/users`;

export const register = (user) => {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
};
