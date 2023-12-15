const mongoose=require ('mongoose');
const mentor = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    projectTitle: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projectdata', required: true }],
    
});
const mentordata=mongoose.model('mentordata',mentor);
module.exports=mentordata;