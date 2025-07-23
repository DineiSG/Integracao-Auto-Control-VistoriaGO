/*Aqui sera montada a pagina relacionada a Gestão de estoque com cadastro de veiculo com e sem busca de dados na base BIN, edição de dados e 
baixa de veiculos*/
import ContainerSecundario from '../../components/container/ContainerSecundario'
import Card from '../../components/card/Card'
import "../../components/card/Card.css"
import "../../assets/css/thead.css";
import "../../assets/css/themify-icons.css"

const GestaoEstoque = () => {
    return (
            <ContainerSecundario>
                <div className='container d-flex'>
                    <div className='path'>
                        <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Gestão de Estoque </p>
                    </div>
                </div>
                <div className="container d-flex justify-content-center card-container">

                    <div className="row justify-content-center  w-100">
                        <div className="card col-md-4 " id="bloco" >
                            <Card classBody={"card_home"} classLink={"/cad_veiculo"} classNameIcon={"ti ti-check-box card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR VEÍCULO"} />
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

export default GestaoEstoque
