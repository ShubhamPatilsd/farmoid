import { Router } from "express";
import { prisma } from "../../database/db";
import FirebaseAdmin from "firebase-admin";
import { plants } from "../../../types/plants";

export const CreatePlant = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { authToken, name, plantType } = req.body;

    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);

    const exists = await prisma.plant.findFirst({
      where: {
        name: name,
        ownerId: user.uid,
      },
    });

    if (plants.indexOf[plantType] < 0) {
      res.status(404).send("Plant type not found");
    }

    if (exists) {
      console.log("Plant exist");
      res.status(409).send("Plant already exists");
    } else {
      const result = await prisma.plant.create({
        data: {
          ownerId: user.uid,
          name: name,
          moisture: 0,
          type: plantType,
        },
      });
      console.log("done");
      res.json(result);
    }
  });

  return router;
};
