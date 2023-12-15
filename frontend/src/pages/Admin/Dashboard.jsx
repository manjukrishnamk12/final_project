import React from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';


function Dashboard({ onSidebarItemClick  }) {
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h2>DASHBOARD</h2>
        </div>

        <div className='main-cards'>
            <div className='card'  onClick={() => onSidebarItemClick('Projectview')}>
                <div className='card-inner'>
                    <h3>Projects</h3>
                    <ViewModuleIcon className='card_icon'/>
                </div> 
            </div>
            <div className='card' onClick={() => onSidebarItemClick('Mentorview')}>
                <div className='card-inner'>
                    <h3>Mentors</h3>
                    <GroupsRoundedIcon className='card_icon'/>
                </div>    
            </div>
        </div>
    </main>
  )
}

export default Dashboard;