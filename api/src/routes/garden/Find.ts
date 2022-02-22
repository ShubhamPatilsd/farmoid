import { Router } from "express";
import { prisma } from "../../database/db";
import FirebaseAdmin from "firebase-admin";

export const FindPlant = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { authToken, plantId } = req.body;

    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);
    const plant = await prisma.plant.findFirst({
      where: {
        id: plantId,
        ownerId: user.uid,
      },
    });

    if (!plant) {
      console.log("Plant does not exist");
      res
        .status(404)
        .send(
          "Requested plant does not exist. Check the ID and AuthToken given."
        );
    } else {
      res.json(plant);
    }
  });

  return router;
};
