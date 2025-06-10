import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const hosts = [process.env.CORS_ORIGIN, "https://semmax.vercel.app"];

var corsOptions = {};
if (process.env.CORS_ORIGIN === "*") {
  corsOptions = {
    origin: (origin, callback) => {
      callback(null, origin);
    },
    credentials: true,
  };
} else {
  corsOptions = {
    origin: hosts,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  };
}

import cors from "cors";

import cookieParser from "cookie-parser";

console.log(corsOptions);

// cors
// exp v5 wildcart * must have a name
app.options("/*splat", cors(corsOptions));
app.use(cors(corsOptions));

// cookie parser
app.use(cookieParser());

app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true }));

// enabling clerk
import { clerkMiddleware } from "@clerk/express";

app.use(
  clerkMiddleware({
    authorizedParties: hosts,
  })
);

app.use((req, res, next) => {
  console.log("[SERVER] Incoming Request:", req.method, req.path);
  next();
});

// Serve static files from "public" for index.html
app.use(express.static(path.join(__dirname, "public")));

import router from "./routes/index.js";
app.use("/api", router);

// exp v5 wildcart * must have a name
app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
