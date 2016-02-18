/**
 * Created by tomeraronovsky on 2/6/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//data base schemas
var lessonSchema = new Schema({
    name: { type: String, index: true },
    comment: String,
    //time: String,
    //numberOfPeople: Number
});

var productSchema = new Schema({
    name: { type: String, index: true },
    //price: Number,
    comment: String
});

var gymSchema = new Schema({
    name: { type: String, index: true },
    city: String,
    street: String,
    houseNumber: String,
    price: Number,
    website: String,
    coordinates: String,
    //lists
    gymLessons: [ {type: Schema.Types.ObjectId, ref: 'lessons'}],
    gymProducts: [{ type: Schema.Types.ObjectId, ref: 'products'}]
});

var adminSchema = new Schema({
    email:  { type: String, index: true },
    password: String
});

module.exports.adminsTable = mongoose.model('admins',adminSchema);
module.exports.gymsTable = mongoose.model('gyms',gymSchema);
module.exports.productsTable = mongoose.model('products',productSchema);
module.exports.lessonsTable = mongoose.model('lessons',lessonSchema);



