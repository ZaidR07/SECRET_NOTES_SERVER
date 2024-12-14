import jwt from "jsonwebtoken";

const KEY = process.env.SECRETKEY;

if (!KEY) {
  throw new Error("SECRETKEY environment variable is not set.");
}

export const createtoken = (user: object): string => {
  try {
    return jwt.sign(user, KEY, { expiresIn: "24h" });
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while creating the token");
  }
};

export const verifytoken = (token: string): boolean => {
  try {
    jwt.verify(token, KEY);
    return true;
  } catch (error : any) {
    console.error("Token verification failed:", error.message);
    return false;
  }
};
