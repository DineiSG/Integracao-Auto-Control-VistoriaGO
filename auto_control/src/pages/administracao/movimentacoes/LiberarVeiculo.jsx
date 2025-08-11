import ContainerSecundario from '../../../components/container/ContainerSecundario'
import Box from '../../../components/box/Box';
import Input from '../../../components/input/Input';
import Form from '../../../components/form/Form';
import Button from '../../../components/button/Button';

import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"

import { formatDateInfo} from '../../../hooks/formatDate';
import { useState, useEffect, useRef } from "react";
import { useGetData } from '../../../services/useGetData';
import { usePostData } from '../../../services/usePostData';
import { useDeleteData } from '../../../services/useDeleteData';

const LiberarVeiculo = () => {
  const [placa, setPlaca] = useState('')
    const [solicitante, setSolicitante] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [buscaPlaca, setBuscaPlaca] = useState("")
    const [selectedMotivo, setSelectedMotivo] = useState('')
    const [mostrarSelect, setMostrarSelect] = useState(false)
    const [dadosVeiculo, setDadosVeiculo] = useState({
        id: '', placa: '', marca: '', modelo: '', cor: '', observacoes: '', renavan: '',
        unidade: '', motivo: '', dataRegistro: '', data_cadastro: ''
    })

    // buscando os dados no bd
    const { data: veiculo, } = useGetData(buscaPlaca ? `http://localhost:8090/api/v1/veiculos/placa/${placa}` : null)

    // Enviando dados editados
    const { createData } = usePostData('http://localhost:8090/api/v1/baixas')

    const { deleteData } = useDeleteData(`http://localhost:8090/api/v1/veiculos`)


    // Ref para manter a referência atualizada da última placa buscada
    const ultimaPlacaBuscada = useRef('');

    // Função chamada quando o input da placa perde o foco

    const handleBlur = () => {

        const placaM = placa.trim().toUpperCase();
        if (placaM.length === 7) {
            // Só busca se a placa for diferente da última buscada
            if (placaM !== ultimaPlacaBuscada.current) {
                //console.log('Buscando placa:', placaM); // Debug
                ultimaPlacaBuscada.current = placaM;
                setBuscaPlaca(placaM);
            }
            setMostrarSelect(true);
        } else {
            setMostrarSelect(false);
            setDadosVeiculo({
                id: '', placa: '', marca: '', modelo: '', cor: '', observacoes: '', renavan: '',
                unidade: '', motivo: '', dataRegistro: '', data_cadastro: '', ano_fabricacao: '', ano_modelo: ''
            });
            setSelectedMotivo('');
            setSolicitante('');
            setObservacoes('');

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
                renavan: veiculo.renavan || '',
                unidade: veiculo.unidade || '',
                ano_modelo: veiculo.ano_modelo || '',
                ano_fabricacao: veiculo.ano_fabricacao || '',
                data_cadastro: formatDateInfo(veiculo.data_registro),


            }));
        } else if (veiculo && veiculo.erro) {
            console.log('Veículo não encontrado');;
        }

    }, [veiculo]);



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


    const handleSubmit = async (e) => {
        e.preventDefault()

        let dados = {
            placa, id: veiculo.id, marca: dadosVeiculo.marca, modelo: dadosVeiculo.modelo, cor: dadosVeiculo.cor, renavan: dadosVeiculo.renavan,
            unidade: dadosVeiculo.unidade, data_cadastro: dadosVeiculo.data_cadastro, solicitante, observacoes, motivo: selectedMotivo
        }

        dados = toUpperFields(dados, ['placa', 'marca', 'modelo', 'cor', 'unidade', 'motivo', 'solicitante', 'observacoes'])
        // Padroniza para caixa alta
        console.log('Dados a serem enviados: ', dados)

        const confirmar = window.confirm("Você tem certeza que deseja realizar a baixa deste veículo?");
        if (confirmar === true) {
            try {
                const resultado = await createData(dados)
                const deletar = await deleteData(placa)
                console.log('Veiculo removido do bd com sucesso: ', deletar)
                console.log('Baixa realizada com sucesso, ', resultado)
                window.alert('Baixa realizada com sucesso')
                //window.location.reload()
            } catch (err) {
                console.error('Falha ao registrar o veiculo: ', err)
                window.alert('Falha ao registrar o veículo. Veja console para detalhes.')
            }

        }
    }

    return (
        <ContainerSecundario>
            <div className='container d-flex'>
                <div className='path'>
                    <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i><a className="link_a" href="/administracao">Administracao</a>
                    <i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Baixar Veículo </p>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <Box onSubmit={handleSubmit}>
                    <div className='panel-heading'>
                        <i className='ti ti-close' id="ti-black" ></i>
                        <p>REALIZAR A BAIXA DE UM VEÍCULO <br /> Informe a placa do veículo para obter os demais dados</p>
                    </div>
                    <Form >
                        <div className="col-12 col-md-2">
                            <Input label={"Placa:"} type={"text"} maxLength={"7"} style={{ width: '85px' }} nameInput={"placa"}
                                value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Loja:"} type={"text"} style={{ width: '150px' }} nameInput={"unidade"} value={dadosVeiculo.unidade} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Marca:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"} value={dadosVeiculo.marca} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Modelo:"} type={"text"} style={{ width: '150px' }} nameInput={"modelo"} value={dadosVeiculo.modelo} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Cor:"} type={"text"} style={{ width: '150px' }} nameInput={"cor"} value={dadosVeiculo.cor} readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Ano Fabricacao:"} type={"text"} style={{ width: '50px' }} nameInput={"ano_fabricacao"} value={dadosVeiculo.ano_fabricacao} required readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Ano Modelo:"} type={"text"} style={{ width: '50px' }} nameInput={"ano_modelo"} value={dadosVeiculo.ano_modelo} required readOnly />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Renavam:"} type={"text"} style={{ width: '150px' }} nameInput={"renavam"} value={dadosVeiculo.renavan} readOnly />
                        </div>
                        {mostrarSelect && (
                            <>
                                <div className='col-12 col-md-3' id='select-all'>
                                    <label className="label" id="select-label"><span>Motivo:</span></label>
                                    <select type='text' name="motivo" value={selectedMotivo} onChange={(e) => setSelectedMotivo(e.target.value)} className="select-item" required>
                                        <option value="">INFORME UM MOTIVO</option>
                                        <option value="VENDA" >VENDA</option>
                                        <option value="DEVOLUCAO" >DEVOLUÇÃO</option>
                                        <option value="TRANSFERENCIA" >TRANSFERÊNCIA</option>
                                        <option value="CORRECAO" >CORREÇÃO DE ESTOQUE</option>
                                    </select>
                                </div>
                                <div className="col-12 col-md-3">
                                    <Input label={"Solicitante:"} type={"text"} style={{ width: '150px' }} nameInput={"solicitante"}
                                        value={solicitante} onChange={(e) => setSolicitante(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <Input label={"Observação:"} type={"text"} style={{ width: '300px' }} nameInput={"observacoes"}
                                        value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />
                                    <Input type={"hidden"} style={{ width: '300px' }} value={dadosVeiculo.data_cadastro} readOnly/>
                                        

                                </div>
                            </>
                        )}
                        <div className="d-flex flex-row-reverse">
                            <Button onClick={handleSubmit} variant='primary' >SALVAR</Button>
                        </div>

                    </Form>
                </Box>

            </div>

        </ContainerSecundario>
    )
}

export default LiberarVeiculo
