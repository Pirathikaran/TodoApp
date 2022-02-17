const express = require("express");
const todoRoutes = express.Router();
const authVerify = require("../helpers/authVerify");
const todoController = require("../controller/todoController");

//create todo list
todoRoutes.post("/", authVerify, async (req, res) => {
  await todoController.createTodo(req, res);
});

//get all todolists by user Id
todoRoutes.get("/list/:id", authVerify, async (req, res) => {
  await todoController.getAllTodoLists(req, res);
});

//get one todo item by id
todoRoutes.get("/:id", authVerify, async (req, res) => {
  await todoController.getOneTodoList(req, res);
});

//update one todo item  by id
todoRoutes.put("/:id", authVerify, async (req, res) => {
  await todoController.updateOneTodoList(req, res);
});

//update task's status by using id
todoRoutes.put("/status/:id", authVerify, async (req, res) => {
  await todoController.updateOneTodoListStatus(req, res);
});

module.exports = todoRoutes;
