var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");

var todoSchema = new mongoose.Schema({
    content: String
});

var TodoWork = mongoose.model("Todo",todoSchema);

var urlEndCode = bodyParser.urlencoded( {extended: false});

module.exports = (app) => {
   
    //show all work to do
    app.get("/todo", (req, res) => {
        //get data from monogo
        TodoWork.find({}, (err, data) => {
            if(err) throw err;
            res.render("todo", {todos: data});
        });
    });

    //add work
    app.post("/todo", urlEndCode, (req, res) => {
        
        console.log(req.body);
        
        TodoWork(req.body).save((err, data) => {
            if(err) throw err;
            
            res.json(data);
        });
        
    });

    //delete to do
    app.delete("/todo/:item", (req, res) => {
        TodoWork.find({content: req.params.item}).remove(function (err, data) {
           if(err) throw err;
           res.json(data); 
        });
    });

}