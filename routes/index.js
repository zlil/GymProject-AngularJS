var express = require('express');
var path = require('path');
var models = require('../DB/models');
var app = express();


/* GET home page. */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

app.get('/SearchGym/:Gym/:city', function(req, res) {
  var gym = req.params['Gym'];
  var city= req.params['city'];
  console.log("im in the search route");

  models.gymsTable.findGym(gym,city).then(function (data) {
    res.json(data);
  });
});

app.get('/SearchGymByName/:name', function(req, res) {
  var name= req.params['name'];

  models.gymsTable.findAllGymsByName(name).then(function (data) {
    res.json(data);
  });
});


app.get('/SearchGym/:city', function(req, res) {
  var city= req.params['city'];

  models.gymsTable.findAllGymsInCity(city).then(function (data) {
    res.json(data);
  });
});


app.get('/SearchGymByLesson/:lesson', function(req, res) {
  var lesson= req.params['lesson'];

  models.gymsTable.findAllGymsByLesson(lesson, function (gyms) {
      res.json(gyms);
    });
  });


app.get('/SearchGymByNameCityLesson/:name/:city/:lesson', function(req, res) {
  var name= req.params['name'];
  var city= req.params['city'];
  var lesson= req.params['lesson'];
  models.gymsTable.findGymByNameCityLesson(name, city, lesson, function (gyms) {
    console.log(gyms);
    res.json(gyms);
  });
});


app.get('/SearchGymByNameLesson/:name/:lesson', function(req, res) {
  var name= req.params['name'];
  var lesson= req.params['lesson'];
  models.gymsTable.findGymByNameLesson(name, lesson, function (gyms) {
    res.json(gyms);
  });
});


app.get('/SearchGymByCityLesson/:city/:lesson', function(req, res) {
  var city= req.params['city'];
  var lesson= req.params['lesson'];

  models.gymsTable.findGymByCityLesson(city, lesson, function (gyms) {
    console.log("#########################" + gyms);

    res.json(gyms);
  });
});



app.get('/login/:email/:password', function(req, res) {
  console.log("im in the route");
  var mail = req.params['email'];
  var password= req.params['password'];
  models.adminsTable.loginAdmin(mail,password).then(function (data) {
    res.json(data);
  });
});


app.get('/adminMenu/', function(req, res) {
  console.log("im in the admin menu route");
  models.gymsTable.findAllGyms().then(function (data) {
    res.json(data);
  });
});

app.get('/adminMenuProducts/', function(req, res){
  console.log("im in the admin menu route- products");
  models.productsTable.findAllProducts().then(function (data) {
    res.json(data);
  });
});

app.get('/adminMenuCourse/', function(req, res){
  console.log("im in the admin menu route- products");
  models.lessonsTable.findAllLessons().then(function (data) {
    res.json(data);
  });
});

app.post('/addGym/', function(req, res){
  console.log("add gym !");
  console.log(req.body);
  models.gymsTable.createNewGym(req.body.name,req.body.city,req.body.street,req.body.houseNumber,req.body.coordinates, req.body.price,req.body.website,req.body.gymLessons, req.body.gymProducts).then(function () {
    res.sendStatus(200);
    //items.saveNewItem(req.body, req.user.email);
    //res.sendStatus(200);
    //res.json(data);
  });
});

app.post('/deleteGym/', function(req, res){
  console.log("delete gym- at the server!");
  console.log(req.body.name);
  models.gymsTable.deleteGym(req.body.name).then(function () {
    res.sendStatus(200);
   });
});

app.get('/getProducts/', function(req, res){
  console.log("get products");
  models.productsTable.findAllProducts().then(function (data){
    res.json(data);
  });
});

app.get('/getCourse/', function(req, res){
  console.log("get products");
  models.lessonsTable.findAllLessons().then(function (data){
    res.json(data);
  });
});

/*
app.get('/getAllProAndCourse/', function(req, res){
  console.log("editReturnGymProductsAndLessons you are here");
  models.gymsTable.editReturnGymProductsAndLessons().then(function (data){
    res.json(data);
  });
});
*/
app.get('/getAllProAndCourse/:GymName', function(req, res) {
  var gym = req.params['GymName'];
  console.log("editReturnGymProductsAndLessons you are here");
  models.gymsTable.editReturnGymProductsAndLessons(gym).then(function (data){
    res.json(data);
  });
});

app.post('/reSaveGym/', function(req,res){
  console.log("reSaveGym *** reSaveGym **** reSaveGym *** reSaveGym");
  console.log(req.body);
    //(name, city, street, houseNumber, price, website, lessons, products, callback)
  models.gymsTable.editGym(req.body.gymid,req.body.name,req.body.city,req.body.street,req.body.houseNumber,req.body.price,req.body.website,req.body.gymLessons, req.body.gymProducts).then(function (data){
    res.sendStatus(200);
  });
/*
  models.gymsTable.editGym(req.body.name,req.body.city,req.body.street,req.body.houseNumber,req.body.price,req.body.website,req.body.gymLessons, req.body.gymProducts).then(function () {
    res.sendStatus(200);
  });*/
});

app.get('/adminMenuGymsByCity/', function(req, res){
  console.log(" ------------- im in the admin menu route- grosssupby ------------- ");
  models.gymsTable.aggregate({ $group : { _id: '$city' , count: { $sum: 1 }}},function (err, result) {
    if (err)
      next(err);
    else {
      res.json(result);
    }
  });
});



module.exports = app;


