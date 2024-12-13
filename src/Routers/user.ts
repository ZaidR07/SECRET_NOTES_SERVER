import { Router } from "express";
import { Login, Register } from "../Controllers/user";

const userrouter = Router();

userrouter.post("/login", Login);
userrouter.post("/register", Register);

export default userrouter;
