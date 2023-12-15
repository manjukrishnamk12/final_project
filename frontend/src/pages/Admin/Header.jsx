import React from 'react'
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Header({ OpenSidebar }) {
  return (
    <header className='header' >
      <div className='menu-icon'>
        <FormatAlignJustifyIcon className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left' >

      </div>
      <div className='header-right'>
        <Link to={'/Logout'}>
          <LogoutIcon className='icon' />
        </Link>
      </div>
    </header>
  )
}

export default Header
