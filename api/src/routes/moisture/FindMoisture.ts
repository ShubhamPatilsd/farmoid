import { Router } from "express";
import { prisma } from "../../database/db";

export const FindMoisture = () => {
  const router = Router();
  router.get("/", async (req, res) => {
    const query = req.query.plant;
    const searchResult = await prisma.plantInfo.findMany({
      where: {
        query_name: { contains: query.toString().toLowerCase() },
      },
      select: {
        query_name: false,
        name: true,
        min: true,
        max: true,
      },
    });

    res.json(searchResult);
  });
  return router;
};
