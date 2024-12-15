import { Router } from "express";
import { Login, Register } from "../Controllers/user";
import { verifyTokenMiddleware } from "../Middlewares/auth";
import { Createnotes } from "../Controllers/notes";

const userrouter = Router();

userrouter.post("/login",  Login);
userrouter.post("/register", Register);
userrouter.post("/createnotes", verifyTokenMiddleware , Createnotes);


export default userrouter;
