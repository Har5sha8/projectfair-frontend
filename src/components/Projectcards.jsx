import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import mediaplayerImage from '../assets/image2.jpeg'
import { Col,Row } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';

function Projectcards({project}) {
  console.log("====project====");
  console.log(project);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <Card style={{ width: '18rem' }} onClick={handleShow}>
      <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>
            {project.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} lg={6}>
              <img src={`${BASE_URL}/uploads/${project.projectImage}`} width={"100%"} height={"250px"}  alt="" />
            </Col>
            <Col md={6} lg={6}>
              <h4>Description</h4>
              <p>{project.overview}</p>
                  

                  <p><span className='fw-bolder'>Technologies:</span>{project.language}</p>
              

            </Col>

          </Row>
          <div className='d-flex mt-3'>
            <a href={project.website}style={{color:"black"}}><i class="fa-solid fa-link fa-2x ms-3"></i></a>
            <a href={project.github} target='_blank'   style={{color:"black"}}><i class="fa-brands fa-github fa-2x ms-3"></i></a>
          </div>
        </Modal.Body>
        
      </Modal>
    </div>
    
  )
}

export default Projectcards