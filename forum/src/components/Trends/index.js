import Post from '../postrend';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Trends() {
    const [Nomer, setNomer] = useState([])
   
    useEffect(() => {
      Axios();
    }, [])
  
  
    async function Axios() {
      const response = await axios.get("https://randomuser.me/api?nat=br&results=4");
      setNomer(response.data.results);
  
    }
  
    return (
  
      <div className="App">
      <br></br>
      <br></br>
      <br></br>
      
  
        <div>
          
          
          <div>
  
          <div>
            <div className="" >
                <div className="">

              {Nomer.map((item, key) => {
                console.log(key)
                return (
                  <Post key={key} linkImage={item.picture.medium} nome={item.name.first} titulo={item.location.timezone.description} email={item.email}  conteudo={"conteudo"} dataPub={item.dob.date} resumo={"Resumo"} />
                )
  
  
              })}
              </div>
            </div>
            </div>
               
          </div>
        </div>
      </div>
  
    );
  }