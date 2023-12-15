import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
// import axiosInstance from '../axiosinterceptor';


const Login = ({ isLoginClicked }) => {

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const inputHandler = (e) =>{
    setUser({...user,[e.target.name]:e.target.value})
    setErrors({ ...errors, [e.target.name]: '' });
  }

  const validateForm = () => {
    const newErrors = {};

    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!user.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const addHandler=()=>{
    if (validateForm()) {
    axios.post('http://localhost:3000/admin/login',user).then((res)=>{
      localStorage.setItem("userid", res.data.userid);
      alert(res.data.message);
      if (res.data.message === 'success') {
        sessionStorage.setItem("userToken", res.data.token);
        if (user.email === 'admin@gmail.com') {
          navigate('/Dashboard');
        } else {

          navigate('/Mentordash');
        }
      }
    })

    .catch((error) => {
      if (error.response && error.response.status === 401) {
          alert('Invalid credentials. Please try again.');
          setUser(' ');
      } else {
          console.error('Error during login:', error);
          alert('An error occurred. Please try again later.');
          setUser(' ');
      }
  });
  
  }
}
  
  
  return (
    <div>
       <div id='log'>
      <form className='loginform'>
      <Typography variant='h3' id='head'>

 Login
</Typography>
<br/> <br/>

<TextField  className='text'  variant='outlined' label='Email' name='email' onChange={inputHandler} 
 error={Boolean(errors.email)}
 helperText={errors.email} />
<br/> <br/>
<TextField className='text' type='password' variant='outlined' label='Password' name='password' onChange={inputHandler} 
error={Boolean(errors.password)}
helperText={errors.password}/>
<br/> <br/>
<Button variant='contained' className='btn-log'  color='primary'  onClick={addHandler}>Login</Button>
<br/> <br/> <br/>

    
</form>

    </div>
    
    </div>
  );
}

export default Login;
