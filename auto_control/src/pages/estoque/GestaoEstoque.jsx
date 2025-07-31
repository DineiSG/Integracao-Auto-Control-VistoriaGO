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
                        <Card classBody={"card_home"} classLink={"/cad_veiculo_bin"} classNameIcon={"ti ti-check-box card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR VEÍCULO ( BIN )"}
                            text_footer={<> Cadastrar um veiculo<br /> buscando dados na Base BIN do Detran </>} />
                    </div>
                    <div className="card col-md-4" id="bloco"  >
                        <Card classBody={"card_home"} classLink={"/cad_veiculo"} classNameIcon={"ti ti-check-box card-ti"} classFooter={"nome_footer"} text_title={"CADASTRAR VEÍCULO ( S/ BIN )"}
                            text_footer={<> Cadastrar um veiculo<br /> sem buscar dados na Base BIN do Detran </>} />
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <div className="row justify-content-center  w-100">
                    <div className="card col-md-4" id="bloco"  >
                        <Card classBody={"card_home"} classLink={"/relatorio_estoque"} classNameIcon={"ti ti-write card-ti"} classFooter={"nome_footer"} text_title={"ESTOQUE"}
                            text_footer={"Consultar o estoque de veículos das lojas"} />
                    </div>
                    <div className="card col-md-4" id="bloco"  >
                        <Card classBody={"card_home"} classLink={"/pesquisar_dado"} classNameIcon={"ti ti-search card-ti"} classFooter={"nome_footer"} text_title={"PESQUISAR DADOS"}
                            text_footer={<> Pesquisar dados de um veículo</>} />
                    </div>
                </div>
            </div>


        </ContainerSecundario>
    )
}

export default GestaoEstoque

/*
Criar as seguintes páginas:
ELEMENT = "/path"
CadastrarVeiculoBIN - "/cad_veiculo_bin"
CadastrarVeiculo - "/cad_veiculo"
Estoque = "/relatorio_estoque"
PesquisarDados = "/pesquisar_dado"
*/