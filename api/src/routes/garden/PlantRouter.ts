import { Router } from "express";
import { CreatePlant } from "./Create";
import { FindPlant } from "./Find";
import { FindAllPlants } from "./FindAllPlants";

export const garden = Router();

garden.use("/plant/create", CreatePlant());
garden.use("/plant/find", FindPlant());
garden.use("/info", FindAllPlants());
