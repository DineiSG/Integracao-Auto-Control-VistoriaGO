//importações React
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

//Importação de estilos
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"
import "./Body.css"

//Importação de componentes
import Sidebar from "../../components/sidebar/Sidebar";
import Messages from "../../components/messages/Messages";
import ContainerPrincipal from "../../components/container/ContainerPrincipal";
import ContainerSecundario from "../../components/container/ContainerSecundario";

//Importação de páginas
import RegistrarVenda from "../lojista/vendas/RegistrarVenda"
import Home from "../home/Home";
import Lojista from "../lojista/Lojista"
import GestaoEstoque from "../estoque/GestaoEstoque";
import Administracao from "../administracao/Administracao"
import RelatorioEstoque from "../estoque/gestao/RelatorioEstoque";



// If you want to import an image for the menu icon, use something like:
// import menu from "../../assets/menu.png";

function Body() {
  const [message, setMessage] = useState(false)
  // const [ativRecente, setAtivRecente] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const toggleMessage = () => {
    setMessage(!message);
  }

  return (
    <ContainerPrincipal >
      <header className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <span className="navbar-brand" onClick={toggleSidebar} >
            <a data-toggle="tooltips">
              <span className="icon-bg">
                <i className="ti ti-menu" />
              </span>
            </a>
          </span>
          { /*Buscar endpoints para variação de usuarios */}
          <h1 className="page-title">
            Vistoria Go
            <span className="id-logado">
              ID - 2849
            </span>
          </h1>
        </div >
        <div className="navbar-nav toolbar" >
          <button className="mensagens" data-toggle="dropdown" onClick={toggleMessage}>
            <span >
              <i className="ti ti-email"></i>
            </span>
          </button>

          <span id="indica_avisos_header" className="badge badge-warning"></span>
          {message && (
            <Messages>
              <div >
                <div className="topnav-dropdown-header">
                  <span>Mensagens</span>
                </div>
                <div className="scroll-pane">
                  <ul className="media-list scroll-content" id="header_avisos">
                    <li>mensagem</li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <a href="#">Veja todas as mensagens</a>
                </div>
              </div>
            </Messages>)}


          <div className="dropdown toolbar-icon-bg drop-atividades-recentes" data-toggle="tooltip" data-placement="left" title="Atividades recentes">
            <a href="#" className="hasnotifications dropdown-toggle" data-toggle='dropdown'>
              <span className="icon-bg">
                <i className="ti ti-bell"></i>
              </span>
              <span id="indicaAtivRecentHeader" className="badge badge-warning"></span>
            </a>
            <div className="dropdown-menu notifications arrow">
              <div className="topnav-dropdown-header">
                <span>Atividades Recentes</span>
              </div>
              <div className="scroll-pane">
                <ul className="media-list scroll-content" id="recebe-alert-consulta">
                </ul>
              </div>
              <div className="topnav-dropdown-footer">
                <a href="https://ambteste.credtudo.com.br/painel/atividades-recentes.php">Ver todos as Atividades Recentes</a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="menu_container">
        {showSidebar && (
          <Sidebar></Sidebar>
        )}
        <ContainerSecundario >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/lojista" element={<Lojista/>} />
              <Route path="/registrar_venda" element={<RegistrarVenda />} />
              <Route path="/administracao" element={<Administracao/>}/>
              <Route path="/gestao_estoque" element={<GestaoEstoque/>}/>
              <Route path="/relatorio_estoque" element={<RelatorioEstoque/>}/>
            </Routes>
          </BrowserRouter>
        </ContainerSecundario>
      </div>
    </ContainerPrincipal>


  );
}
export default Body;