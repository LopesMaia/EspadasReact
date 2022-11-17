import React, {useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCadastro from './assets/cadastro.png';
function App() {

  const baseUrl="https://localhost:44321/api/Espadas";

  const [data, setData]=useState([]);   //data = estado atual dos dados, setData = atualiza o estado de data
  const [modalIncluir,setModalIncluir]=useState(false);
  const [modalEditar,setModalEditar]=useState(false);
  const [modalExcluir,setModalExcluir]=useState(false);
  const [updateData,setupdateData]=useState(true);

  const [espadaSelecionada, setEspadaSelecionada]=useState({
    id: '',
    nome: '',
    familia: '',
    forca: '',
    durabilidade: ''
  })

  const abrirFecharModalIncluir=()=>{
    setModalIncluir(!modalIncluir);
  }
  const abrirFecharModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirFecharModalExcluir=()=>{
    setModalExcluir(!modalExcluir);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setEspadaSelecionada({
      ...espadaSelecionada,[name]:value
    });
  }

  const pedidoGet = async()=>{
    await axios.get(baseUrl) 
    .then(response => {
      setData(response.data); 
    }).catch(error=>{
      console.log(error);
    })
  }

  const selecionaEspada=(espada, opcao)=>{
    setEspadaSelecionada(espada);
    (opcao==="Editar") ?
    abrirFecharModalEditar() : abrirFecharModalExcluir();
  }
  const pedidDelete=async()=>{
    await axios.delete(baseUrl+"/"+espadaSelecionada.id)
    .then(response=>{
      setData(data.filter(espada=> espada.id !== response.data));
      setupdateData(true);
      abrirFecharModalExcluir();
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPost = async()=>{
    delete espadaSelecionada.id;
    espadaSelecionada.forca=parseInt(espadaSelecionada.forca);
    espadaSelecionada.durabilidade=parseFloat(espadaSelecionada.durabilidade);
    await axios.post(baseUrl, espadaSelecionada)
    .then(response=>{
      setData(data.concat(response.data));
      setupdateData(true);
      abrirFecharModalIncluir(); 
    }).catch(error=>{
      console.log(error);
    })
  }

  const pedidoPut = async()=>{
    espadaSelecionada.forca=parseInt(espadaSelecionada.forca);
    espadaSelecionada.durabilidade=parseFloat(espadaSelecionada.durabilidade);
    await axios.put(baseUrl+"/"+espadaSelecionada.id, espadaSelecionada)
    .then(response=>{
      var resposta=response.data;
      var dadosAuxiliar=data;
      dadosAuxiliar.map(espada=>{
        if(espada.id===espadaSelecionada.id){
          espada.nome=resposta.nome;
          espada.familia=resposta.familia;
          espada.forca=resposta.forca;
          espada.durabilidade=resposta.durabilidade;
        }
      });
      setupdateData(true);
      abrirFecharModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{  // usa o pedidget para renderizar a tela inicial da aplicacao
    if(updateData){
      pedidoGet();
      setupdateData(false);
    }
  },[updateData])

  return (
    <div className="App">
      <br/>
      <h3>Espadas</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro"/>
        <button className='btn btn-sucess' onClick={()=>abrirFecharModalIncluir()}>Incluir Espada</button>
      </header>

      <div className="flex-container1">
          <div style={{}}>Id</div>
          <div style={{}}>Nome</div>
          <div style={{}}>Família</div>
          <div style={{}}>Força</div>
          <div style={{}}>Durabilidade</div>
          <div style={{flex:3}}>Operação</div>
      </div>

      {data.map(espada=>(
        <div key={espada.id} className="flex-container">
            <div style={{}}>{espada.id}</div>
            <div style={{}}>{espada.nome}</div>
            <div style={{}}>{espada.familia}</div>
            <div style={{}}>{espada.forca}</div>
            <div style={{}}>{espada.durabilidade}</div>
            <div style={{flex:3}}>
              <button className='btn btn-Primary'onClick={()=>selecionaEspada(espada, "Editar")}>Editar</button>
              <button className='btn btn-Danger' onClick={()=>selecionaEspada(espada, "Excluir")}>Excluir</button>
            </div>
          </div>
      ))}
      
      <Modal isOpen={modalIncluir}>
      <ModalHeader>Incluir Espada</ModalHeader>  
      <ModalBody>
        <div className='form-group'>
          <label>Nome:</label>
          <br/>
          <input type="text" className="form-control" name="nome" onChange={handleChange}/>
          <label>Familia:</label>
          <br/>
          <input type="text" className="form-control" name="familia" onChange={handleChange}/>
          <label>Forca:</label>
          <br/>
          <input type="text" className="form-control" name="forca" onChange={handleChange}/>
          <label>Durabilidade:</label>
          <br/>
          <input type="text" className="form-control" name="durabilidade" onChange={handleChange}/>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-Primary' onClick={()=>pedidoPost()}>Incluir</button>
        <button className='btn btn-Danger' onClick={()=>abrirFecharModalIncluir()}>Cancelar</button>
      </ModalFooter>
      </Modal>  
      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Espada</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <br readOnly value={espadaSelecionada && espadaSelecionada.id}/>
            <br/>
            <label>Nome:</label><br/>
            <input type="text" className="form-control" name="nome" onChange={handleChange} 
              value={espadaSelecionada && espadaSelecionada.nome}/><br/>
            <label>Familia:</label><br/>
            <input type="text" className="form-control" name="familia" onChange={handleChange} 
              value={espadaSelecionada && espadaSelecionada.familia}/><br/>
            <label>Forca:</label><br/>
            <input type="text" className="form-control" name="forca" onChange={handleChange} 
              value={espadaSelecionada && espadaSelecionada.forca}/><br/>
            <label>Durabilidade:</label><br/>
            <input type="text" className="form-control" name="durabilidade" onChange={handleChange} 
              value={espadaSelecionada && espadaSelecionada.durabilidade}/><br/>
          </div>
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-Primary' onClick={()=>pedidoPut()}>Editar</button>
        <button className='btn btn-Danger' onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Deseja apagar a espada {espadaSelecionada.nome}?
        </ModalBody>
        <ModalFooter>
        <button className='btn btn-Primary' onClick={()=>pedidDelete()}>Sim</button>
        <button className='btn btn-Danger' onClick={()=>abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
