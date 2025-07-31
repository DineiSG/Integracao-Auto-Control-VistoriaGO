import React from 'react'
import ContainerSecundario from '../../../components/container/ContainerSecundario'
import Box from '../../../components/box/Box'

const RelatorioEstoque = () => {
    return (
        <ContainerSecundario>
            <div className='container d-flex'>
                <div className='path'>
                    <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path' /><a className="link_a" href="/gestao_estoque">Gestão de Estoque</a>
                    <i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Estoque </p>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <Box>
                    <div className='panel-heading'>
                        <i className='ti ti-car' id="ti-black" ></i>
                        <p>VERIFICAR ESTOQUE DE VEÍCULOS <br /> Informe os dados do veículo</p>
                    </div>
                </Box>

            </div>
        </ContainerSecundario>
    )
}

export default RelatorioEstoque
