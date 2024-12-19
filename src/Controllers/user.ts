import bcrypt from "bcrypt";
import { prisma } from "../db";
import { Request, Response } from "express";
import { createtoken } from "../Middlewares/auth";
import { logger } from "../logger";

const checkexisting = async (username: string) => {
  return await prisma.user.findFirst({ where: { username } });
};

export const Login = async (req: Request, res: Response): Promise<void> => {
  console.log("Login Triggered");

  try {
    const { username, password } = req.body;

    const user = await checkexisting(username);
    if (!user) {
      res.status(404).json({ success: false, message: "Incorrect Username" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ success: false, message: "Incorrect Password" });
      return;
    }

    const token = await createtoken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    // res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000});
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true, // Prevents client-side scripts from accessing the cookie
      secure: true, // Ensures the cookie is sent over HTTPS only
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const Register = async (req: Request, res: Response): Promise<void> => {
  console.log("Request Came for Register");

  try {
    const { username, password, email } = req.body;

    const user = await checkexisting(username);
    if (user) {
      res.status(400).json({ success: false, message: "User Already Exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registration = await prisma.user.create({
      data: { email, username, password: hashedPassword },
    });

    if (!registration) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
      return;
    }

    res.status(200).json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    console.error(error);
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/////