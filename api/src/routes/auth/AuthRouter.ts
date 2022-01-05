import { Router } from "express";
import { RegisterRoute } from "./Register";

export const auth = Router();

auth.use("/register", RegisterRoute());
