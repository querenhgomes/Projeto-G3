
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';




export default function Header(){

        return(
          <div>
            
            <Navbar className="text-primary" bg="light" expand="lg">
                    
                    <Navbar.Toggle className="nav mr-auto text-primary" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="nav mx-auto text-primary" id="basic-navbar-nav">
                      <Nav className="mx-auto text-primary">
                        <Nav.Link className="navbar-brand" href="#home">Home</Nav.Link>
                        <Nav.Link href="#jogos">jogos</Nav.Link>
                        <Nav.Link href="#comida">comida</Nav.Link>
                        <Nav.Link href="#carro">carro</Nav.Link>
                        <Nav.Link href="#desenho">desenho</Nav.Link>
                      </Nav>
                      
                    </Navbar.Collapse>
                    
                </Navbar>
                </div>
        );


}
