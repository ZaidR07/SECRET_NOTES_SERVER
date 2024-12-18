import { Router } from "express";
import { Login, Register } from "../Controllers/user";


const userrouter = Router();

userrouter.post("/api/login",  Login);
userrouter.post("/api/register", Register);


export default userrouter;
