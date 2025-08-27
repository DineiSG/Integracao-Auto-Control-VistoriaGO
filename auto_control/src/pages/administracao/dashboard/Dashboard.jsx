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
        <div className='container d-flex flex-column ' id="path" >
          <div className="d-flex align-items-start ">
            <div className="p-2">
              <a className="link_a" href="/">Gestão</a>
            </div>
            <div className="p-2">
              <i className=' ti ti-angle-right ' id='card-path' />
            </div>
            <div className="p-2">
              <a className="link_a" href="\administracao">Administração</a>
            </div>
            <div className="p-2">
              <i className=' ti ti-angle-right ' id='card-path' />
            </div>
            <div className="p-2">
              <p className='atual'>Dashboard </p>
            </div>
          </div>
        </div>

      </div>
      <div className="container d-flex justify-content-center card-container" id="graficos">
        <Box >
          <div className='d-flex justify-content-between panel-heading'>
            <div className="d-flex justify-content-start">
              <div className="p-2 ">
                <i className='ti ti-blackboard' id="ti-black" ></i>
              </div>
              <div className="p-2 ">
                <p>DASHBOARD</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="p-2 ">
                <select className="select-item" value={select} onChange={handleSelectChange} id="select-estatisticas">
                  <option value='selecione'>Selecione uma opção</option>
                  <option value='estoque'>Estoque Lojas</option>
                  <option value='marca'>Marcas</option>
                  <option value='ano_modelo'>Ano Modelo</option>
                  <option value='vendas_loja'>Vendas Por Loja</option>
                  <option value='vendas_periodo'>Vendas Por Período</option>
                </select>
              </div>
            </div>
          </div>
 
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
