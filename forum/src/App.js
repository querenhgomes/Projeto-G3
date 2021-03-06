import logo from './logo.svg';
import './App.css';
import Header from './component/header';
import Post from './component/post';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { render } from '@testing-library/react';

function App() {
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
      <Header/>
      
      


<div class="container">
              <div class="row text-dark">
              {Nomer.map((item, key)=>{
         console.log(key)
        return(
            <Post className="col-md-12 col-sm-12 col-xs-auto col-lg-12" key={key} titulo={item.gender} btntext={item.name.title} conteudo={item.email}/>  
        )
       

      })}
              </div>
            
          </div>
    </div>
    
  );
}

export default App;
