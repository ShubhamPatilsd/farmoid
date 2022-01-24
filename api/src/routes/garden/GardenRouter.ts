import { Router } from "express";
import { CreateGarden } from "./Create";

export const garden = Router();

garden.use("/create", CreateGarden());
