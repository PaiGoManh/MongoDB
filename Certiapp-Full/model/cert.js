const { Schema} =require('mongoose');
const { model} =require('mongoose');
const demo = new Schema({
   certid: { type: String, required: true},
   name: { type: String, required: true },
   coursename: { type: String, required: true },
   grade: { type: String, required: true},
   date: { type: String, required: true }
});

const sample = model('certidetails', demo);
module.exports=sample;