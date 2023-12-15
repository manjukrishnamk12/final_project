const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Mentor = require('../model/mentor');
const Project = require('../model/project');
const student = require('../model/student');
const Submission = require('../model/submission');
const verifytoken = require('./basic');

// Fetch submissions based on batch or project
router.get('/mentor/submissions',verifytoken, async (req, res) => {
  const { batchOrProjectId } = req.query;

  try {
    const mentorId = req.query.id;

    // Ensure mentorId is valid
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ error: 'Invalid mentor ID' });
    }

    // Use mentorId directly without creating a new ObjectId instance
    let query = { mentor: mentorId };

  
    var submissions = await Submission.find(query)
      .populate('student', 'name batch email')
      .populate('project', 'title')
      .exec();

     if(batchOrProjectId==='batch'){
       submissions = submissions.sort((a, b) => {
        const batchA = a.student.batch.toUpperCase();
        const batchB = b.student.batch.toUpperCase();
        return batchA.localeCompare(batchB);
      });
    }
      else if(batchOrProjectId==='project'){
        submissions = submissions.sort((a, b) => {
          const batchA = a.project.title.toUpperCase();
          const batchB = b.project.title.toUpperCase();
          return batchA.localeCompare(batchB);
        });
     }
    res.json(submissions);
     console.log(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});






//API for fetching projects based on mentor id and project id
router.get('/mentor/projects', verifytoken,async (req, res) => {
  

  try {
    const mentorId = req.query.id;
    const projectId = req.query.projectId;
     // Ensure mentorId is valid
     if (projectId && !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }
    let query = { mentor: mentorId };

    if (projectId) {
      query.project = projectId;
    }
    var submissions = await Submission.find(query)
    .populate('student', 'name batch email')
    .populate('project', 'title')
    .exec();
    res.json(submissions);
     console.log(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//API for displaying submissions based on mentorid and submission id in evaluate page

router.get('/student/projects',verifytoken, async (req, res) => {
  try {
    const mentorId = req.query.id;
    const submissionId = req.query.submissionId;

    console.log('mentorId:', mentorId);
    console.log('submissionId:', submissionId);

    // Ensure mentorId is valid
    if (submissionId && !mongoose.Types.ObjectId.isValid(submissionId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    // Use findById to retrieve a single submission
    const submission = await Submission.findById(submissionId)
      .where({ mentor: mentorId }) // Filter by mentorId
      .populate('student', 'name batch email') // Populate the student fields
      .populate('project', 'title') // Populate the project title
      .exec();

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submission);
    console.log(submission);
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//API for popsting data in Evaluate page

router.post('/submit/:submissionId',verifytoken, async (req, res) => {
  try {
    const { marks, comments, referenceMaterial } = req.body;
    const submissionId = req.params.submissionId;

    // Assuming you want to update only if the submission status is 'pending'
    const submission = await Submission.findOneAndUpdate(
      {
        _id: submissionId,
        status: 'pending', // You may adjust this condition based on your needs
      },
      {
        marks,
        comments,
        referenceMaterial,
        status: 'completed',
      },
      { new: true } // This option returns the updated document
    );
    console.log(submission,'1234');

    if (!submission) {
      // If the submission is not found or already completed
      return res.status(400).json({ error: 'Invalid submission ID or submission already completed' });
    }

    res.status(200).send("Posted Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//API for updating data in Evaluate page

router.put('/evaluate/:submissionId',verifytoken, async (req, res) => {
  try {
    const { marks, comments, referenceMaterial } = req.body;
    const submissionId = req.params.submissionId;
    
    console.log(submissionId);
    console.log(marks);
    // Assuming you want to update only if the submission status is 'pending'
    const submission = await Submission.findOneAndUpdate(
      {
        _id: submissionId
        // You may adjust this condition based on your needs
      },
      {
        marks,
        comments,
        referenceMaterial,
        status: 'completed',
      },
      { new: true } // This option returns the updated document
    );
    console.log(submission,'abcd');

    if (!submission) {
      // If the submission is not found or already completed
      return res.status(400).json({ error: 'Invalid submission ID or submission already completed' });
    }

    res.status(200).send("Updated Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//API for deleting data from projectsubmissions and viewtopic pages


router.delete('/submissions/delete/:submissionId',verifytoken, async (req, res) => {
  try {
      const submissionId = req.params.submissionId;
      const data = await Submission.findByIdAndDelete(submissionId);
      res.json(`Document has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })



//API for getting marks,comments,reference Material for evaluate page

  router.get('/evaluate/:submissionId',verifytoken, async (req, res) => {
    try {
      const submissionId = req.params.submissionId;
  
      // Assuming you want to retrieve data only if the submission status is 'completed'
      const submission = await Submission.findOne({
        _id: submissionId,
        status: 'completed', // You may adjust this condition based on your needs
      });
  
      if (!submission) {
        // If the submission is not found or not completed
        return res.status(404).json({ error: 'Submission not found or not completed' });
      }
  
      // Extract relevant data and send it in the response
      const { marks, comments, referenceMaterial } = submission;
     
      res.status(200).json({ marks, comments, referenceMaterial });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


module.exports = router;
