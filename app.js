var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//App configuration
mongoose.connect("mongodb://localhost/slam_book");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Defining Schema and model for mongoose
var slamSchema =new mongoose.Schema({
    name: String,
    nameAgain: String,
    address: String,
    phone: Number,
    email: String,
    dob: Date,
    Zsign: String,
    web: String,
    boast: String,
    fun: String,
    once: String,
    never: String,
    oneLiner: String,
    date: String,
    film: String,
    dress: String,
    gang: String,
    teacher: String,
    truth: String,
    moment: String,
    funny: String,
    love: String,
    about: String,
    dated: {type: Date, default: Date.now}
})

var Slam = mongoose.model("Slam", slamSchema);



//----------ROUTES-----------

//route to landing page
app.get("/", function(req, res){
    res.render("landing");
})

//route to the place where all the person's details will be shown
app.get("/books", function(req, res){
    Slam.find({}, function(err, slams){
        if(err){
            console.log("ERROR!");
        } else{
            res.render("show", {slams : slams});
        }
    });
});

//route to create new slam book details
app.get("/books/new", function(req, res){
    res.render("formPage");
})

//create route
app.post("/books", function(req, res){
    Slam.create(req.body.slam, function(err, newSlam){
        if(err){
            res.render("formPage");
        } else{
            res.redirect("/books");
        }
    });
});

//SHOW Route
app.get("/books/:id", function(req, res){
    Slam.findById(req.params.id, function(err, foundSlam){
        if(err){
            res.redirect("/books");
        } else{
            res.render("showPage", {slam: foundSlam});
        }
    })
})


//listening at a port
app.listen(3000, function(req, res){
    console.log("Your slam book has started!");
})