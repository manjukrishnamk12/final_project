import React from 'react';
import { useSpring, animated } from 'react-spring';
import intern from './images/intern.jpg' ;
import { Link } from 'react-router-dom';


const Home = () => {
  const buttonSpring = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 500  });

  // Animation for the internship image
  const imageSpring = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0.8)' } });
  return (
    <div className="home-container">
      <div className="content-container">
        <div className="text-container">
          <h2 id='call'>CALL FOR </h2> 
          <h1 id='intern'>INTERNS </h1>
          <p id='para'>The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it.</p>
          <Link to={'/About'} style={{ color: 'black', textDecoration: 'none' }}>
          <button id='but' style={buttonSpring}>Explore</button>
          </Link>
        </div>
        <animated.div className="image-container" style={imageSpring}>
          <img src={intern} alt="Internship" />
        </animated.div>
      </div>
    </div>
  );
}

export default Home;
