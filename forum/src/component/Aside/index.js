import React, {useState} from "react";
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
            <button id="nav-toggle" className="navbar-toggle" onClick={openNav} style={show}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            <div id="mySidenav" className="sidenav" style={isOpen ? open : closed}>
                <span className="closebtn" onClick={openNav}>&times;</span>
                <br></br>
                <br></br>
                <div className="text-effect">
                    <a href="/home" className="active">
                        <span className="glyphicon glyphicon-home"></span>&nbsp;Home
                    </a>
                    <a href="/jogos">
                        <span className="glyphicon glyphicon-user"></span>
                        &nbsp;Jogos
                    </a>
                    <a href="/negocios">
                        <span className="glyphicon glyphicon-tasks"></span>
                        &nbsp;Negocios
                    </a>
                    <a href="/educacao">
                        <span className="glyphicon glyphicon-phone-alt"></span>
                        &nbsp;Educação
                    </a>
                    <a href="/tec">
                        <span className="glyphicon glyphicon-phone-alt"></span>
                        &nbsp;Tecnologia
                    </a>
                </div>
            </div>


            {/* <ul>
                {items.map((item, idx) => {
                    return (
                        <li key={idx} onClick={() => console.log(item.path)}>
                            {item.name}
                        </li>
                    );
                })}
            </ul> */}
        </>
    );
}

export default Aside;
