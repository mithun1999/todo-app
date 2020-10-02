const express = require('express');
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const { User } = require("../models/User");
const Todo = require("../models/Todo");



const { auth } = require("../middleware/auth");


exports.createTodo = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "Problem with file"
        });
      }
      //destructure the fields
      const { name, priority } = fields;
  
      if (!name || !priority) {
        return res.status(400).json({
          error: "Please include necessary fields"
        });
      }
  
      let todo = new Todo(fields);
  
      //handle file here
      if (file.attachment) {
        if (file.attachment.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        const attachment = file.attachment;
        let oldPath = attachment.path;
        let newPath = path.join(__dirname, '../../client/public/uploads')+'/'+attachment.name;
        let rawData = fs.readFileSync(oldPath) ;
        fs.writeFile(newPath, rawData, function(err){ 
            if(err){
                return res.status(400).json({
                    error: "Error in uploading file"
                  });
            }
            
        }) 
      todo.attachment = file.attachment.name;
      }
      todo.createdby = req.user._id;
  
      //save to the DB
      todo.save((err, todo) => {
        if (err) {
          res.status(400).json({
            error: "Saving TODO in DB failed"
          });
        }
        res.json(todo);
      });
    });
  };
  


exports.getTodoById = (req,res,next,id)=>{
    Todo.findById(id).exec((err,todo)=>{
        if(err){
            return res.status(400).json({
                error: "Todo not found"
            })
        }
        req.todo = todo;
        next();
    })
}

exports.getTodo = (req,res)=>{
    return res.json(req.todo);
}

exports.getTodoByUser = (req,res) =>{
    const userId = req.user._id;
    Todo.find({
        createdby:userId
    })
    .exec((err,todos)=>{
        if(err){
            return res.status(400).json({
                error: "Todos not found"
            })
        }
        return res.json(todos)
    })
}


exports.updateTodo = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }


      let todo = req.todo;
      todo = _.extend(todo, fields);
  
      //handle file here
      if (file.attachment) {
        if (file.attachment.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        const attachment = file.attachment;
        let oldPath = attachment.path;
        let newPath = path.join(__dirname, '../../client/public/uploads')+'/'+attachment.name;
        let rawData = fs.readFileSync(oldPath) ;
        fs.writeFile(newPath, rawData, function(err){ 
            if(err){
                return res.status(400).json({
                    error: "Error in uploading file"
                  });
            }
            
        }) 

        todo.attachment = file.attachment.name;

      }
  
      //save to the DB
      todo.save((err, todo) => {
        if (err) {
          res.status(400).json({
            error: "Saving TODO in DB failed"
          });
        }
        res.json(todo);
      });
    });


}



exports.deleteTodo = (req,res)=>{
    let todo = req.todo;
    todo.remove((err, deletedTodo)=>{
      if(err){
          return res.status(400).json({
              error: "Failed to delete the Todo"
          })
      }
      res.json({
          message: "Todo deleted successfully",
          deletedTodo
      });
  });
}

exports.getTodoByUserArchive = (req,res) =>{
  const userId = req.user._id;
  Todo.find({
      createdby:userId,
      archived:"Yes"
  })
  .sort({priority: -1})
  .exec((err,todos)=>{
      if(err){
          return res.status(400).json({
              error: "Todos not found"
          })
      }
      return res.json(todos)
  })
}

exports.getTodoByUserNotArchive = (req,res) =>{
  const userId = req.user._id;
  Todo.find({
      createdby:userId,
      archived:"No"
  })
  .sort({priority: -1})
  .exec((err,todos)=>{
      if(err){
          return res.status(400).json({
              error: "Todos not found"
          })
      }
      return res.json(todos)
  })
}