import React from 'react';
import { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar';
import './dash.css';
import Addproject from './Addproject';
import Addmentor from './Addmentor';
import Mentorview from './Mentorview';
import Projectview from './Projectview';
import Dashboard from './Dashboard';

const Admindash = () => {
  const navigate = useNavigate();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  };
  const handleSidebarItemClick = (option) => {
    navigate(`/${option.toLowerCase()}`);

  };
  return (
    <div id='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      {<Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} onSidebarItemClick={handleSidebarItemClick} />}
      {window.location.pathname === '/dashboard' && <Dashboard />}
      {window.location.pathname === '/addproject' && <Addproject />}
      {window.location.pathname === '/projectview' && <Projectview />}
      {window.location.pathname === '/addmentor' && <Addmentor />}
      {window.location.pathname === '/mentorview' && <Mentorview />}
    </div>
  );
}

export default Admindash
