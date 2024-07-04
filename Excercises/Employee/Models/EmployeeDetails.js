const { Schema} = require('mongoose');
const { model} = require('mongoose');
const demo = new Schema({
    empid : {type:String ,required:true},
    name: {type:String ,required:true},
    position: {type:String ,required:true},
    department: {type:String ,required:true}
});

const sample = model('employee',demo);
module.exports = sample;
