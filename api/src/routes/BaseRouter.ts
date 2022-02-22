import { Router } from "express";
import { FindMoisture as FindMoistureRoute } from "./moisture/FindMoisture";
import { auth as AuthRoutes } from "./auth/AuthRouter";
import { garden as GardenRoutes } from "./garden/PlantRouter";

export const baseRoutes = Router();
baseRoutes.use("/plant/moisture/", FindMoistureRoute());
baseRoutes.use("/auth", AuthRoutes);
baseRoutes.use("/garden", GardenRoutes);
