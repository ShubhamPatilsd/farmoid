import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FindMoisture = () => {
  const router = Router();
  router.get("/", async (req, res) => {
    const query = req.query.plant;
    const searchResult = await prisma.plantInfo.findMany({
      where: {
        name: { contains: query.toString() },
      },
    });

    res.json(searchResult);
  });
  return router;
};
