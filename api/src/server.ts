import express from "express";
import { baseRoutes } from "./routes/BaseRouter";

const app = express();
const PORT = process.env.PORT || 5000;
import session from "express-session";
import cors from "cors";
const bodyParser = require("body-parser");

// import bodyParser from "body-parser";
import { firebaseAdminSetup } from "./util/FirebaseAdminSetup";

firebaseAdminSetup();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//log server requests & request method
app.use(async (req, res, next) => {
  console.log(`[${req.method} - ${req.path}]`);
  res.header("Access-Control-Allow-Origin", "*");

  next();
});

app.use(cors({ origin: true, credentials: true }));

app.use("/", baseRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
