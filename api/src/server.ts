import express from "express";
import { baseRoutes } from "./routes/BaseRouter";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "./database/db";
// import initializePassport from "./passport-config";
import * as argon2 from "argon2";
const app = express();
const PORT = process.env.PORT || 5000;
import session from "express-session";
import cors from "cors";
var bodyParser = require("body-parser");
// initializePassport(passport);

app.use(
  session({
    secret: "verygoodsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//PassportJS stuff
app.use(passport.initialize());
app.use(passport.session());

//log server requests & request method
app.use(async (req, res, next) => {
  console.log(`[${req.method} - ${req.path}]`);
  res.header("Access-Control-Allow-Origin", "*");

  next();
});

app.use(cors({ origin: true, credentials: true }));

passport.serializeUser(async (user: any, cb: any) => {
  const userData: any = user as any;

  cb(null, userData);
});

passport.deserializeUser<string>(async (id, done) => done(null, { id }));

passport.use(
  new LocalStrategy(async function (email, password, done) {
    console.log("hi there");
    // (async () => {
    try {
      const user = await prisma.userAuth.findUnique({
        where: { email: email },
      });

      console.log(user);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      try {
        if (!(await argon2.verify(user.password, password))) {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
    // })();
  })
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // res.redirect("/login");
    console.log("no sign in");
  }
}

app.post(
  "/login",

  passport.authenticate("local", {
    failureRedirect: "/",
    failureMessage: true,
  })
);

// app.get("/")
// passport.use(
//   "local",
//   new LocalStrategy(function (email, password, done) {
//     (async () => {
//       const result = await prisma.userAuth
//         .findUnique({
//           where: { email: email },
//         })
//         .catch((err) => {
//           return done(err);
//         });

//       if (!result) {
//         const newPassword = await argon2.hash(password);
//         const createRes = await prisma.userAuth.create({
//           data: {
//             email: email,
//             password: newPassword,
//             name: "test",
//           },
//         });
//         return done(null, createRes);
//       }

//       try {
//         if (!(await argon2.verify(result.password, password))) {
//           return done(null, false);
//         }
//       } catch (err) {
//         return done(err);
//       }

//       return done(null, result);
//     })();
//   })
// );

// passport.serializeUser(async (user: any, cb: any) => {
//   const userData = user as any;

//   cb(null, userData);
// });

// passport.deserializeUser<string>(async (id, done) => done(null, { id }));

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.post(
//   "/login",
//   function (req, res, next) {
//     passport.authenticate("local", {
//       failureRedirect: "/",
//       failureMessage: true,
//     });
//   },
//   (req, res) => {
//     console.log("hi");
//     res.redirect("https://google.com");
//   }
// );

// app.get("/df", (req: any, res) => {
//   res.json(req.user);
// });

// app.use("/", baseRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
