const {Schema} = require('mongoose');
const { model} = require('mongoose');
const demo = new Schema({
    id: { type:String, required: true},
    title:    { type:String, required: true},
    description:  { type:String, required: true}
});

const sample = model('task', demo);
module.exports=sample;