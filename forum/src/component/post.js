import { Card, Button, Accordion, Modal  } from 'react-bootstrap'
import React, {useState, useEffect} from 'react';

function Post(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    

    <div>
      <br></br>
      {/* 
            <Card>
              <Card.Header>
                  <Card.Title>{props.titulo}</Card.Title>
              </Card.Header>
                <Card.Text>
                    {props.conteudo}
                </Card.Text>
              <Button variant="primary">{props.btntext}</Button>
            </Card>
          */}

      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              {props.resumo + " " + props.key + " " + props.gender}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body onClick={handleShow}>{props.resumo + " " + props.gender + " " + props.key + " " + props.btntext}</Card.Body>
          </Accordion.Collapse>
        </Card>

      </Accordion>


      <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{props.gender}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.conteudo}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    
                </Modal.Footer>
            </Modal>

    </div>
  )
}

export default Post
