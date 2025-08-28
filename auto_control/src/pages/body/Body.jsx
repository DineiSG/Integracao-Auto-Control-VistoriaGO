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
import LiberarVeiculo from "../administracao/movimentacoes/LiberarVeiculo";
import BaixarVeiculo from "../administracao/movimentacoes/BaixarVeiculo";
import HistoricoVeiculo from "../administracao/historico/HistoricoVeiculo";
import RelatoriosMovimentacao from "../administracao/movimentacoes/RelatoriosMovimentacao";
import RelatorioEstoque from "../estoque/gestao/RelatorioEstoque";
import CadastroVeiculoBIN from "../estoque/gestao/CadastroVeiculoBIN";
import CadastroVeiculo from "../estoque/gestao/CadastroVeiculo";
import EditarDado from "../estoque/gestao/EditarDado";
import ConsultarVenda from "../lojista/vendas/ConsultarVenda";
import SolicitarLiberacao from "../lojista/movimentacoes/SolicitarLiberacao";
import CadastrarVendedor from "../lojista/vendas/CadastrarVendedor";
import Dashboard from "../administracao/dashboard/Dashboard";





// If you want to import an image for the menu icon, use something like:
// import menu from "../../assets/menu.png";

function Body() {
  // const [ativRecente, setAtivRecente] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }



  return (
    <ContainerPrincipal className="container-principal">
      <header className="navbar navbar-expand-lg d-flex align-items-center " id="barra_navegacao">
        <div className="container-fluid">
          {/*Responsável pelo icone que aciona a barra lateral */}
          <button className="navbar-brand icon-bg p-0" onClick={toggleSidebar} >
            <i className="ti ti-menu" />
          </button>
          { /*Buscar endpoints para variação de usuarios */}
          <h1 className="page-title">
            Vistoria Go
          </h1>
        </div >
        <div className="d-flex justify-content-end" >
          <div className="p-2">
            <button id="mensagens" >
              <span >
                <i className="ti ti-email"></i>
              </span>
            </button>
          </div>
          <div className="p-2">
            <button id="mensagens">
              <i className="ti ti-bell"></i>
            </button>
          </div>
        </div>
      </header>
      <div className="menu_container">
       {showSidebar && (
          <Sidebar id="sidebar"></Sidebar>
        )}
        <ContainerSecundario >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lojista" element={<Lojista />} />
              <Route path="/registrar_venda" element={<RegistrarVenda />} />
              <Route path="/cadastrar_vendedor" element={<CadastrarVendedor />} />
              <Route path="/solicitar_liberacao" element={<SolicitarLiberacao />} />
              <Route path="/consultar_venda" element={<ConsultarVenda />} />
              <Route path="/administracao" element={<Administracao />} />
              <Route path="/liberar_veiculo" element={<LiberarVeiculo />} />
              <Route path="/baixar_veiculo" element={<BaixarVeiculo />} />
              <Route path="/relatorios_movimentacao" element={<RelatoriosMovimentacao />} />
              <Route path="/historico" element={<HistoricoVeiculo />} />
              <Route path="/gestao_estoque" element={<GestaoEstoque />} />
              <Route path="/relatorio_estoque" element={<RelatorioEstoque />} />
              <Route path="/cadastro_veiculo" element={<CadastroVeiculo />} />
              <Route path="/cadastro_veiculo_bin" element={<CadastroVeiculoBIN />} />
              <Route path="/editar_dado" element={<EditarDado />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Adicione outras rotas conforme necessário */}
            </Routes>
          </BrowserRouter>
        </ContainerSecundario>
      </div>
    </ContainerPrincipal>


  );
}
export default Body;