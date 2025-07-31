import React from 'react'
import ContainerSecundario from '../../components/container/ContainerSecundario'
import Card from '../../components/card/Card'
import "../../components/card/Card.css"
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"


const Lojista = () => {
  return (
    <ContainerSecundario>
      <div className='container d-flex'>
        <div className='path'>
          <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Lojista </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center card-container">
        <div className="row justify-content-center  w-100">
          <div className="card col-md-4 " id="bloco" >
            <Card classBody={"card_home"} classLink={"/registrar_venda"} classNameIcon={"ti ti-money card-ti"} classFooter={"nome_footer"} text_title={"REGISTRAR VENDA"} 
            text_footer={"Registrar a venda de um veículo"}/>
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/consultar_venda"} classNameIcon={"ti ti-layout-tab card-ti"} classFooter={"nome_footer"} text_title={"CONSULTAR VENDA"} 
            text_footer={"Consultar a venda de um veículo"}/>
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/cadastrar_vendedor"} classNameIcon={"ti ti-user card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR VENDEDOR"} 
            text_footer={"Cadastrar um vendedor da loja"}/>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center card-container-2">
        <div className="row justify-content-center  w-100">
          <div className="card col-md-4 " id="bloco" >
            <Card classBody={"card_home"} classLink={"/liberacao_venda"} classNameIcon={"ti ti-new-window card-ti"} classFooter={"nome_footer"} text_title={"SOLICITAR LIBERAÇÃO"} 
            text_footer={"Solicitar a liberação de um veículo vendido"}/>
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/relatório_venda"} classNameIcon={"ti ti-bar-chart card-ti"} classFooter={"nome_footer"} text_title={"RELATÓRIO DE VENDAS"} 
            text_footer={"Gerar um relatório de vendas"} />
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/relatorio_estoque"} classNameIcon={"ti ti-write card-ti"} classFooter={"nome_footer"} text_title={"ESTOQUE"} 
            text_footer={"Consultar o estoque de veículos da loja"} />
          </div>
        </div>
      </div>
    </ContainerSecundario>

  )
}

export default Lojista

/*
Criar as seguintes paginas:
ELEMENT = "/path"
RegistrarVenda = "/registrar_venda"
ConsultarVenda = "/consultar_venda"
CadastrarVendedor = "/cadastrar_vendedor"
LiberarVeiculo = "/liberacao_venda"
RelatorioVenda = "/relatorio_venda"
RelatorioEstoque = "/relatorio_estoque"


*/
