import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router';







export default function Header(){
const [Color, setColor] = useState("white")
const style={
  backgroundColor: "black",
   

}


        return(
         
          <div>
            {console.log(Color)}
            <Navbar fixed="top"  className="text-secondary" style={style}  expand="lg">
                    
                    <Navbar.Toggle  className="nav ml-auto text-primary" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="nav mx-auto text-primary" id="basic-navbar-nav">
                      <Nav  activeKey="/home" onSelect={(selectedKey) => setColor("white")} className="mx-auto text-center">
                        <Nav.Link  style={Color === '/home' ? {color: 'white'}:{color: 'grey'}} className="navbar-brand" href="/home">Home</Nav.Link>
                        <Nav.Link style={Color === '/jogos' ? {color: 'white'}:{color: 'grey'}} className="navbar-brand" href="/jogos">Jogos</Nav.Link>
                        <Nav.Link style={Color === '/negocios' ? {color: 'white'}:{color: 'grey'}} className="navbar-brand" href="/negocios">Negocios</Nav.Link>
                        <Nav.Link style={Color === '/educacao' ? {color: 'white'}:{color: 'grey'}} className="navbar-brand" href="/educacao">Educação</Nav.Link>
                        <Nav.Link style={Color === '/tec' ? {color: 'white'}:{color: 'grey'}} className="navbar-brand" href="/tec">Tecnologia</Nav.Link>
                      </Nav>
                      
                    </Navbar.Collapse>
                    
                </Navbar>
                </div>
        );
        

}


