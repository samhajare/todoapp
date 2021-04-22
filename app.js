const express = require("express");

const bodyparser = require("body-parser");

var app = express();

app.use(express.json());
const port = process.env.PORT || 8081;

//Configuring express server
//app.use(bodyparser.json());

const todosRouter = require("./routes/todos");
app.use("/todo", todosRouter);
app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app; // for testing
