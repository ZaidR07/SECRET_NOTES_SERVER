import { Router } from "express";
import { verifyTokenMiddleware } from "../Middlewares/auth";
import { Createnotes , like, unlike} from "../Controllers/notes";
import { getnotes } from "../Controllers/notes";
import { deletenote } from "../Controllers/notes";

const notesrouter = Router();

notesrouter.get("/api/getnotes" , verifyTokenMiddleware , getnotes);
notesrouter.post("/api/createnotes", verifyTokenMiddleware , Createnotes);
notesrouter.delete("/api/deletenote", verifyTokenMiddleware , deletenote);
notesrouter.post("/api/like", verifyTokenMiddleware , like);
notesrouter.post("/api/unlike", verifyTokenMiddleware , unlike);


export default notesrouter