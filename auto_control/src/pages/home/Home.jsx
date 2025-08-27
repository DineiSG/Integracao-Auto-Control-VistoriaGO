import Card from "../../components/card/Card"
import ContainerSecundario from "../../components/container/ContainerSecundario"

const Home = () => {
    return (
        <ContainerSecundario>
            <div className='container d-flex'>
                <div className='container d-flex flex-column ' id="path" >
                    <div className="d-flex align-items-start ">
                        <div className="p-2">
                            <a className="link_a" href="#">Início</a>
                        </div>
                        <div className="p-2">
                            <i className=' ti ti-angle-right ' id='card-path' />
                        </div>
                        <div className="p-2">
                            <p className='atual'>Gestão </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <div className="row justify-content-center  w-100">
                    <div className="card col-md-4 " id="bloco" >

                        <Card classBody={"card_home"} classLink={"/lojista"} classNameIcon={"ti ti-money card-ti"} classFooter={"nome_footer"} text_title={"LOJISTA"} />
                    </div>
                    <div className="card col-md-4" id="bloco"  >
                        <Card classBody={"card_home"} classLink={"/gestao_estoque"} classNameIcon={"ti ti-briefcase card-ti"} classFooter={"nome_footer"} text_title={"GESTÃO DE ESTOQUE"} />
                    </div>
                    <div className="card col-md-4" id="bloco"  >
                        <Card classBody={"card_home"} classLink={"/administracao"} classNameIcon={"ti ti-write card-ti"} classFooter={"nome_footer"} text_title={"ADMINISTRAÇÃO"} />
                    </div>
                </div>
            </div>
        </ContainerSecundario>
    )
}

export default Home
