/*Essa pagina receberá os componentes de acesso à Dashboard */
import React, { useState } from 'react'
import ContainerSecundario from '../../../components/container/ContainerSecundario'
import Box from '../../../components/box/Box'
import Marca from './estatisticas/Marca'
import AnoModelo from './estatisticas/AnoModelo'
import Estoque from './estatisticas/Estoque'
import VendaPeriodo from './estatisticas/VendaPeriodo'
import VendaLoja from './estatisticas/VendaLoja'

const Dashboard = () => {

  const [select, setSelect] = useState(false)


  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  }





  return (
    <ContainerSecundario>
      <div className='container d-flex'>
        <div className='path'>
          <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i>
          <a className="link_a" href="/administracao">Administração</a><i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Dashboard </p>
        </div>

      </div>
      <div className="container d-flex justify-content-center card-container" id="graficos">
        <Box >
          <div className='panel-heading'>
            <i className='ti ti-blackboard' id="ti-black" ></i>
            <p>DASHBOARD<br />Estatísticas relacionadas ao estoque, movimentação e vendas de veículos</p>
          </div>
          <div className="position-absolute top-25 start-50 translate-middle">
            <select className="select-item" value={select} onChange={handleSelectChange} id="select-estatisticas">
              <option value='selecione'>Selecione uma opção</option>
              <option value='estoque'>Estoque Lojas</option>
              <option value='marca'>Marcas</option>
              <option value='ano_modelo'>Ano Modelo</option>
              <option value='vendas_loja'>Vendas Por Loja</option>
              <option value='vendas_periodo'>Vendas Por Período</option>
            </select>
          </div>
          <br />
          <br />
          {select === 'estoque' && (
            <div className="container d-flex justify-content-center " >
              <Estoque />
            </div>
          )}
          {select === 'marca' && (
            <div className="container d-flex justify-content-center ">
              <Marca />
            </div>
          )}
          {select == 'ano_modelo' && (
            <div className="container d-flex justify-content-center ">
              <AnoModelo />
            </div>
          )}
          {select === 'vendas_loja' && (
            <div className="container d-flex justify-content-center ">
              <VendaLoja></VendaLoja>
            </div>
          )}
          {select === 'vendas_periodo' && (
            <div className="container d-flex justify-content-center ">
              <VendaPeriodo />
            </div>
          )}




        </Box>
      </div>

    </ContainerSecundario>
  )
}

export default Dashboard
