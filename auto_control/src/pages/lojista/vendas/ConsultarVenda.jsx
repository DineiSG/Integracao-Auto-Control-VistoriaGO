import ContainerSecundario from '../../../components/container/ContainerSecundario'
import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Box from '../../../components/box/Box';
import Input from '../../../components/input/Input';
import Form from '../../../components/form/Form';
import { useState, useEffect, useRef } from "react";
import { useGetData } from '../../../services/useGetData';
import { formatDateInfo } from '../../../hooks/formatDate';

const ConsultarVenda = () => {

    const [placa, setPlaca] = useState('')
    const [buscaPlaca, setBuscaPlaca] = useState("")
    const [dadosVeiculo, setDadosVeiculo] = useState({ placa: '', marca: '', modelo: '', cor: '', renavam: '', unidade: '', vendedor: '',
         comprador: '', telefone: '', email: '', cep: '', endereco: '', bairro: '', cidade: '', uf: '', nascimento: '', cpf: '', rg: '', 
         valorFipe: '', valorVenda: '', valorEntrada: '', valorFinanciamento: '', observacoes: '', tipoVenda: '', instituicao: '', dataRegistro: '', rua: '' });

    /*Alterando a placa para letras maiusculas */

    // buscando os dados no bd
    const { data: veiculo, } = useGetData(buscaPlaca ? `/vendas/placa/${placa}` : null)


    // Ref para manter a referência atualizada da última placa buscada
    const ultimaPlacaBuscada = useRef('');

    // Função chamada quando o input da placa perde o foco
    const handleBlur = () => {

        const placaM = placa

        if (placaM.length === 7) {
            // Só busca se a placa for diferente da última buscada
            if (placaM !== ultimaPlacaBuscada.current) {
                console.log('Buscando placa:', placaM); // Debug
                ultimaPlacaBuscada.current = placaM;
                setBuscaPlaca(placaM);
            }
        }
    };


    // Preencher campos quando os dados solicitados chegarem
    useEffect(() => {
        if (veiculo && !veiculo.erro) {
            console.log('Dados do veículo recebidos:', veiculo); // Debug
            setDadosVeiculo(prev => ({
                ...prev,
                marca: veiculo.marca || '',
                modelo: veiculo.modelo || '',
                cor: veiculo.cor || '',
                renavam: veiculo.renavam || '',
                unidade: veiculo.unidade || '',
                vendedor: veiculo.vendedor || '',
                comprador: veiculo.comprador || '',
                telefone: veiculo.telefone || '',
                email: veiculo.email || '',
                cep: veiculo.cep || '',
                endereco: veiculo.endereco || '',
                bairro: veiculo.bairro || '',
                cidade: veiculo.cidade || '',
                uf: veiculo.uf || '',
                nascimento: veiculo.nascimento || '',
                rua: veiculo.rua || '',
                cpf: veiculo.cpf || '',
                rg: veiculo.rg || '',
                valorFipe: veiculo.valorFipe|| '',
                valorVenda: veiculo.valorVenda || '',
                valorEntrada: veiculo.valorEntrada || '',
                valorFinanciamento: veiculo.valorFinanciamento || '',
                observacoes: veiculo.observacoes || '',
                tipoVenda: veiculo.tipoVenda || '',
                instituicao: veiculo.instituicao || '',
                dataRegistro: veiculo.dataRegistro ? formatDateInfo(veiculo.dataRegistro) : ''
            }));
        } else if (veiculo && veiculo.erro) {
            console.log('Veículo não encontrado');;
        }

    }, [veiculo]);



    return (
        <ContainerSecundario>
            <div className='container d-flex'>
                <div className='path'>
                    <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i>
                    <a className="link_a" href="/lojista">Lojista</a><i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Consultar Venda </p>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <Box onSubmit>
                    <div className='panel-heading'>
                        <i className='ti ti-car' id="ti-black" ></i>
                        <p>REGISTRAR A VENDA DE UM VEÍCULO</p>
                    </div>
                    <Form >

                        <div className="col-12 col-md-2">
                            <Input label={"Placa:"} type={"text"} maxLength={"7"} style={{ width: '80px' }} nameInput={"placa"} value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Marca:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"} value={dadosVeiculo.marca} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Modelo:"} type={"text"} style={{ width: '150px' }} nameInput={"modelo"} value={dadosVeiculo.modelo} readOnly />
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Cor:"} type={"text"} style={{ width: '150px' }} nameInput={"cor"} value={dadosVeiculo.cor} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Renavam:"} type={"text"} style={{ width: '150px' }} nameInput={"renavam"} value={dadosVeiculo.renavam} readOnly />
                        </div>
                        <div className="col-12 col-md-6">
                            <Input label={"Loja:"} type={"text"} style={{ width: '150px' }} nameInput={"unidade"} value={dadosVeiculo.unidade} readOnly />
                        </div>
                    </Form>
                    <div className='sub-panel-heading'>
                        <i className='ti ti-user' id="ti-black"></i>
                        <p>DADOS DO COMPRADOR</p>
                    </div>
                    <Form>
                        <div className="col-6 col-md-5">
                            <Input label={"Nome Completo:"} type={"text"} style={{ width: '250px' }} nameInput={"comprador"} value={dadosVeiculo.comprador} readOnly />
                        </div>
                        <div className="col-6 col-md-4">
                            <Input label={"Data de Nascimento:"} style={{ width: '110px' }} value={dadosVeiculo.nascimento} required />
                        </div>
                        <div className="col-6 col-md-3">
                            <Input label={"CPF:"} type={"text"} style={{ width: '150px' }} maxLength={14} nameInput={"modelo"} value={dadosVeiculo.cpf} required />
                        </div>
                        <div className="col-6 col-md-3">
                            <Input label={"RG:"} type={"text"} style={{ width: '150px' }} maxLength={14} nameInput={"rg"} value={dadosVeiculo.rg} required />
                        </div>
                        <div className="col-6 col-md-3">
                            <Input label={"Telefone:"} type={"text"} style={{ width: '150px' }} maxLength={14} nameInput={"telefone"} value={dadosVeiculo.telefone} required />
                        </div>
                        <div className="col-6 col-md-3">
                            <Input label={"Email:"} type={"text"} style={{ width: '200px' }} nameInput={"email"} value={dadosVeiculo.email} required />
                        </div>
                        <div className="col-6 col-md-4">
                            <Input label={"CEP:"} type={"text"} style={{ width: '100px' }} maxLength={9} nameInput={"cep"} value={dadosVeiculo.cep} required />
                        </div>
                        <div className="col-6 col-md-4">
                            <Input label={"Logradouro:"} type={"text"} style={{ width: '250px' }} nameInput={"logradouro"} value={dadosVeiculo.rua} readOnly />
                        </div>
                        <div className="col-6 col-md-4">
                            <Input label={"Complemento:"} type={"text"} style={{ width: '200px' }} nameInput={"complemento"} value={dadosVeiculo.endereco} required />
                        </div>
                        <div className="col-6 col-md-4">
                            <Input label={"Bairro:"} type={"text"} style={{ width: '200px' }} nameInput={"bairro"} value={dadosVeiculo.bairro} readOnly />
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Cidade:"} type={"text"} style={{ width: '200px' }} nameInput={"cidade"} value={dadosVeiculo.cidade} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"UF:"} type={"text"} style={{ width: '70px' }} nameInput={"uf"} value={dadosVeiculo.uf} readOnly />
                        </div>
                    </Form>
                    <div className='sub-panel-heading'>
                        <i className='ti ti-money' id="ti-black"></i>
                        <p>DADOS DA TRANSAÇÃO </p>
                    </div>
                    <Form>
                        <div className='col-12 col-md-4' id='select-all'>
                            <Input label={"Vendendor:"} type={"text"} style={{ width: '200px' }} nameInput={"vendedor"} value={dadosVeiculo.vendedor} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Valor Fipe R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_fipe"} value={dadosVeiculo.valorFipe} />
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Valor Venda R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_venda"} value={dadosVeiculo.valorVenda} />
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Valor Entrada R$:"} type={"text"} style={{ width: '150px' }} name={"valor_entrada"} value={dadosVeiculo.valorEntrada} />
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Valor Financiado R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_financiado"} value={dadosVeiculo.valorFinanciamento} />
                        </div>
                        <div className="col-12 col-md-6">
                            <Input label={"Data transação:"} type={"text"} style={{ width: '200px' }} nameInput={"dataTransação"} value={dadosVeiculo.dataRegistro} required />
                        </div>
                        <div className="col-12 col-md-6">
                            <Input label={"Observações:"} type={"text"} style={{ width: '300px' }} nameInput={"observacoes"} value={dadosVeiculo.observacoes} required />
                        </div>

                    </Form>
                </Box>

            </div>

        </ContainerSecundario>
    )

}

export default ConsultarVenda
