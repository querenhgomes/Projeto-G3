import { Button, Modal, Card, Container, Row, Col, Image,Media } from 'react-bootstrap'
import React, {useState, useEffect} from 'react';

export default function Post(props) {




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
      <div>
       
        <Card variant="primary" onClick={handleShow}>
          <Card.Title border="blue">
          <Media>
  <img
    width={64}
    height={64}
    className="mr-1"
    src={props.linkImage}
    alt="Generic placeholder"
  />
  <h5>{props.nome}</h5>
  <Media.Body>
    
    <p>
     {props.titulo}
    </p> <hr></hr>
  </Media.Body>
</Media>
          </Card.Title>
         
          <Card.Body><p>{props.resumo}</p></Card.Body>
        </Card>
        
        <Modal centered show={show} onHide={handleClose} size="lg">
        <Container>
              <Row>
                <Col >
                  <Image src={props.linkImage} roundedCircle />
                </Col>
              </Row>
            </Container>
          <Modal.Header closeButton>
            
            <Modal.Title>{props.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {props.conteudo}
            <br></br>
            {props.email}
          </Modal.Body>
          {props.dataPub}
          <hr></hr>
          Comentários Here

          <Modal.Footer>
          
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
           
          </Modal.Footer>
          
        </Modal>
        <br></br>
      </div>
    );
}
