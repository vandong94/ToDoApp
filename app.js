var express = require("express");

var todoController = require("./controllers/todoController");

var app = express();


todoController(app);

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

//listen to port
app.listen(4000, () => {
    console.log("Server is running");
});
