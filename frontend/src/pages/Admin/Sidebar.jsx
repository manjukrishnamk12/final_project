import React from 'react'
import logo from './images/logo.svg';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

function Sidebar({ openSidebarToggle, OpenSidebar, onSidebarItemClick }) {
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
                                <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Dashboard')}>

                                        <DashboardIcon className='icon' /> Dashboard

                                </li>
                                <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Addproject')} >

                                        <AddCircleIcon className='icon' /> Add Project

                                </li>
                                <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Projectview')}>

                                        <ViewListIcon className='icon' /> Projects

                                </li>
                                <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Addmentor')}>

                                        <PersonAddIcon className='icon' /> Add Mentor

                                </li>
                                <li className='sidebar-list-item' onClick={() => onSidebarItemClick('Mentorview')}>

                                        <GroupsRoundedIcon className='icon' /> Mentors

                                </li>

                        </ul>
                </aside>
        )
}

export default Sidebar