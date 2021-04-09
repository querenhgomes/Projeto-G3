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





function SideNav(props) {

     
      
    return(
         <>
         <Router>
         <br></br><br></br>
      <div class="box-form">
            <br></br>
	<div class="left">
      <br></br>
		<div class="overlay">
		<h1>Login Page.</h1>
		<p>Faça seu login para continuar</p>
		<br></br><br></br><br></br>
		</div>
	</div>

	
		<div class="right">
		<h5>Login</h5>
            <br></br><br></br><br></br><br></br>
		<p>Don't have an account? <a href="#">Creat Your Account</a> it takes less than a minute</p>
		<div class="inputs">
			<input type="text" placeholder="user name"/>
			
			<input type="password" placeholder="password"/>
		</div>
            <br></br>
			
			
		<div class="remember-me--forget-password">
            <br></br>	
	<label>
		<input type="checkbox" name="item" checked/>
		<span class="text-checkbox">Remember me</span>
	</label>
			<p>forget password?</p>
		</div>
            <br></br>
			
            <Lonk variant="secondary" to="/home" onClick={props.IsLogged}>Logar</Lonk>
	            </div>
	
            </div>



            <Switch>
            <Route path="/home" exact={true}  component={Home}/>
           
        </Switch> 

      </Router>
           </>
   );
    
      }
      
     


export default SideNav

// <Button variant="secondary" onClick={props.IsLogged}>Logar</Button>