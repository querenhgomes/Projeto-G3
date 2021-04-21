import {
  Button,
  Modal,
  Card,
  Container,
  Row,
  Col,
  Image,
  Media,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Comentarios from "../Comentarios";
import axios from "axios";
import { hexToRgb } from "@material-ui/core";
export default function Post(props) {
  //aqui os comentários
  const [Nomer, setNomer] = useState([]);

  useEffect(() => {
    Axios();
  }, []);

  async function Axios() {
    const response = await axios.get(
      "https://randomuser.me/api?nat=br&results=20"
    );
    setNomer(response.data.results);
  }
//aqui os modais
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card variant="primary" style={exibeBody}  onClick={handleShow}>
        <Card.Title style={exibeHeader} border="blue">
          <Media >
            <h5>{props.nome}</h5>
            <Media.Body>
              <p>{props.titulo}</p> <hr></hr>
            </Media.Body>
          </Media>
        </Card.Title>

        <Card.Body>
          <p>{props.resumo}</p>
        </Card.Body>
      </Card>

      <Modal  centered show={show} onHide={handleClose} size="lg">
        
        <Modal.Header style={exibeHeader} closeButton>
          <Modal.Title>{props.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={mystyle}>
          {props.conteudo}
          <br></br>
          {props.email}
          <div style={mystyle}>{props.dataPub}</div>
        </Modal.Body>
        
        <div style={mystyle} className="overflow-auto">
          <div>
            
            {Nomer.map((item, key) => {
              console.log(key);
              return (
                <Comentarios
                  key={key}
                  linkImage={item.picture.medium}
                  nome={item.name.first}
                  titulo={item.location.timezone.description}
                  email={item.email}
                  conteudo={"conteudo"}
                  dataPub={item.dob.date}
                  resumo={"Resumo"}
                />
              );
            })}
          </div>
        </div>
        <Modal.Footer style={exibeHeader}>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <br></br>
    </div>
  );
}

const mystyle = {
  maxHeight: '200px',
  padding: '10px',
  backgroundColor: hexToRgb('#afc6cc'),
};

const exibeHeader = {
  backgroundColor: hexToRgb('#95a8ad'),
};
const exibeBody = {
  backgroundColor: hexToRgb('#afc6cc'),
};


