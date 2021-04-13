import logo from "./logo.svg";
import "./App.css";
import { Navbar, Dropdown, Jumbotron, Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tecnologia from "./components/Tecnologia";
import Negocios from "./components/Negocios";
import Jogos from "./components/Jogos";
import Home from "./components/Home";
import Educacao from "./components/Educacao";
import Trends from "./components/Trends";
import Criar from "./components/Criar"

import { ArrowLeft } from "@material-ui/icons";
import React, { useState } from "react";

function App() {
  const [show, setShow] = useState("Home");
  const clickHome = () => setShow("Home");
  const clickJogo = () => setShow("Jogos");
  const clickNegocios = () => setShow("Negocios");
  const clickEducacao = () => setShow("Educação");
  const clicktec = () => setShow("Tecnologia");

  var Conteudo;

  switch (show) {
    case "Home":
      Conteudo = "Aqui você lê um pouco de tudo";
      break;

    case "Jogos":
      Conteudo =
        "Aqui você acha tudo sobre o que as pessoas acham no mundo dos games";
      break;

    case "Negocios":
      Conteudo = "Fique por dentro das opiniões do mundo dos valores";
      break;

    case "Educação":
      Conteudo = "Fique por dentro das opiniões sobre educação";
      break;

    case "Tecnologia":
      Conteudo = "Você é doido por tecnologia? está na página certa";
      break;

    default:
      break;
  }

  return (
    <>
      <Navbar bg="primary sticky-top">
        <Navbar.Brand>Randopinion</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
<br></br>

      <Router>
        <div class="container">
          <Jumbotron fluid>
            <Container>
              <h1>Você está lendo sobre {show}</h1>
              <p>{Conteudo}</p>
              <p><Criar/></p>
            </Container>
          </Jumbotron>
          <hr></hr>
          <div class="row">
            <div class=""></div>

         

            <Dropdown className="fixed-bottom" style={dropDiv}>
              <Dropdown.Toggle
                style={buttonS}
                className=""
                variant="success"
                id="dropdown-basic"
              >
                {show}
              </Dropdown.Toggle>

              <Dropdown.Menu className="">
                <Dropdown.Item onClick={clickHome}>
                  {" "}
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={clickJogo}>
                  <Link className="dropdown-item" to="/jogos">
                    Jogos
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={clickNegocios}>
                  <Link className="dropdown-item" to="/negocios">
                    Negócios
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={clickEducacao}>
                  {" "}
                  <Link className="dropdown-item" to="/educacao">
                    Educaçao
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={clicktec}>
                  <Link className="dropdown-item" to="/tecnologia">
                    Tecnologia
                  </Link>{" "}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div class="col">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/jogos">
                  <Jogos />
                </Route>

                <Route path="/negocios">
                  <Negocios />
                </Route>
                <Route path="/educacao">
                  <Educacao />
                </Route>
                <Route path="/tecnologia">
                  <Tecnologia />
                </Route>
              </Switch>
            </div>

            <div class="sidebar-expanded col-2 d-none d-md-block">
              <div class="stick-top"></div>
              <Trends></Trends>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

const buttonS = {
  borderRadius: "50px",
  float: "right",
};
const dropDiv = {
  right: "30px",
  position: "fixed",
  bottom: "12px",
  zIndex: "$zindex-fixed",
};

export default App;
