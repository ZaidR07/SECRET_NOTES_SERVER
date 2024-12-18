import { Request, Response } from "express";
import { prisma } from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { logger } from "../logger";

export const Createnotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { text, title } = req.body;
    const token = req.cookies.token;

    const decodedtoken = jwt.decode(token) as JwtPayload;

    const creationstatus = await prisma.notes.create({
      data: { userid: decodedtoken.id, title: title, text: text },
    });

    if (!creationstatus) {
      res.status(400).json({
        message: "Creation Unsucessful",
      });
      return;
    }

    res.status(200).json({
      message: "Creation Sucessful",
    });
  } catch (error) {
    // logger.error(error)
    console.log(error);

    res.status(400).json({
      message: "Creation Unsucessful",
    });
  }
};

export const getnotes = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;

    const decodedtoken = jwt.decode(token) as JwtPayload;

    const retrievestatus = await prisma.notes.findMany({
      where: {
        userid: decodedtoken.id,
      },
    });

    

    if (retrievestatus) {
      res.status(200).json({
        notes: retrievestatus,
      });
      return;
    }

    res.status(400);
  } catch (error) {
    res.status(500);

  }
};
