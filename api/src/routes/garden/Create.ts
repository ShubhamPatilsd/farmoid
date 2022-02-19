import { Router } from "express";
import { prisma } from "../../database/db";
import FirebaseAdmin from "firebase-admin";

export const CreateGarden = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { authToken, name } = req.body;

    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);

    const exists = await prisma.garden.findFirst({
      where: {
        name: name,
        ownerId: user.uid,
      },
    });

    if (exists) {
      console.log("Garden exist");
      res.status(409).send("Garden already exists");
    } else {
      const result = await prisma.garden.create({
        data: {
          ownerId: user.uid,
          name: name,
        },
      });
      console.log("done");
      res.json(result);
    }
  });

  return router;
};
