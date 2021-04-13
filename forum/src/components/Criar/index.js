import { Button, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";

export default function Criar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Opine aqui e agora
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Compartilhe sua opinião</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="escreva o titulo da sua opinião"
                maxLength="40"
              />
            </Form.Group>

            <Form.Group controlId="resumo">
              <Form.Label>Resumo</Form.Label>
              <Form.Control
                type="text"
                placeholder="faça um pequeno resumo da sua opinião"
                maxLength="70"
              />
            </Form.Group>
            <Form.Group controlId="opiniao">
              <Form.Label>Opinião</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="digite sua opnião aqui"
                maxLength="1000"
                className="h-50"
              />
            </Form.Group>
    <hr></hr>
            <Form.Group controlId="assunto">
              <Form.Label>Agora selecione um assunto que mais se encaixa sua opnião</Form.Label>
              <Form.Control as="select" defaultValue="escolha">
                <option>escolha</option>
                <option>Jogos</option>
                <option>Negócios</option>
                <option>Educação</option>
                <option>Tecnologia</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="assunto2">
              <Form.Label>Um outro assunto</Form.Label>
              <Form.Control as="select" defaultValue="escolha">
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary">Postar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
