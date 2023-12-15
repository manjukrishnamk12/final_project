import React from 'react';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useNavigate } from 'react-router-dom';


function Dashboard({ onSidebarItemClick }) {
    const navigate = useNavigate();

    const handleCardClick = (option) => {
        navigate(`/${option.toLowerCase()}`);
    };

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h2>DASHBOARD</h2>
            </div>

            <div className='main-cards'>
                <div className='card' onClick={() => handleCardClick('Projectview')}>
                    <div className='card-inner'>
                        <h3>Projects</h3>
                        <ViewModuleIcon className='card_icon' />
                    </div>
                </div>
                <div className='card' onClick={() => handleCardClick('Mentorview')}>
                    <div className='card-inner'>
                        <h3>Mentors</h3>
                        <GroupsRoundedIcon className='card_icon' />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard;