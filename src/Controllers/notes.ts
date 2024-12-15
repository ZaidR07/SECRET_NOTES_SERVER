import { Request, Response } from "express";
import { prisma } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { logger } from "../logger";

export const Createnotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { text } = req.body;
    const token = req.cookies.token;

    const decodedtoken = jwt.decode(token) as JwtPayload;

    const creationstatus = await prisma.notes.create({
      data: { userid: decodedtoken.id, text: text },
    });

    if (!creationstatus) {
      res.status(400).json({
        message: "Creation Unsucessful",
      });
      return
    }

    res.status(400).json({
      message: "Creation Sucessful",
    });

  } catch (error) {
    logger.error(error)
    res.status(400).json({
      message: "Creation Unsucessful",
    });
  }
};


