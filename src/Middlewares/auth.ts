
import jwt from "jsonwebtoken";

const KEY = process.env.SECRETKEY;

export const createtoken = (user: object) => {
  if (KEY) {
    return jwt.sign(user, KEY);
  }
};


export const verifytoken = (token : any) : boolean => {
    try {
        if(!token || !KEY){
            return false
        }

        jwt.verify(token , KEY);
        return true
       
        
    } catch (error) {
        return false
    }
}
