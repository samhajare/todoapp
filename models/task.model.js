var dbConn = require("../config/db.config.js");

//create Task Object
var Task = function (todo) {
  this.task = todo.task;
  this.status = todo.status;
  this.name = todo.name;
  this.created_at = new Date();
  this.updated_at = new Date();
};

Task.create = function (newTask, result) {
  dbConn.query("INSERT INTO task set ?", newTask, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Task.findAll = function (result) {
  dbConn.query("Select * from task", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("task : ", res);
      result(null, res);
    }
  });
};

//Pagination
Task.findChunkData = function (limit, offset, result) {
  dbConn.query(
    `Select * from task LIMIT ${offset}, ${limit}`,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("task : ", res);
        result(null, res);
      }
    }
  );
};

Task.update = function (id, task, result) {
  dbConn.query(
    "UPDATE task SET task=?,status=?,name=? WHERE id = ?",
    [task.task, task.status, task.name, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Task.delete = function (id, result) {
  dbConn.query("DELETE FROM task WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
