import React, {useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function App() {

  const baseUrl="https://localhost:44321/api/Espadas";

  const [data, setData]=useState([]);

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

  return (
    <div className="App">
      <br/>
      <h3>Espadas</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro"/>
        <button className='btn btn-sucess'>Incluir Espada</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Família</th>
            <th>Força</th>
            <th>Durabilidade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
           {data.map(espada=>(
            <tr key={espada.id}>
              <td>{espada.id}</td>
              <td>{espada.nome}</td>
              <td>{espada.familia}</td>
              <td>{espada.forca}</td>
              <td>{espada.durabilidade}</td>
              <td>
                <button className='btn btn-Primary'>Editar</button> {" "}
                <button className='btn btn-Danger'>Excluir</button>
              </td>
            </tr>
           ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
