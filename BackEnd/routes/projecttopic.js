const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const prodata = require('../model/project');
const router = express.Router();
const jwt=require('jsonwebtoken')
const verifytoken = require('./basic');

//API for projects view in Projectview
router.get("/view",verifytoken,async (req, res) => {
    try {
      const getpost = await prodata.find();
      res.json(getpost);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  });
  


  //API for project registration in Addproject
router.post('/add',verifytoken,async (req, res) => {
    const data = new prodata({
        title: req.body.title,
        description: req.body.description,
         imageUrl :req.body.imageUrl,
         referenceUrl:req.body.referenceUrl
    })
  
    try {
        const dataToSave = await data.save();
        res.status(200).send("Posted Successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  })
  
  
  //API for updation in Add project
  
  router.put("/update/:id",verifytoken,async (req, res) => {
  try {
    const id = req.params.id;
  const updateddata = req.body;
  const result = await prodata.findByIdAndUpdate(id, updateddata);
   
  res.status(200).send('Updated Successfully');
  } catch (error) {
    res.status(500).send(error);
  }
  });
  

  //API for project deletion
  
  router.delete('/delete/:id',verifytoken,async (req, res) => {
  try {
      const id = req.params.id;
      const data = await prodata.findByIdAndDelete(id);
      res.json(`Document with ${data.title} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })


  //API for displaying project titles

  router.get('/protitle', verifytoken,async (req, res) => {
    try {
      const projects = await prodata.find({}, 'title');
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports=router;