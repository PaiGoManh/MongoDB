const {Schema} = require('mongoose');
const {model} = require('mongoose');

const demo = new Schema({
    certID: {type: String,required: true},
    certName: {type: String, required:true},
    cname: {type: String, required:true},
    grade: {type: String, required:true},
    idate: {type: String, required:true}
})

const sample = model('certificates',demo);
module.exports=sample;
