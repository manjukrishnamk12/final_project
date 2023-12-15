const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Mentor = require('../model/mentor');
const Project = require('../model/project');
const verifytoken = require('./basic');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//API for Fetching Menotrname and projects


router.get('/mentors', verifytoken, async (req, res) => {

  try {
    const mentorId = req.query.id;
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    const projects = await Project.find({ _id: { $in: mentor.projectTitle } });
    res.status(200).json({ mentorName: mentor.name, projects });
  } catch (error) {
    console.error('Error fetching mentor data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;