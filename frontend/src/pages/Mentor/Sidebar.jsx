import React from 'react'
import logo from './images/logo.svg';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';

const Sidebar = ({ openSidebarToggle, OpenSidebar, onSidebarItemClick }) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img
            className='icon_header'
            src={logo}
            alt="Logo"
            style={{
              display: { xs: 'none', md: 'block' },
              marginRight: 1,
              height: '50px',
              width: '200px',
            }}
          />
        </div>

        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list' >
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Mentordash')}>

          <DashboardIcon className='icon' /> Dashboard

        </li>
        <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Viewtopic')} >

          <ViewListIcon className='icon' /> Submissions

        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
