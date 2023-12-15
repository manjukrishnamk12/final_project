import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = (props) => {
  return (
    
      <div>
    <Navbar/>
    {props.child}
    <Footer/>
  </div>
   
  );
}

export default Main;
