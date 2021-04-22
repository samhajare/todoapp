const router = require("express").Router();

const Task = require("../models/task.model");

var dbConn = require("/home/samadhan/Nodejs/todoapp/config/db.config.js");

//Get All todo data
router.route("/").get((req, res) => {
  Task.findAll((err, tasks) => {
    if (err) res.send(err);
    res.send(tasks);
  });
});

//Get limited data
router.route("/chunkdata/:limit/:offset").get((req, res) => {
  if (!req.params.limit || !req.params.offset) {
    return res
      .status(400)
      .json({ error: true, msg: "Not all fields have been entered." });
  }
  Task.findChunkData(req.params.limit, req.params.offset, (err, tasks) => {
    if (err) res.send(err);
    res.send(tasks);
  });
});

//Create User
router.route("/create").post((req, res) => {
  let { task, status, name } = req.body;

  if (!task || !status || !name) {
    return res
      .status(400)
      .json({ error: true, msg: "Not all fields have been entered." });
  }

  Task.create(req.body, (err, tasks) => {
    if (err) res.send(err);
    res.json({
      error: false,
      message: "Task added successfully!",
      data: tasks,
    });
  });
});

//update todo task
router.route("/update/:id").put((req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: true, msg: "Missing update Id" });
  }
  Task.update(req.params.id, req.body, (err, tasks) => {
    if (err) res.send(err);
    res.json({
      error: false,
      message: "Task Updated successfully!",
    });
  });
});

//delete todo task
router.route("/delete/:id").delete((req, res) => {
  Task.delete(req.params.id, (err, tasks) => {
    if (err) res.send(err);
    res.json({
      error: false,
      message: "Task Deleted",
    });
  });
});
module.exports = router;
