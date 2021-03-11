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





export default function Sidebar(){
const [Color, setColor] = useState("white")
const style={
  backgroundColor: "yellow",
   

}


        return(
         
          <div>
            {console.log(Color)}
            <Router>
            
            <Navbar fixed="top"  className="text-primary" style={style}  expand="lg">
                    
                    <Navbar.Toggle  className="nav ml-auto text-primary" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="nav mx-auto text-primary" id="basic-navbar-nav">
                      <Nav  activeKey="/home" onSelect={(selectedKey) => setColor("white")} to="/home" className="mx-auto text-center">
                        <Lonk style={Color === '/home' ? {color: 'white'}:{color: 'grey'}} to="/home"  className="navbar-brand" >Home</Lonk>
                        <Lonk style={Color === '/jogos' ? {color: 'white'}:{color: 'grey'}} to="/jogos"  className="navbar-brand" >Jogos</Lonk>
                        <Lonk style={Color === '/negocios' ? {color: 'white'}:{color: 'grey'}} to="/negocios"  className="navbar-brand" >Negocios</Lonk>
                        <Lonk style={Color === '/educacao' ? {color: 'white'}:{color: 'grey'}} to="/educacao"  className="navbar-brand" >Educação</Lonk>
                        <Lonk style={Color === '/tec' ? {color: 'white'}:{color: 'grey'}} to="/tec"  className="navbar-brand">Tecnologia</Lonk>
                      </Nav>
                      
                    </Navbar.Collapse>
                    
                </Navbar>
                
               <Switch>
                    <Route path="/home" exact={true}  component={Home}/>
                    <Route path="/jogos" exact={true}  component={Jogos}/>
                    <Route path="/negocios" exact={true} component={Negocios}/>
                    <Route path="/educacao" exact={true} component={Educacao}/>
                    <Route path="/tec" exact={true} component={Tec}/>
                </Switch>   
            
                </Router>
                </div>
        );
        

}


