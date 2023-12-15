const express = require('express');
const router = express.Router();
const Project = require('../model/project');
const Mentor = require('../model/mentor');
const verifytoken = require('./basic');


// Endpoint for mentor registration in Addmentor 
router.post('/add', verifytoken, async (req, res) => {
  try {
    const { name, email, phoneNumber, password, projectTitle } = req.body;

    // Validate project titles
    const projects = await Project.find({ _id: { $in: projectTitle } });
    if (projects.length !== projectTitle.length) {
      return res.status(400).json({ error: 'Invalid project titles' });
    }

    // Create mentor
    const mentor = new Mentor({
      name,
      email,
      phoneNumber,
      password,
      projectTitle,
    });

    // Save mentor to the database
    await mentor.save();

    // Fetch the mentor data with project details populated
    const savedMentor = await Mentor.findById(mentor._id).populate('projectTitle');

    res.status(200).json({ message: 'Posted Successfully', mentor: savedMentor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//API for Mentor view in Mentorview page

router.get('/view', verifytoken, async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('projectTitle');
    res.json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//API for MEntor deletion in Mentorview

router.delete('/delete/:id', verifytoken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Mentor.findByIdAndDelete(id);
    res.json(`Document has been deleted..`);
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
})



//API for updation in Addmentor

router.put("/update/:id", verifytoken, async (req, res) => {
  try {
    const id = req.params.id;
    const updateddata = req.body;
    const result = await Mentor.findByIdAndUpdate(id, updateddata);
    res.status(200).send('Updated Successfully');
  } catch (error) {
    // res.status(500).send(error);
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;