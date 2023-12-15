const mongoose=require ('mongoose');
const student=mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projectTitle: { type: mongoose.Schema.Types.ObjectId, ref: 'projectdata', required: true }
  
})
const studdata=mongoose.model('studentdata',student);
module.exports=studdata;