const { Schema} =require('mongoose');
const { model} = require('mongoose');
const demo = new Schema({
    BlogID: { type:String, required: true},
    title:    { type:String, required: true},
    author:  { type:String, required: true},
    content:  { type:String, required: true}
});

const sample = model('blog', demo);
module.exports=sample;