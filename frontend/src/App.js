
import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/ICTAK/Home';
import Aboutus from './pages/ICTAK/Aboutus';
import Contact from './pages/ICTAK/Contact';
import Main from './components/Main';
import Login from './components/Login';
import Admindash from './pages/Admin/Admindash';
import Dashboard from '@mui/icons-material/Dashboard';
import Addproject from './pages/Admin/Addproject';
import Projectview from './pages/Admin/Projectview';
import Addmentor from './pages/Admin/Addmentor';
import Mentorview from './pages/Admin/Mentorview';
import Mentormain from './pages/Mentor/Mentormain';
import Mentordash from './pages/Mentor/Mentordash';
import Viewtopic from './pages/Mentor/Viewtopic';
import Projectsubmission from './pages/Mentor/Projectsubmission';
import Evaluate from './pages/Mentor/Evaluate';
import { Requireauth } from './Auth';
import { Logout } from './Logout';

function App() {
 
 
  return (
    

    <div className='App'>
    <Routes>
      {/* Routes in home page   */}
      <Route path = '/'  element={<Main child ={<Home />}/>}></Route>
      
      <Route path = '/About'  element={<Main child ={<Aboutus />}/>}></Route>
      <Route path = '/Contact'  element={<Main child ={<Contact />}/>}></Route>
      <Route path = '/Logout' element={<Logout/>}></Route>
      
      
      {/* Routes to Admin dashboard */}
       <Route path = '/Dashboard' element={<Requireauth><Admindash child={<Dashboard/>}/></Requireauth>}></Route>
       <Route path = '/Addproject' element={<Requireauth><Admindash child={<Addproject/>}/></Requireauth>}></Route>
       <Route path = '/Projectview' element={<Requireauth><Admindash  child={<Projectview/>}/></Requireauth>}></Route>
       <Route path = '/Mentorview' element={<Requireauth><Admindash  child={<Mentorview/>}/></Requireauth>}></Route>
       <Route path = '/Addmentor' element={<Requireauth><Admindash  child={<Addmentor/>}/></Requireauth>}></Route> 

        {/* Routes to Mentor dashboard */}
        <Route path = '/Mentordash' element={<Requireauth><Mentormain child={<Mentordash/>}/></Requireauth>}></Route>
       <Route path = '/Viewtopic' element={<Requireauth><Mentormain child={<Viewtopic/>}/></Requireauth>}></Route>
       <Route path='/Projectsubmission/:projectId' element={<Requireauth><Projectsubmission /></Requireauth>} ></Route>
       <Route path = '/Evaluate/:submissionId' element={ <Requireauth><Evaluate/></Requireauth>}></Route>
      </Routes>
       </div>
  
  );
}

export default App;
