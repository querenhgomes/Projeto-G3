import { Button, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { hexToRgb } from "@material-ui/core";

export default function Criar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Opine aqui e agora
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={myStyle}>
          <Modal.Title>Compartilhe sua opinião</Modal.Title>
        </Modal.Header>
        <Modal.Body style={myStyle}>
          <Form>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                style={textBox}
                type="text"
                placeholder="escreva o titulo da sua opinião"
                maxLength="40"
              />
            </Form.Group>

            <Form.Group controlId="resumo">
              <Form.Label>Resumo</Form.Label>
              <Form.Control
              style={textBox}
                type="text"
                placeholder="faça um pequeno resumo da sua opinião"
                maxLength="70"
              />
            </Form.Group>
            <Form.Group controlId="opiniao">
              <Form.Label>Opinião</Form.Label>
              <Form.Control
              style={textBox}
                as="textarea"
                placeholder="digite sua opnião aqui"
                maxLength="1000"
                className="h-50"
              />
            </Form.Group>
    <hr></hr>
            <Form.Group controlId="assunto" >
              <Form.Label>Agora selecione um assunto que mais se encaixa sua opnião</Form.Label>
              <Form.Control style={textBox} as="select" defaultValue="escolha">
                <option>escolha</option>
                <option>Jogos</option>
                <option>Negócios</option>
                <option>Educação</option>
                <option>Tecnologia</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="assunto2">
              <Form.Label>Um outro assunto</Form.Label>
              <Form.Control style={textBox} as="select" defaultValue="escolha">
                <option>escolha</option>
                <option>Geral</option>
                <option>Jogos</option>
                <option>Negócios</option>
                <option>Educação</option>
                <option>Tecnologia</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={myStyle}>
          <Button variant="secondary" onClick={handleClose} >
            Fechar
          </Button>
          <Button variant="primary">Postar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
const myStyle = {
  backgroundColor: hexToRgb('#1f1902'),
  color: 'white'
}

const textBox = {
  backgroundColor: hexToRgb('#f2e2a5'),
  color: 'white'
}

