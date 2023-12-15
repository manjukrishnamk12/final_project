const mongoose=require ('mongoose');
const project=mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    referenceUrl :{type:String}
})
const projectdata=mongoose.model('projectdata',project);
module.exports=projectdata;