import express from "express";
import { baseRoutes } from "./routes/BaseRouter";
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", baseRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
