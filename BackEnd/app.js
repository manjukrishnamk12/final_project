const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = new express();


require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./db/connect");

const adminrouter = require('./routes/basic');
app.use('/admin', adminrouter);


const projectrouter = require('./routes/projecttopic');
app.use('/project', projectrouter);

const mentorrouter = require('./routes/mentordata');
app.use('/mentor', mentorrouter);

const mentordashboard = require('./routes/mentordash');
app.use('/mentordash', mentordashboard);

const submission = require('./routes/submission');
app.use('/sub', submission);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})