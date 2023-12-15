import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Contact.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';
import emailjs from 'emailjs-com'; 
import 'bootstrap/dist/css/bootstrap.min.css'


const Contact = () => {
  const userID = '6aZilVuI6P3ulL5_v';

emailjs.init(userID);

  const sendEmail = (e) => {
    e.preventDefault();

    // Your EmailJS service ID and template ID
    const serviceId = 'service_dkhs0cb';
    const templateId = 'template_ujn4yrc';

    // Parameters for sending the email
    const templateParams = {
      from_name: e.target.elements.name.value, // Adjust this line to access form elements
      from_email: e.target.elements.email.value,
      message: e.target.elements.message.value,
    };
    //const templateParams = {
    //  from_name: e.target.name.value,
    //  from_email: e.target.email.value,
    //  message: e.target.message.value,
   // };

    // Sending the email using EmailJS
    emailjs.send(serviceId ,templateId, templateParams)
      .then((response) => {
        console.log('Email sent!', response.status, response.text);
        alert("Your message has been sent successfully");
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert("Error:Please check the information you have entered");

      });
  };
  return (
    <div>
       <Container>
      <Row>
        <Col md={6} className='firstColumn'>
        <div className="contact-container">
      <h2><b>Contact Us</b></h2>
      

      {/* Contact Details */}
      <div className="contact-details">
        <div className="contact-item">
          <FaPhone />
          <p>Phone: +91 75 940 51437</p>
          
        </div>
        <div className="contact-item">
          <FaEnvelope />
          <p>Email:info@ictkerala.org</p>
        </div>
        <div className="contact-item">
          <FaMapMarker />
          <p><b>Head Quarters</b><br />
                     G1,Ground Floor, Thejaswini, <br />Technopark Campus
                                     Thiruvananthapuram,<br /> Kerala, India - 695 581
                                                            Office: +91 471 270 0811</p>

           <p><b>Regional Centre (North)</b><br />
                            2nd Floor, UL Cyberpark Building,<br /> Nellikode Post
                            Kozhikode,Kerala, India - 673 016</p>
         <p><b>Regional Centre (Central)</b>
                            B-Wing, Kanikonna Villa, <br /> Infopark Campus
                             Koratty, Thrissur, Kerala, India - 680 308</p>
        </div>
      </div>

  
    </div>
        </Col>
        <Col md={6} className='secondColumn'>
          
          
          <Form onSubmit={sendEmail}>
          <Form.Group className="mb-3" controlId="name">
            <h1><b>Let's Connect! Drop Us a Message</b></h1>
        <Form.Label><b>Name</b></Form.Label>
        <Form.Control type="text"  name="name"placeholder="Name" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label><b>Email address</b></Form.Label>
        <Form.Control type="email" name="email" placeholder="name@example.com" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="message">
        <Form.Label><b>Message</b></Form.Label>
        <Form.Control as="textarea" rows={3} name="message" required />
      </Form.Group>
      <Button type="submit" variant="primary">Send</Button>{' '}
    </Form>
        </Col>
      </Row>
      
    </Container>
    </div>
  );
}

export default Contact;