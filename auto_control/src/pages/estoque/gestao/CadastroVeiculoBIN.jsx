import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Form from '../../../components/form/Form';
import Box from "../../../components/box/Box"
import ContainerSecundario from "../../../components/container/ContainerSecundario"
import Input from '../../../components/input/Input';

import { useState, useEffect, useRef } from 'react';
import { useGetData } from '../../../services/useGetData';
import { usePostData } from '../../../services/usePostData';
import { formatTimestamp } from '../../../hooks/formatDate';
import { toUpperCaseData } from '../../../hooks/transformToUppercase';
import Button from '../../../components/button/Button';


const CadastroVeiculoBIN = () => {
    const [placa, setPlaca] = useState('')
    const [buscaPlaca, setBuscaPlaca] = useState([]);
    const [unidade, setUnidade] = useState('')

    //Buscando os dados da loja para o select
    const { data: dadosLoja, } = useGetData(`/lojas`);

    //Buscando os dados na base BIN do Detran
    // A URL da API deve ser ajustada conforme a configuração do backend
    const { data: veiculo, } = useGetData(buscaPlaca ? `/veiculos/dados?placa=${placa}` : '');

    const { createData } = usePostData('/veiculos');


    // Usando useRef para armazenar a última placa buscada
    // Isso evita que a busca seja feita repetidamente para a mesma placa
    const ultimaPlacaBuscada = useRef('');


    // Função para lidar com o evento de blur do campo placa
    // Ela verifica se a placa tem 7 caracteres e se é diferente da última buscada
    const handleBlur = () => {
        const placaM = placa.toUpperCase();
        if (placaM.length === 7) {
            // Só busca se a placa for diferente da última buscada
            if (placaM !== ultimaPlacaBuscada.current) {
                console.log('Buscando placa:', placaM); // Debug
                ultimaPlacaBuscada.current = placaM;
                setBuscaPlaca(placaM);
            }
        }
    }

    // Função para converter campos em CAIXA ALTA
    const toUpperFields = (obj, fields = []) => {
        const copy = { ...obj }
        fields.forEach((f) => {
            if (copy[f] !== undefined && copy[f] !== null) {
                copy[f] = String(copy[f]).toUpperCase()
            }
        })
        return copy
    }

    // Função para lidar com a seleção de unidade
    const handleUnidadeChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]
        const id = Number(selectedOption.value)
        const descricao = selectedOption.getAttribute('data-descricao')

        setUnidade(descricao, id)
    }

    //
    useEffect(() => {

        if (veiculo && !veiculo.erro) {

            // Atualizando o estado com os dados do veículo obtidos
            setBuscaPlaca(prev => ({
                ...prev,
                Fabricante: veiculo.Fabricante,
                MarcaModelo: veiculo.MarcaModelo,
                CorVeiculo: veiculo.CorVeiculo,
                AnoFabricacao: veiculo.AnoFabricacao,
                AnoModelo: veiculo.AnoModelo,
                renavam: veiculo.renavam,
            }))
        }

    }, [veiculo])

    // Funçao que eunvia os dados do veículo para o backend
    // Ela formata a data de registro e envia os dados para o backend
    const handleSubmit = async (e) => {
        e.preventDefault()


        const data_registro = formatTimestamp(new Date())
        let dados = { placa, data_registro, unidade, marca: veiculo.Fabricante, modelo: veiculo.MarcaModelo, cor: veiculo.CorVeiculo, ano_fabricacao: veiculo.AnoFabricacao, ano_modelo: veiculo.AnoModelo, renavan: veiculo.renavam, }
        dados = toUpperFields(dados, ['placa', 'marca', 'modelo', 'cor', 'unidade'])

        const confirmar = window.confirm("Confirma o cadastro do veículo?");
        if (confirmar === true) {
            try {
                const dadosUpper = toUpperCaseData(dados)

                await createData(dadosUpper)
                //console.log('Veiculo cadastrado com sucesso, ', resultado)
                window.alert('Veiculo cadastrado com sucesso')
                window.location.reload()


            } catch (err) {
                console.error('Falha ao registrar o veiculo: ', err)
            }
        }
    }




    return (
        <div>
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
                                <a className="link_a" href="/gestao_estoque">Gestão de Estoque</a>
                            </div>
                            <div className="p-2">
                                <i className=' ti ti-angle-right ' id='card-path' />
                            </div>
                            <div className="p-2">
                                <p className='atual'>Cadastro de Veiculos (Base BIN) </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center card-container">
                    <Box >
                        <div className='panel-heading'>
                            <i className='ti ti-car' id="ti-black" ></i>
                            <p>CADASTRO DE VEICULOS COM CONSULTA À BASE BIN <br /> Selecione a loja e informe a placa do veículo para buscar os dados na Base BIN do Detran</p>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <div className='col-12 col-md-4' id='select-all'>
                                <label className="label" id="select-label"><span>Loja:</span></label>
                                <select type='text' name='loja' value={unidade} onChange={handleUnidadeChange} className="select-item" required >
                                    <option value="" >SELECIONE UMA LOJA</option>
                                    {dadosLoja.map((loja) => (
                                        <option key={loja.descricao} value={loja.descricao} data-descricao={loja.descricao}>
                                            {loja.descricao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Placa:"} type={"text"} maxLength={"7"} style={{ width: '80px' }} nameInput={"placa"}
                                    value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required />
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Marca:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"} value={veiculo.Fabricante} required readOnly />
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Modelo:"} type={"text"} style={{ width: '150px' }} nameInput={"modelo"} value={veiculo.MarcaModelo} required readOnly />
                            </div>
                            <div className="col-12 col-md-4">
                                <Input label={"Cor:"} type={"text"} style={{ width: '150px' }} nameInput={"cor"} value={veiculo.CorVeiculo} required readOnly />
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Ano Fabricacao:"} type={"text"} style={{ width: '80px' }} nameInput={"anoFabricacao"} value={veiculo.AnoFabricacao} required readOnly />
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Ano Modelo:"} type={"text"} style={{ width: '80px' }} nameInput={"veiculo"} value={veiculo.AnoModelo} required readOnly />
                            </div>
                            <div className="col-12 col-md-3">
                                <Input label={"Renavam:"} type={"text"} style={{ width: '150px' }} nameInput={"renavam"} value={veiculo.renavam} required readOnly />
                            </div>
                            <div className="d-flex flex-row-reverse" >
                                <Button onClick={handleSubmit} variant='primary' >ENVIAR</Button>
                            </div>


                        </Form>
                    </Box>
                </div>

            </ContainerSecundario>
        </div>
    )
}

export default CadastroVeiculoBIN
