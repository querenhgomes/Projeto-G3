import Header from './header';
import Post from './post';
import Moodal from './modal';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';

import Home from './ViewHome';
import Negocios from './ViewNegocios';
import Jogos from './ViewJogos';
import Educacao from './ViewEducacao';
import Tec from './ViewTec';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function Master() {
    return(
        <>
        <Header></Header>

              <Router>
               <Switch>
                    <Route path="/home" exact={true}  component={Home}/>
                    <Route path="/jogos" exact={true}  component={Jogos}/>
                    <Route path="/negocios" exact={true} component={Negocios}/>
                    <Route path="/educacao" exact={true} component={Educacao}/>
                    <Route path="/tec" exact={true} component={Tec}/>
                </Switch>   
            </Router>  



            </>

    );
    }
export default Master;
