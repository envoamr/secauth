import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.router";
import dashboardRouter from "./routes/dashboard.router";
import session from "express-session";
import MongoStore from "connect-mongo";

import { SessionData } from "express-session";

// putting this in ./src/types/index.d.ts doesn't work for some reason
// gonna try to get it to work later, for now it's here
declare module "express-session" {
  interface SessionData {
    user: {
      id?: string;
      isLoggedIn: boolean;
    };
  }
}

const app = express();

// cors
const corsWhitelist = ["http://localhost:3000", "http://localhost:5000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (corsWhitelist.indexOf(origin) !== -1 || typeof origin === "undefined") {
      console.log(`Origin ${origin} was allowed by CORS`);
      callback(null, true);
    } else {
      console.log(`Origin ${origin} was blocked by CORS`);
    }
  },
  credentials: true,
};

// connect to mongodb atlas
const mongodbClient = mongoose
  .connect(process.env.MONGODB_DBAUTH_URI!)
  .then((m) => m.connection.getClient());
const db = mongoose.connection;
db.on("err", console.error);
db.once("open", () => console.log("Connected to database..."));

// sessions
const SESSION_SECRETS: string | string[] = process.env.SESSION_SECRETS?.split(" ") || "";

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: "id",
    secret: SESSION_SECRETS,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
    store: MongoStore.create({
      clientPromise: mongodbClient,
      dbName: "user_info",
      stringify: false,
      autoRemove: "interval",
      autoRemoveInterval: 1,
      collectionName: "sessions",
    }),
  })
);

app.use("/api/auth", cors(corsOptions), authRouter);
app.use("/api/dashboard", cors(corsOptions), dashboardRouter);

app.get("/", (req, res) => {
  res.send("Get to / no thanks");
});

// 404
app.use((req, res) => res.status(404).send("404 from /*"));

app.listen(5000, () => console.log("start"));
