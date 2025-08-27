import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Form from '../../../components/form/Form';
import Box from "../../../components/box/Box"
import ContainerSecundario from "../../../components/container/ContainerSecundario"
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import { useState } from 'react';
import { useGetData } from '../../../services/useGetData';
import { usePostData } from '../../../services/usePostData';
import { formatTimestamp } from '../../../hooks/formatDate';
import { onlyNumbers } from "../../../hooks/useMask";


const CadastroVeiculo = () => {
    const [marca, setMarca] = useState('')
    const [modelo, setModelo] = useState('')
    const [cor, setCor] = useState('')
    const [placa, setPlaca] = useState('')
    const [ano_fabricacao, setAnoFabricacao] = useState('')
    const [ano_modelo, setAnoModelo] = useState('')
    const [renavan, setRenavan] = useState('')
    const [unidade, setUnidade] = useState('')

    // Busca dados das lojas
    const { data: dadosLoja } = useGetData(`/lojas`)
    // Envia os dados do veículo
    const { createData } = usePostData('/veiculos')

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

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault()

        const data_registro = formatTimestamp(new Date())

        // Envia nome da loja no campo 'unidade'
        let dados = {
            placa,
            data_registro,
            unidade, // nome da loja
            marca,
            modelo,
            cor,
            ano_fabricacao,
            ano_modelo,
            renavan
        }

        console.log('Dados a serem enviados: ', dados)
        // Padroniza para caixa alta
        dados = toUpperFields(dados, ['placa', 'marca', 'modelo', 'cor', 'unidade'])

        // Verifica se todos os campos obrigatórios estão preenchidos
        const confirmar = window.confirm("Confirma o cadastro do veículo?");
        if (confirmar === true) {
            try {
                await createData(dados)
                //console.log('Veiculo cadastrado com sucesso, ', resultado)
                window.alert('Veiculo cadastrado com sucesso')
                window.location.reload()
            } catch (err) {
                console.error('Falha ao registrar o veiculo: ', err)
                window.alert('Falha ao registrar o veículo. Veja console para detalhes.')
            }
        }
    }

    // Função para lidar com a mudança de unidade

    const handleUnidadeChange = (e) => {
        const selectedOption = e.target.selectedOptions[0]
        const id = Number(selectedOption.value)
        const descricao = selectedOption.getAttribute('data-descricao')

        setUnidade(descricao, id)
    }

    return (

        <ContainerSecundario>

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
                        <p className='atual'>Cadastro de Veículos</p>
                    </div>
                </div>
            </div>

            <div className="container d-flex justify-content-center card-container">
                <Box>
                    <div className='panel-heading'>
                        <i className='ti ti-car' id="ti-black"></i>
                        <p>CADASTRO DE VEICULOS SEM CONSULTA À BASE BIN <br /> Selecione a loja e informe os demais dados do veículo.</p>
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
                                value={placa} onChange={(e) => setPlaca(e.target.value)} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <Input label={"Marca:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"}
                                value={marca} onChange={(e) => setMarca(e.target.value)} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <Input label={"Modelo:"} type={"text"} style={{ width: '150px' }} nameInput={"modelo"}
                                value={modelo} onChange={(e) => setModelo(e.target.value)} required />
                        </div>

                        <div className="col-12 col-md-4">
                            <Input label={"Cor:"} type={"text"} style={{ width: '150px' }} nameInput={"cor"}
                                value={cor} onChange={(e) => setCor(e.target.value)} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <Input label={"Ano Fabricacao:"} type={"text"} maxLength={4} style={{ width: '80px' }} nameInput={"anoFabricacao"}
                                value={ano_fabricacao} onChange={(e) => setAnoFabricacao(onlyNumbers(e.target.value))} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <Input label={"Ano Modelo:"} type={"text"} maxLength={4} style={{ width: '80px' }} nameInput={"anoModelo"}
                                value={ano_modelo} onChange={(e) => setAnoModelo(onlyNumbers(e.target.value))} required />
                        </div>

                        <div className="col-12 col-md-3">
                            <Input label={"Renavam:"} type={"text"} style={{ width: '150px' }} nameInput={"renavam"}
                                value={renavan} onChange={(e) => setRenavan(onlyNumbers(e.target.value))} required />
                        </div>

                        <div className="d-flex flex-row-reverse">
                            <Button type="submit" variant='primary'>ENVIAR</Button>
                        </div>
                    </Form>
                </Box>
            </div>
        </ContainerSecundario>

    )
}

export default CadastroVeiculo
