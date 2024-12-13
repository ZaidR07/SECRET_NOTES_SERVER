import bcrypt from 'bcrypt';
import { prisma } from "./db";
import { Request , Response } from "express";




export const Login = async ( req : Request , res : Response) : Promise<void> => {
    console.log("login Tiggered");
    
}

const checkexisting = async (username : string) => {
    return await prisma.user.findFirst({ where: { username } });
}


export const Register = async ( req : Request , res : Response ) : Promise<void> => {
    console.log("Register");
    
    const { username , password }  =  req.body;

    const user = await checkexisting(username);

    if(user){
        res.status(400).json({
            message : "User Already Exists"
        })
        return
    }

    const hashedpassword = await bcrypt.hash(password , 10);

    const registration =  await prisma.user.create({data : {username : username , password : hashedpassword}})

    if(!registration){
        res.status(500).json({
            message : "Internal Server Error"
        })
        return
    }

    res.status(200).json({
        message : "Registered Successfully"
    })


    
}