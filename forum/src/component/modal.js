import { Button, Modal, Card } from 'react-bootstrap'
import React, {useState, useEffect} from 'react';

export default function Moodal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div> 
            <br></br>
            <Card variant="primary" onClick={handleShow}>
                <Card.Body>{props.resumo}</Card.Body>
            </Card>
            

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
