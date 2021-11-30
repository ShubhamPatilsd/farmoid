import { Router } from "express";
import { FindMoisture as FindMoistureRoute } from "./moisture/FindMoisture";

export const baseRoutes = Router();
baseRoutes.use("/plant/moisture/", FindMoistureRoute());
