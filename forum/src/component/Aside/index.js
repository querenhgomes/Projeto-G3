import React, {useState} from "react";
import Home from '../ViewHome';
import Negocios from '../ViewNegocios';
import Jogos from '../ViewJogos';
import Educacao from '../ViewEducacao';
import Tec from '../ViewTec';
import {Link as Lonk} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.css"
const items = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Jogos",
        path: "/jogos",
    },
    {
        name: "Negocios",
        path: "/negocios",
    },
    {
        name: "educação",
        path: "/educacao",
    },
];

function Aside() {
    const [isOpen, setIsOpen] = useState(false)
    const hidden = {
        visibility: "hidden",
        zIndex: 5
    }
    const show = {
        visibility: "visible",
        zIndex: 5
    }

    const open = {
        width: "220px",
        marginLeft: "0px",
        zIndex: 5
    }
    const closed = {
        width: "0px",
        marginLeft: "0px",
        zIndex: 5
       }
    function openNav() {
        console.log(isOpen);
        setIsOpen(!isOpen);
        // $("#nav-toggle").css("visibility","hidden");
        // $("#mySidenav").stop().animate({width: "220px"},{duration: 400, queue: false});
        // $("#mainDiv").stop().animate({marginLeft: "220px"},{duration: 400, queue: false});
    }
    
    // function closeNav() {
    //     // $("#mySidenav").animate({width: "0"},{duration: 400, queue: false});
    //     // $("#mainDiv").animate({marginLeft: "0"},{duration: 400, queue: false});
    //     $("#nav-toggle").css("visibility","visible");
    // }
    
    // $(".closebtn").click(function(){closeNav();});
        // $("#nav-toggle").click(function(){openNav();});


    return (
        <>
         <Router>
            <button id="nav-toggle"  className="navbar-toggle" onClick={openNav} style={show}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <div id="mySidenav" className="sidenav" style={isOpen ? open : closed}>
                {/* <span className="closebtn" onClick={openNav}>&times;</span> */}
                <br></br>
                <br></br>
                <div className="text-effect">
                   <div href="/home" className="active">
                   <Lonk to="/home"  className="active">Home</Lonk>
                        <span className="glyphicon glyphicon-home"></span>&nbsp;
                    </div>
                   <div href="/jogos">
                   <Lonk to="/jogos"  className="active">Jogos</Lonk>
                        <span className="glyphicon glyphicon-user"></span>
                        &nbsp;
                    </div>
                    
                   <div href="/negocios">
                   <Lonk to="/negocios"  className="active">Negocios</Lonk>
                        <span className="glyphicon glyphicon-tasks"></span>
                        &nbsp;
                    </div>
                    <div href="/educacao">

                    <Lonk to="/educacao"  className="active">Educação</Lonk>
                        <span className="glyphicon glyphicon-phone-alt"></span>
                        &nbsp;
                    </div>

                    <div href="/tec">
                    <Lonk to="/tec"  className="active">Tecnologia</Lonk>
                        <span className="glyphicon glyphicon-phone-alt"></span>
                        &nbsp;
                    </div>
                </div>
            </div>
            
            <Switch>
            <Route path="/home" exact={true}  component={Home}/>
            <Route path="/jogos" exact={true}  component={Jogos}/>
            <Route path="/negocios" exact={true} component={Negocios}/>
            <Route path="/educacao" exact={true} component={Educacao}/>
            <Route path="/tec" exact={true} component={Tec}/>
        </Switch> 

            {/* <ul>
                {items.map((item, idx) => {
                    return (
                        <li key={idx} onClick={() => console.log(item.path)}>
                            {item.name}
                        </li>
                    );
                })}
            </ul> */}
            </Router>
        </>
    );
}

export default Aside;
