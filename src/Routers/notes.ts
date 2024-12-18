import { Router } from "express";
import { verifyTokenMiddleware } from "../Middlewares/auth";
import { Createnotes } from "../Controllers/notes";
import { getnotes } from "../Controllers/notes";

const notesrouter = Router();

notesrouter.get("/api/getnotes" , verifyTokenMiddleware , getnotes);
notesrouter.post("/api/createnotes", verifyTokenMiddleware , Createnotes);

export default notesrouter