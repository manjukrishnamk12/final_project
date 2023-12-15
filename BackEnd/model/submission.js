const mongoose=require ('mongoose');
const submission=mongoose.Schema({

  project: { type: mongoose.Schema.Types.ObjectId, ref: 'projectdata', required: true },
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'mentordata', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'studentdata', required: true },
  submissionUrl:{ type: String, required: true },
  status: { type: String, default: 'pending' },
  marks: { type: String},
  comments: { type: String },
  referenceMaterial: { type: String }
})
const subdata=mongoose.model('submissiondata',submission);
module.exports=subdata;