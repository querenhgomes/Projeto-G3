
import Post from "./post";
import Moodal from "./modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { render } from "@testing-library/react";
import { Switch, Route, Link } from "react-router";

function Jogos()  {
  const [Nomer, setNomer] = useState([])
  const [userName, setUserName] = useState("")
  const [userPsw, setUserPsw] = useState("")

  useEffect(() => {
    Axios();
  }, [])


  async function Axios() {
    const response = await axios.get("https://randomuser.me/api?nat=br&results=20");
    setNomer(response.data.results);

  }

  return (

    <div className="App">
    <br></br>
    <br></br>
    <br></br>
    

      <div className="container">
        
        
        <div className="row">



          <div className="col">
            {Nomer.map((item, key) => {
              console.log(key)
              return (
                <>
                <Moodal key={key} nome={item.name.first} titulo={item.location.timezone.description}  linkImage={item.picture.medium}  email={item.email} conteudo={"conteudo"} resumo={"Lorem Ipsum é simplesmente uma simO que é Lorem Ipsum?"} />
                  
                  </>
              )


            })}

          </div>
          <div className="sidebar-expanded col-2 d-none d-md-block">
              <div className="">

            {Nomer.map((item, key) => {
              console.log(key)
              return (
                <Post className="" key={key} gender={item.gender} titulo={item.location.timezone.description} email={item.email}  conteudo={"conteudo"} resumo={"Lorem Ipsum é simplesmente uma simO que é Lorem Ipsum?"} />
              )


            })}
            </div>
          </div>


        </div>
      </div>
    </div>

  );
}
export default Jogos;
