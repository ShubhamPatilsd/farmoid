import { Router } from "express";
import { prisma } from "../../database/db";
import FirebaseAdmin from "firebase-admin";

export const FindAllPlants = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { authToken } = req.body;

    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);

    const plants = await prisma.user.findUnique({
      where: {
        uid: user.uid,
      },

      select: {
        plants: true,
      },
    });

    res.json(plants);
  });
  return router;
};
