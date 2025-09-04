import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Form from '../../../components/form/Form';
import Box from "../../../components/box/Box"
import ContainerSecundario from "../../../components/container/ContainerSecundario"
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';

import { useState } from 'react';
//import { useGetData } from '../../../services/useGetData';
import { usePostData } from '../../../services/usePostData';
import { formatTimestamp } from '../../../hooks/formatDate';
import { formatTel } from "../../../hooks/useMask"

const CadastrarVendedor = () => {

    const [telefone, setTelefone] = useState('')
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [unidade, setUnidade] = useState('')

    // Busca dados das lojas
    //const { data: dadosLoja } = useGetData(`/lojas`)
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
            unidade,
            nome,
            email,
            data_registro,

        }

        console.log('Dados a serem enviados: ', dados)
        // Padroniza para caixa alta
        dados = toUpperFields(dados, ['unidade', 'nome'])

        // Verifica se todos os campos obrigatórios estão preenchidos
        const confirmar = window.confirm("Confirma o cadastro do vendedor?");
        if (confirmar === true) {
            try {
                await createData(dados)
                //console.log('Veiculo cadastrado com sucesso, ', resultado)
                window.alert('Vendedor cadastrado com sucesso')
                window.location.reload()
            } catch (err) {
                console.error('Falha ao cadastrar o vendedor: ', err)
                window.alert('Falha ao registrar o vendedor.')
            }
        }
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
                        <a className="link_a" href="/lojista">Lojista</a>
                    </div>
                    <div className="p-2">
                        <i className=' ti ti-angle-right ' id='card-path' />
                    </div>
                    <div className="p-2">
                        <p className='atual'>Cadastrar Vendedor </p>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <Box>
                    <div className='panel-heading'>
                        <i className='ti ti-user' id="ti-black"></i>
                        <p>CADASTRO DE VENDEDOR <br /> Informe os dados</p>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <div className="col-12 col-md-4">
                            <Input label={"Nome:"} type={"text"} style={{ width: '300px' }} nameInput={"placa"}
                                value={nome} onChange={(e) => setNome(e.target.value)} required />
                            <div className="col-12 col-md-3">
                                <Input type={"hidden"} style={{ width: '100px' }} nameInput={"unidade"}
                                    value={unidade} onChange={(e) => setUnidade(e.target.value)} required />
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <Input label={"Email:"} type={"text"} style={{ width: '250px' }} nameInput={"modelo"}
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="col-12 col-md-3">
                            <Input label={"Telefone:"} type={"text"} style={{ width: '150px' }} nameInput={"marca"}
                                value={telefone} onChange={(e) => setTelefone(formatTel(e.target.value))} required />
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

export default CadastrarVendedor
