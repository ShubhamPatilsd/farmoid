import { Router } from "express";
import { CreatePlant } from "./Create";

export const garden = Router();

garden.use("/create", CreatePlant());
