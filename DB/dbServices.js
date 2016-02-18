/**
 * Created by tomeraronovsky on 2/9/16.
 */

//all functions to insert, delete, find, replace, to database are here
var models = require('../DB/models')
var mongoose = require('mongoose');


initDB();
function initDB(){
    var initAdmins = require('./initializationDB/initAdmin');
    var initProducts = require('./initializationDB/initProducts');
    var initLessons = require('./initializationDB/initLessons');
    var initGyms = require('./initializationDB/initGyms');

    var adminsTable = models.adminsTable;
    var productsTable = models.productsTable;
    var lessonsTable = models.lessonsTable;
    var gymsTable = models.gymsTable;

    models.adminsTable.count(function(err,count){
      if(!err && count==0){
          console.log("admins table is empty - insert init data from json");
          adminsTable.collection.insert(initAdmins);
      }
        else {
          console.log("admin table already with data");
      }
    });

    models.productsTable.count(function(err,count){
        if(!err && count==0){
            console.log("products table is empty - insert init data from json");
            productsTable.collection.insert(initProducts);
        }
        else {
            console.log("products table already with data");
        }
    });

    models.lessonsTable.count(function(err,count){
        if(!err && count==0){
            console.log("lessons table is empty - insert init data from json");
            lessonsTable.collection.insert(initLessons);
        }
        else {
            console.log("lessons table already with data");
        }
    });

    models.gymsTable.count(function(err,count){
        if(!err && count==0){
            console.log("gyms table is empty - insert init data from json");
            gymsTable.collection.insert(initGyms);
        }
        else {
            console.log("gyms table already with data");
        }
    });
}




// ----------- Create Functions ----------- //
models.gymsTable.createNewGym = function(name, city, street, houseNumber,coordinates, price, website, lessons, products){

    var gym = new models.gymsTable({
        name: name,
        city: city,
        street: street,
        houseNumber: houseNumber,
        coordinates: coordinates,
        price: price,
        website: website,
        gymLessons: [lessons[0],lessons[1],lessons[2], lessons[3], lessons[4], lessons[5], lessons[6], lessons[7]],
        gymProducts: [products[0],products[1],products[2], products[3], products[4], products[5], products[6]]
    });
    gym.save(function(err){
        if(!err)
            console.log("saved successfull");
        else console.log(err);
    });
}



// ----------- Admin ----------- //
models.adminsTable.loginAdmin =  function(email, password) {

    var query  = models.adminsTable.findOne({ email: email, password: password},function (err) {
        if (err)
            console.log(err);
    });

    return query.exec(function (err, admin) {
        return admin;
    });


}


// ------- Delete functions -------//
models.gymsTable.deleteGym = function(name){
    models.gymsTable.remove({name: name}, function (err) {
        if (!err) {
            console.log("gym remove successful or if doesn't exist doesn't remove anything");
        }
        else console.log(err);
    });
}



// ------ Edit functions -------//
models.gymsTable.editGym = function (gymid,name, city, street, houseNumber, price, website, lessons, products) {

    console.log("########### Gym city : ##########" + city);
    console.log(products);
    models.gymsTable.update({_id: gymid}, {$set: {name:name,city:city,street:street,houseNumber:houseNumber,price:price,website:website,gymLessons:lessons,gymProducts:products} ,$inc: {__v: 1}},  function (err){
        console.log("errrrrrrr" + err);
    });
}

    /*var query = models.gymsTable.find({name:name}, {city:city, street:street, houseNumber:houseNumber, price: price, website:website, lessons:lessons, products:products }, callback).populate('gymLessons', 'name')
        .populate('gymProducts','name');
    return query.exec(function(err,gyms){
        console.log("Im in the edit gym function..... ###########" + gyms);
        return JSON.stringify(gyms);
    });*

    /*models.gymsTable.findOne({name: name}, function(err, foundGym) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("found the gym ###########" + foundGym);

            var query = models.gymsTable.update({name:name, city:city, street:street, houseNumber:houseNumber, price: price, website:website, lessons:lessons, products:products }).populate('gymLessons', 'name')
                .populate('gymProducts','name');
            return query.exec(function(err,gyms){
                callback(gyms);
            })*/




models.gymsTable.editReturnGymProductsAndLessons =function(name){
    var query =  models.gymsTable.find({name:name })
        .populate('gymLessons', 'name').populate('gymProducts','name');
    return query.exec(function(err, gyms){
        console.log("############" + gyms);
        return JSON.stringify(gyms);
    });
}


// -------------  SEARCH FUNCTIONS ------------- //

models.gymsTable.findGym =function(name,city){
    var query =  models.gymsTable.find({name:name, city:city})
        .populate('gymLessons', 'name').populate('gymProducts','name');
    return query.exec(function(err, gyms){
        return JSON.stringify(gyms);
    });
}

models.gymsTable.findAllGymsInCity =function(city){
    var query =  models.gymsTable.find({city:city })
    .populate('gymLessons', 'name').populate('gymProducts','name');
    return query.exec(function(err, gyms){
        return JSON.stringify(gyms);
    });

}

models.gymsTable.findAllGyms = function() {
    var query  = models.gymsTable.find({},function (err) {
        if (err)
            console.log(err);
    });

    return query.exec(function (err, gyms) {
        return JSON.stringify(gyms);
    });
}

models.gymsTable.findAllGymsByName =function(name){
    var query =  models.gymsTable.find({name:name })
        .populate('gymLessons', 'name').populate('gymProducts','name');
    return query.exec(function(err, gyms){
        return JSON.stringify(gyms);
    });
}


models.gymsTable.findAllGymsByLesson = function(lessonName, callback) {

    models.lessonsTable.findOne({name: lessonName}, function(err, lesson) {
        if(err) {
            console.log(err);
        }
        else {
            if(!lesson)
            {
                callback(null);

            }else {
            var query = models.gymsTable.find({ gymLessons: lesson["_id"] }).populate('gymLessons', 'name')
                .populate('gymProducts','name');
            return query.exec(function(err,gyms){
                    callback(gyms);
                })
        }}
    })
}



models.gymsTable.findGymByNameCityLesson = function(name, city, lessonName, callback) {

    models.lessonsTable.findOne({name: lessonName}, function(err, lesson) {
        if(err) {
            console.log(err);
        }
        else {
            if(!lesson)
            {
                callback(null);

            }else {
            var query = models.gymsTable.find({ gymLessons: lesson["_id"], name:name, city: city }).populate('gymLessons', 'name')
                .populate('gymProducts','name');
            return query.exec(function(err,gyms){
                callback(gyms);
            })
        }}
    })
}


models.gymsTable.findGymByNameLesson = function(name, lessonName, callback) {
    models.lessonsTable.findOne({name: lessonName}, function(err, lesson) {
        if(err) {
            console.log(err);
        }
        else {
            if(!lesson)
            {
                callback(null);

            }else {
                if(!lesson)
                {
                    callback(null);

                }else {
            var query = models.gymsTable.find({ gymLessons: lesson["_id"], name:name }).populate('gymLessons', 'name')
                .populate('gymProducts','name');
            return query.exec(function(err,gyms){
                callback(gyms);
            })
        }}
        }
    })
}


models.gymsTable.findGymByCityLesson = function(city, lessonName, callback) {
    models.lessonsTable.findOne({name: lessonName}, function(err, lesson) {
        if(err) {
            console.log(err);
        }
        else {
            if(!lesson)
            {
                callback(null);

            }else {
            var query = models.gymsTable.find({ gymLessons: lesson["_id"], city:city }).populate('gymLessons', 'name')
                .populate('gymProducts','name');
            return query.exec(function(err,gyms){
                callback(gyms);
            })
        }
        }
    })
}




//    var query = models.lessonsTable.find({name: lessonName}, function (err) {
//        if (err)
//            console.log(err);
//    });
//
//    return query.exec(function (err, lesson) {
//        var s = models.gymsTable.find({gymLessons: mongoose.Types.ObjectId(lesson[0]["_id"])}, function (err) {
//        });
//        return s.exec(function(err, gyms){
//            return JSON.stringify(gyms);
//        });
//        /*var query =  models.lessonsTable.find({name:lessonName}, function(err){
//         if (err)
//         console.log(err);
//         });
//
//         return query.exec(function (err, lesson) {
//
//
//         var query1 = models.gymsTable.find({_id: {$in}}, function(err){
//         if(err)
//         console.log(err);
//         });
//         return query1.exec(function(err, gyms){
//         return JSON.stringify(gyms);
//         });
//
//
//         console.log("#################" + lesson[0]["_id"]);
//         });*/
//    });
//}





models.lessonsTable.findAllLessons = function() {

    var query  = models.lessonsTable.find({},function (err) {
        if (err)
            console.log(err);
    });

    return query.exec(function (err, lessons) {
        return JSON.stringify(lessons);
    });
}


models.productsTable.findAllProducts = function() {
    var query  = models.productsTable.find({},function (err) {
        if (err)
            console.log(err);
    });

    return query.exec(function (err, products) {
        return JSON.stringify(products);
    });
}


models.gymsTable.findAllGymsByCityGroupBy = function() {
    console.log("------------ Im in the DB --------------- ");


    var query  = models.gymsTable.aggregate([{ $group : { _id: '$city' , count: { $sum: 1 }}}],function (err, result) {
        if (err)
            next(err);
        else {
            console.log(result);
            return JSON.stringify(result);
        }
    });

    /*
     return query.exec(function (err, gyms) {
     console.log("The Result is :::::::  " + gyms);
     return JSON.stringify(gyms);
     });*/
}



//var gym = createNewGym('holmes place raanana','Hayezira st 10',60,'http://www.holmes-place.co.il');
/*models.lessonsTable.findOne({ name: 'Yoga', time: 'Monday, 8pm to 10.30pm' }, function (err, lesson) {
 if (!lesson)
 console.log("not find lesson");
 else {
 console.log("find lesson");
 }


 models.gymsTable.findOne({name: 'Holmes Place Raanana'}, function (err, gym) {
 if (!gym)
 console.log("not find gym");
 else {
 console.log("find gym");
 gym.gymLessons.push(lesson._id);
 gym.save(function (err) {
 if (err)
 console.log("error to update lesson");
 })
 }
 })
 });

 */


//login('tomer_aronovsky@hotmail.com', '12345');
//addProducts();
////addProducts();
//addProducts();
//function addProducts(){
//    new models.productsTable({
//        name: 'sadsadsadsadas',
//        price: 78678767,
//        comment: 'sadasdsadsadasdsa'
//    }).save()
//};
/*models.gymsTable.findAllGymsInCity =function(city){
    var query  = models.gymsTable.find({city:city },function (err) {
        if (err)
            console.log(err);
    });

    return query.exec(function (err, gymsInCity) {
        return gymsInCity;
    });
}*/

