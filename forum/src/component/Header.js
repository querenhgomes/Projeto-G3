import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link as Lonk} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './ViewHome';
import Negocios from './ViewNegocios';
import Jogos from './ViewJogos';
import Educacao from './ViewEducacao';
import Tec from './ViewTec';




export default function Header() {
 
   


return (
  <div>
    <Navbar fixed="top"   bg="dark"  expand="lg">
     
      
      
        <Nav >
          <NavDropdown  title="TEU NOME AQUI MANO" id="basic-nav-dropdown">
            <NavDropdown.Item  href="/login">SAIR</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      
    </Navbar>
  </div>
);
  
 
}

