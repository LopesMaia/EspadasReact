import React, {useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl="https://localhost:44321/api/Espadas";

  const [data, setData]=useState([]); //data = estado atual dos dados, setData = atualiza o estado

  const pedidoGet = async()=>{
    await axios.get(baseUrl) 
    .then(response => {
      setData(response.data); 
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    pedidoGet();
  })

  function Incluir(){
    const url = "";

  }

  return (
    <div className="App">
      <br/>
      <h3>Espadas</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro"/>
        <button className='btn btn-sucess' onClick={Incluir} >Incluir Espada</button>
      </header>

      <div class="flex-container1">
          <div style={{}}>Id</div>
          <div style={{}}>Nome</div>
          <div style={{}}>Família</div>
          <div style={{}}>Força</div>
          <div style={{}}>Durabilidade</div>
          <div style={{flex:3}}>Operação</div>
      </div>

      {data.map(espada=>(
        <div key={espada.id} class="flex-container">
            <div style={{}}>{espada.id}</div>
            <div style={{}}>{espada.nome}</div>
            <div style={{}}>{espada.familia}</div>
            <div style={{}}>{espada.forca}</div>
            <div style={{}}>{espada.durabilidade}</div>
            <div style={{flex:3}}>
              <button className='btn btn-Primary'>Editar</button>
              <button className='btn btn-Danger'>Excluir</button>
            </div>
          </div>
          ))}
      
    </div>
  );
}

export default App;
