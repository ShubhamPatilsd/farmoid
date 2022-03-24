import axios from "axios";
import { API_URL } from "@env";

console.log(API_URL);

export const api = axios.create({
  baseURL: process.env.API_URL,
});
