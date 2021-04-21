import { Alert } from 'react-bootstrap'
import React, {useState, useEffect} from 'react';

export default function Comentarios(props) {


    return (
      <div>
       
       <Alert  variant="info">
  <Alert.Heading >Nome: {props.nome}</Alert.Heading>
  <p>
  
  </p>
  <hr />
  <p className="mb-0">
  Conteudo: {props.titulo}
  Conteudo: {props.conteudo}
  </p>
  Data: {props.dataPub}
</Alert>
        
      </div>
    );
}
