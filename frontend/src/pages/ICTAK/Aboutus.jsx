import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import './about.css';
import 'bootstrap/dist/css/bootstrap.min.css'


const Aboutus = () => {
  return (
    <div>
      <Container>
      <Row>
        <Col><h1><b>About Us</b></h1>
        <p>ICT Academy of Kerala is a Social Enterprise created in a Public Private Partnership model (PPP) for imparting ICT skills to the youths of Kerala and improving their employability opportunities in the Industry. The Company is supported by Govt. of India, partnered by Govt. of Kerala and the IT industry.The ICT Academy of Kerala has emerged as a strategic partner for the industry, academia, and government in bridging the skills gap in the field of Information Communication Technology. Over the years, ICT Academy has successfully supported the industry and academia in talent needs and skills supply and has touched youths and professionals alike in fulfilling their career aspirations. We will continue to invest in building capabilities in the latest technology and business domains to help our beneficiaries. We shall work with the Government of Kerala in its mission for talent development and employment.</p></Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col>
        <Container>
      <Row>
        <Col md={5}><h2><b>Vision</b></h2>
        <p>The internship portal aims to revolutionize the internship search process by providing a seamless, transparent, and efficient platform for students and organizations. It focuses on empowering students with valuable opportunities for practical experience while assisting companies in discovering and nurturing talented individuals.
</p></Col>
        <Col md={7}>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901789.jpg?w=740&t=st=1700596282~exp=1700596882~hmac=bed6c38f9dff377ffa559c71498bfaeea87b11f7c1166c791c7719636b2a4421"
          alt=''
        />
<Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041848.jpg?w=740&t=st=1700596469~exp=1700597069~hmac=324c6ff09d396ad6e278ff14e99dece24bdeea514d22ca882982b6e4b5440dc4"
          alt=''
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/person-using-ai-tool-job_23-2150711484.jpg?w=740&t=st=1700596832~exp=1700597432~hmac=99d39620f20f66e1874dec746a6764228a9d8fd96540398e70984f2a6166e5b8"
          alt=''
        />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      
      {/* Add more Carousel.Items for additional slides */}
    </Carousel>
    </Col>
      </Row>
      </Container>
      </Col>
      </Row>

    </Container>

    </div>
  );
}

export default Aboutus;