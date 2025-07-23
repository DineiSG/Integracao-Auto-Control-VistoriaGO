import React from 'react'
import ContainerSecundario from '../../components/container/ContainerSecundario'
import Card from '../../components/card/Card'
import "../../components/card/Card.css"
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"


const Lojista = () => {
  return (
    <ContainerSecundario>
      <div className="container d-flex justify-content-center card-container">
        <div className="row justify-content-center  w-100">
          <div className="card col-md-4 " id="bloco" >
            <Card classBody={"card_home"} classLink={"/lojista"} classNameIcon={"ti ti-money card-ti"} classFooter={"nome_footer"} text_title={"REGISTRAR VENDA"} />
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/gestao_estoque"} classNameIcon={"ti ti-layout-tab card-ti"} classFooter={"nome_footer"} text_title={"CONSULTAR VENDA"} />
          </div>
          <div className="card col-md-4" id="bloco"  >
            <Card classBody={"card_home"} classLink={"/administracao"} classNameIcon={"ti ti-write card-ti"} classFooter={"nome_footer"} text_title={"ESTOQUE"} />
          </div>
        </div>
      </div>
    </ContainerSecundario>

  )
}

export default Lojista
