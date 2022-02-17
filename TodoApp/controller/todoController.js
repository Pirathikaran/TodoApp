const Todo = require("../models/Todo");

async function createTodo(req, res) {
  try {
    const todoList = new Todo({
      content: req.body.content,
      createdby: req.user.id,
    });
    const saveTodo = await todoList.save();
    res.send(saveTodo);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

async function getAllTodoLists(req, res) {
  try {
    const getAllTodoLists = await Todo.find({
      createdby: req.params.id,
    });
    if (!getAllTodoLists[0]) {
      res.status(404).json({
        error: {
          message: "Not found",
        },
      });
    }
    res.status(200).json(getAllTodoLists);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

async function getOneTodoList(req, res) {
  try {
    const getOneTodoList = await Todo.findById(req.params.id);
    if (!getOneTodoList) {
      res.status(404).json({
        error: {
          message: "Not found",
        },
      });
    }
    res.status(200).json(getOneTodoList);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

async function updateOneTodoList(req, res) {
  try {
    const updateOneTodoList = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { content: req.body.content, updatedAt: new Date() } }
    );
    if (!updateOneTodoList) {
      res.status(404).json({
        error: {
          message: "Not found",
        },
      });
    }
    const getOneTodoList = await Todo.findById(req.params.id);
    res.status(200).json(getOneTodoList);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

async function updateOneTodoListStatus(req, res) {
  try {
    const updateOneTodoList = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { status: req.body.status, updatedAt: new Date() } }
    );
    if (!updateOneTodoList) {
      res.status(404).json({
        error: {
          message: "Not found",
        },
      });
    }
    const getOneTodoList = await Todo.findById(req.params.id);
    res.status(200).json(getOneTodoList);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

module.exports.createTodo = createTodo;
module.exports.getAllTodoLists = getAllTodoLists;
module.exports.getOneTodoList = getOneTodoList;
module.exports.updateOneTodoList = updateOneTodoList;
module.exports.updateOneTodoListStatus = updateOneTodoListStatus;
