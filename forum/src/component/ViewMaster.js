import Header from "./Header";
import Sidenav from "./SideNav";
import Post from "./post";
import Moodal from "./modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Aside from "./Aside";
import SideNav from "./SideNav";



function Master() {
    const [Logado, setLogado] = useState();
    const Click = () => setLogado(true);


    console.log(Logado)
    if(Logado){
        return (
            <>
                <Aside/>
                <Header></Header>
           
            </>
        );
    }
    else{
        return (
            <>
                <Sidenav IsLogged={Click}/>
               
            </>
        );
    }
        
   
    
}
export default Master;
