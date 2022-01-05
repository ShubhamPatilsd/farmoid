import { Router } from "express";
import { FindMoisture as FindMoistureRoute } from "./moisture/FindMoisture";
import { auth as AuthRoutes } from "./auth/AuthRouter";

export const baseRoutes = Router();
baseRoutes.use("/plant/moisture/", FindMoistureRoute());
baseRoutes.use("/auth", AuthRoutes);
