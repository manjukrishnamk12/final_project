import React from 'react';
import styled from 'styled-components';
import flogo from './images/flogo.png';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Footer = () => {
  const FooterContainer = styled.footer`
    background-color: gray;
    color: #fff;
    padding: 20px;
    text-align: center;

    @media (max-width: 768px) {
      padding: 10px;
    }
  `;

  const Logo = styled.img`
    max-width: 100px;
    height: auto;
  `;

  const Heading = styled.h3`
    margin-bottom: 10px;
  `;

  const IconsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `;

  const Icon = styled.div`
    margin: 0 10px;
    font-size: 20px;
  `;

  const QuickLinks = styled.div`
    margin-bottom: 20px;
    padding: 10px;
  `;

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '20px',
    cursor: 'pointer',
  };

  return (
    <div>
      <footer className='footer'>
        <FooterContainer>
          <Logo src={flogo} alt="Logo" />

          <IconsContainer>
            <Icon>
              <PhoneIcon style={{ marginTop: '2px' }} />
              <span style={{ fontSize: 'medium' }}>+91 75 940 51437</span>
            </Icon>
            <Icon>
              <EmailIcon style={{ marginTop: '2px' }} />
              <span style={{ fontSize: 'medium' }}>info@ictkerala.org</span>
            </Icon>
          </IconsContainer>

          <QuickLinks>
            <Link style={linkStyle} to={'/'}>
              Home
            </Link>
            <Link to={'/About'} style={linkStyle}>
              About Us
            </Link>
            <Link to={'/Contact'} style={linkStyle}>
              Contact Us
            </Link>
          </QuickLinks>
          <IconsContainer>
            <Icon>
              <Link to="https://www.facebook.com/ictkerala/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </Link>
            </Icon>
            <Icon>
              <Link to="https://www.instagram.com/ictkerala/?hl=en" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </Link>
            </Icon>
            <Icon>
              <Link to="https://www.youtube.com/user/ictkerala" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon />
              </Link>
            </Icon>
          </IconsContainer>
        </FooterContainer>
      </footer>
    </div>
  );
};

export default Footer;