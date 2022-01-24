import { prisma } from "../../database/db";
import { Router } from "express";
import fs from "fs";
import path from "path";
import FirebaseAdmin from "firebase-admin";
// import { getAuth } from "firebase-admin";

export const RegisterRoute = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const idToken = req.body.authToken;
    try {
      const user = await FirebaseAdmin.auth().verifyIdToken(idToken);
      const prismaResult = await prisma.user.findUnique({
        where: {
          uid: user.uid,
        },
      });

      if (prismaResult) {
        res.status(409).send("User already created");
      } else {
        await prisma.user.create({
          data: {
            uid: user.uid,
          },
        });

        res.send("Registered!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
    // console.log(user);
  });

  return router;
};
