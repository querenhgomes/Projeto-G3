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
import { hexToRgb } from "@material-ui/core";
import axios from "axios";
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

  //aqui os handles do modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card variant="primary" style={exibeBody} onClick={handleShow}>
        <Card.Title border="blue" style={exibeHeader}>
          <Media>
            <Media.Body>
              <h6>{props.titulo}</h6>
              <hr></hr>
            </Media.Body>
          </Media>
        </Card.Title>

        <Card.Body>
          <p>{props.resumo}</p>
        </Card.Body>
      </Card>

      <Modal centered show={show}  onHide={handleClose} size="lg">
        
        <Modal.Header style={exibeHeader} closeButton>
          <Modal.Title>{props.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={exibeBody}>
          {props.conteudo}
          <br></br>
          {props.email}
          <div style={mystyle}>{props.dataPub}</div>
        </Modal.Body>
        
        
        <div style={mystyle} className="overflow-auto">
          <div>
            <br></br>
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
  maxHeight: "200px",
  padding: "10px",
  backgroundColor: hexToRgb("#e3d8a6"),
};

const exibeHeader = {
  backgroundColor: hexToRgb("#f2cd27"),
};
const exibeBody = {
  backgroundColor: hexToRgb("#e3d8a6"),
};
