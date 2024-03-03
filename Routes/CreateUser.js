import express from "express";
import User from "../models/User.js";

import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const jwtSecret = process.env.SECRET_KEY

const router = express.Router();

router.post("/createuser", [
body('email').isEmail(),
body('password','password length <5').isLength({ min: 5}) ] //message to be shown password length <5
 ,async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }
    

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        const newUser = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create user" });
    }
});

router.post("/loginuser",[
    body('email').isEmail(),
    body('password','password length <5').isLength({ min: 5}) ]
    ,async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array() });
    }
    let email = req.body.email;
    
         try {
           let userData =  await User.findOne({email});
           if(!userData){
            return res.status(400).json({ errors : "Try logging in with correct credentials" })
           }

           const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

           if(!pwdCompare){
           return res.status(400).json({ errors : "Try logging in with correct credentials" })
           }

           const data = {
            user:{
                id:userData.id
            }
           }
           const authToken = jwt.sign(data,jwtSecret);
           return res.json({ success: true,authToken: authToken })
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Failed to create user" });
        }
    });

export default router;
