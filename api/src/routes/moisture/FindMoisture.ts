import { Router } from "express";
import { prisma } from "../../database/db";

export const FindMoisture = () => {
  const router = Router();
  router.get("/", async (req, res) => {
    const query = req.query.plant;
    const searchResult = await prisma.plantInfo.findMany({
      where: {
        name: { contains: query.toString().toLowerCase() },
      },
    });

    res.json(searchResult);
  });
  return router;
};
