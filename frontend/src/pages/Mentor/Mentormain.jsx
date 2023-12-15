import React from 'react';
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';
import Mentordash from './Mentordash';
import './Mentordash.css';
import Viewtopic from './Viewtopic';
import { useLocation, useNavigate } from 'react-router-dom';

const Mentormain = () => {
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
      {window.location.pathname === '/mentordash' && <Mentordash />}
      {window.location.pathname === '/viewtopic' && <Viewtopic />}
    </div>
  );
}

export default Mentormain;






