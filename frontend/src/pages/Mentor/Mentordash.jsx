// Mentordash.jsx
import React, { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../axiosinterceptor';

const Mentordash = () => {
  const [mentorId, setMentorId] = useState(null);
  const [mentorName, setMentorName] = useState('');
  const [mentorProjects, setMentorProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mentorId = localStorage.getItem("userid");

    if (mentorId) {
      axiosInstance
        .get(`http://localhost:3000/mentordash/mentors?id=${mentorId}`, {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        })
        .then((response) => {
          const mentorData = response.data;

          // Set mentor name from the API response
          setMentorName(mentorData.mentorName);

          // Ensure that mentorData.projects is an array
          const projectsArray = Array.isArray(mentorData.projects) ? mentorData.projects : [];

          setMentorProjects(projectsArray);
        })
        .catch((error) => {
          console.error('Error fetching mentor data:', error);
        });
    }
  }, [mentorId]);

  const handleCardClick = (projectId) => {
    navigate(`/Projectsubmission/${projectId}`);
  };

  return (
    <main className='main-container'>
      <div id="mentordisplay">
        <Typography variant="h4">Welcome, {mentorName}!</Typography>

        <Container maxWidth="lg" id="card-container">
          {mentorProjects.length === 0 ? (
            <Typography variant="h5" style={{ alignItems: 'center' }}>No projects assigned.</Typography>
          ) : (
            <Grid container spacing={3}>
              {mentorProjects.map((project, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card className="mcard" onClick={() => handleCardClick(project._id)}>
                    <CardMedia className="card-media" image={project.imageUrl} title={project.title} style={{ height: '190px' }} />
                    <CardContent className="card-content">
                      <Typography gutterBottom variant="h5" component="div">
                        <strong>{project.title}</strong>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </main>
  );
};

export default Mentordash;
