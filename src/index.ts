import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userrouter from "./Routers/user";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing the request body
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
  })
);

// Use the user router with a base path
app.use("/api", userrouter);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (e: any) {
  console.log("Failed to start the server:", e.message);
}