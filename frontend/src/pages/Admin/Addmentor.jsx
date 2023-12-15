import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import axiosInstance from '../../axiosinterceptor';

const Addmentor = (props) => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue } = useForm();
  const [mentors, setMentors] = useState({
    name: props.data ? props.data.name : '',
    email: props.data ? props.data.email : '',
    phoneNumber: props.data ? props.data.phoneNumber : '',
    password: props.data ? props.data.password : '',
    projectTitle: props.data ? [props.data.projectTitle._id] : [],
  });
  const [errors, setErrors] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [update, setUpdate] = useState(false); // Define the setUpdate function

  useEffect(() => {
    axiosInstance.get('http://localhost:3000/project/protitle')
      .then((response) => {
        setProjectList(response.data);

        // Set default values for the form fields
        if (props.data) {
          const defaultProjectTitle = props.data.projectTitle.map((project) => project._id);
          setMentors((prevMentors) => ({
            ...prevMentors,
            projectTitle: defaultProjectTitle,
          }));

          Object.keys(props.data).forEach((key) => {
            setValue(key, props.data[key]);
          });
        }
      })
      .catch((error) => console.error('Error fetching projects:', error));
  }, [props.data, setValue]);

  useEffect(() => {
    // Update the selected projects text field when mentors.projectTitle changes
    setValue('projectTitle', mentors.projectTitle);
  }, [mentors.projectTitle]);


  useEffect(() => {
    if (update) {
      // Trigger navigation here
      console.log('Navigating to Mentorview page');
      navigate('/Mentorview');
    }
  }, [update, navigate]);



  const showAlert = () => {
    alert('Updated Successfully');

  };


  const validateForm = () => {
    const newErrors = {};
    if (!mentors.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!mentors.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(mentors.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!mentors.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else {
      // Define a regular expression for the phone number pattern
      const phoneRegex = /^(91)?[6-9]\d{9}$/;
    
      if (!phoneRegex.test(mentors.phoneNumber)) {
        newErrors.phoneNumber = 'Invalid phone number';
      }
    }
   
    if (!mentors.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}/.test(mentors.password)) {
      newErrors.password =
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.';
    }
    if (mentors.projectTitle.length === 0) {
      newErrors.projectTitle = 'Project Title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'projectTitle') {
      const selectedProjects = Array.isArray(value) ? value : [value];

      setMentors((prevMentors) => ({
        ...prevMentors,
        projectTitle: selectedProjects,
      }));

      setValue(name, selectedProjects);
    } else {
      setMentors((prevMentors) => ({
        ...prevMentors,
        [name]: value,
      }));

      setValue(name, value);
    }
  };



  const handleRegister = async (data) => {
    try {
      if (props.method === 'put') {

        // Remove the project title that needs to be removed
        const updatedData = {
          ...data,
          projectTitle: mentors.projectTitle,
        };
        const response = await axiosInstance.put(`http://localhost:3000/mentor/update/${props.data._id}`, data);
        console.log('Update response:', response); // Log the entire response

        if (response.data === 'Updated Successfully') {
          console.log('Update successful. Triggering alert.');
          showAlert();
          window.location.reload(false);
          navigate('/mentorview');
          // Set update to true
          setUpdate(true);
        } else {
          console.log('Update failed. Response:', response.data);
          alert('Not updated');
        }

      } else {
        if (validateForm()) {
          const response = await axiosInstance.post('http://localhost:3000/mentor/add', data);
          console.log('Post response:', response); // Log the entire response

          if (response.data && response.data.message === 'Posted Successfully') {
            console.log('Post successful. Triggering alert.');
            alert('Posted Successfully');
            window.location.reload(false);
            navigate('/Mentorview');
          } else {
            console.log('Post failed. Response:', response.data);
            alert('Not posted');
          }

        }
      }
    } catch (error) {
      console.error('Error posting/updating mentor:', error);
    }
  };




  const handleButtonClick = handleSubmit(handleRegister);

  return (
    <main className='main-container'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', maxWidth: '800px' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="mentor">
          <form className="mentorform" >
            <Grid container spacing={2} style={{ width: '100%', maxWidth: '800px' }} >
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant='h4' className="mentorhead">Mentor Registration Form</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={mentors.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={mentors.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={mentors.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber)}
                  helperText={errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  className="textfields"
                  id="outlined-error"
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={mentors.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControl fullWidth style={{ margin: '8px 0 0 8px' }}>
                  <InputLabel id="project-title-label">Project Title</InputLabel>
                  <Controller
                    name="projectTitle"
                    control={control}
                    defaultValue={mentors.projectTitle.map(String)} // Convert IDs to strings
                    render={({ field }) => (
                      <Select
                        labelId="project-title-label"
                        id="project-title"
                        {...field}
                        multiple
                        value={mentors.projectTitle.map(String)}
                        onChange={handleChange}
                      >
                        {projectList.map((project) => (
                          <MenuItem key={project._id} value={String(project._id)}>
                            {project.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.projectTitle && (
                    <p className="error-message">{errors.projectTitle}</p>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  className="textfields"
                  id="outlined-read-only-input"
                  label="Selected Projects"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={mentors.projectTitle
                    .map((selectedProjectId) => projectList.find((project) => project._id === selectedProjectId)?.title)
                    .join(', ')}
                  onChange={(e) => {
                    // Handle changes in the selected projects text field
                    // Update the state and form value accordingly
                    const selectedProjects = e.target.value
                      .split(',')
                      .map((title) => projectList.find((project) => project.title === title.trim())?._id)
                      .filter(Boolean);

                    setMentors((prevMentors) => ({
                      ...prevMentors,
                      projectTitle: selectedProjects,
                    }));

                    setValue('projectTitle', selectedProjects);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type="submit" className='submit' variant="contained" color="primary" onClick={handleButtonClick}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>

        </div>
      </Box>
    </main>
  );
}

export default Addmentor;
