import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userrouter from "./Routers/user";
import notesrouter from "./Routers/notes";
import cookieParser from "cookie-parser";


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

app.use(cookieParser());

app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
  })
);

app.use("/", () => console.log("Hit"))

// Use the user router with a base path
app.use(userrouter , notesrouter);

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (e: any) {
  console.log("Failed to start the server:", e.message);
}
