import { Router } from "express";
import { prisma } from "../../database/db";
import FirebaseAdmin from "firebase-admin";
import { plants } from "../../../types/plants";

export const CreatePlant = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { authToken, moisture, plantId } = req.body;

    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);

    const exists = await prisma.plant.findFirst({
      where: {
        id: plantId,
        ownerId: user.uid,
      },
    });

    if (!exists) {
      console.log("Plant does not exist");
      res.status(409).send("Plant does not exist");
    } else {
      const result = await prisma.plant.update({
        where: {
          id: plantId,
        },
        data: {
          moisture: moisture,
        },
      });
      console.log("done");
      res.json(result);
    }
  });

  return router;
};
