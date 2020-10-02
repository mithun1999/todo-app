const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");


exports.getUserById = (req,res,next,id)=>{
    User.findById(id).exec((err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "No user found"
            });
        }
        req.profile = user;
        next();
    });
}