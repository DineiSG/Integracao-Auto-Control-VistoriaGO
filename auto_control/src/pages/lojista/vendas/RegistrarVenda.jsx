import ContainerSecundario from '../../../components/container/ContainerSecundario'
import "../../../assets/css/thead.css";
import "../../../assets/css/themify-icons.css"
import Box from '../../../components/box/Box';
import Input from '../../../components/input/Input';
import Form from '../../../components/form/Form';
import { formatCPF, formatCEP, formatDate, formatTel, formatValue } from "../../../hooks/useMask"
import { useState, useEffect, useRef } from "react";
import { useGetData } from '../../../services/useGetData';
import { usePostData } from '../../../services/usePostData';
import { calcValorFinanceiro } from '../../../hooks/useCalc';
import { formatTimestamp } from '../../../hooks/formatDate';
import Button from '../../../components/button/Button';
import { useGetExtern } from '../../../services/useGetExtrern';


const RegistrarVenda = () => {

  const [placa, setPlaca] = useState('')
  const [comprador, setComprador] = useState('')
  const [nascimento, setNascimento] = useState("")
  const [cpf, setCpf] = useState("")
  const [rg, setRg] = useState('')
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState('')
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState('')
  const [valorFipe, setValorFipe] = useState('')
  const [valorVenda, setValorVenda] = useState('')
  const [valorFinanciamento, setValorFinanciamento] = useState('')
  const [valorEntrada, setValorEntrada] = useState('')
  const [instituicao, setInstituicao] = useState('')
  const [condicoes, setCondicoes] = useState(false)
  const [tipoVenda, setTipoVenda] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [buscaPlaca, setBuscaPlaca] = useState("")
  const [dadosVeiculo, setDadosVeiculo] = useState({ placa: '', marca: '', modelo: '', cor: '', renavam: '', unidade: '' })
  const [dadosCEP, setDadosCEP] = useState({ cep: '', rua: '', cidade: '', bairro: '', uf: '' })
  const [vendedor, setVendedor] = useState({ nome: '', unidade: '' })

  /*Alterando a placa para letras maiusculas */

  // buscando os dados no bd
  const { data: veiculo, } = useGetData(buscaPlaca ? `/veiculos/placa/${placa}` : null)
  const { data: dadosPostais } = useGetExtern(cep ? `https://brasilapi.com.br/api/cep/v1/${cep}` : null)
  const { data: dadosVendedor } = useGetData(vendedor ? `/vendedor` : null)
  const { createData } = usePostData('/vendas');

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

    if (cep === "*") {
      setCep(cep)
    }

  };

  //Calcula o valor financiado
  useEffect(() => {
    const resultado = calcValorFinanceiro(valorVenda, valorEntrada);
    setValorFinanciamento(resultado);
  }, [valorVenda, valorEntrada])



  //Valida se a venda e à vista. Caso nao seja, os inputs de entrada e valor financiado sao liberados
  const handleVendaChange = (e) => {
    setTipoVenda(e.target.value)
    if (e.target.value === 'aVista') {
      setCondicoes(false)
    } else {
      setCondicoes(true)
    }
  }

  // Preencher campos quando os dados solicitados chegarem
  useEffect(() => {
    if (veiculo && !veiculo.erro) {
      console.log('Dados do veículo recebidos:', veiculo); // Debug
      setDadosVeiculo(prev => ({
        ...prev,
        marca: veiculo.marca || '',
        modelo: veiculo.modelo || '',
        cor: veiculo.cor || '',
        renavam: veiculo.renavan || '',
        unidade: veiculo.unidade || ''
      }));
    } else if (veiculo && veiculo.erro) {
      console.log('Veículo não encontrado');;
    }

    //Obtendo os dados postais
    if (dadosPostais && !dadosPostais.erro) {
      console.log('Dados postais recebidos: ', dadosPostais);
      const ruaTruncada = dadosPostais.street ? dadosPostais.street.substring(0, 30) : '';
      setDadosCEP(prev => ({
        ...prev,
        cep: dadosPostais.cep,
        rua: ruaTruncada,
        cidade: dadosPostais.city,
        uf: dadosPostais.state,
        bairro: dadosPostais.neighborhood,
      }))
    } else if (dadosPostais && dadosPostais.erro) {
      console.log("Endereço nao encontrado ou CEP inválido")
    }

    //Obtendo os dados do vendedor
    if (dadosVendedor && !dadosVendedor.erro) {
      console.log('Dados do vendedor recebidos: ', dadosVendedor)
      setVendedor(prev => ({
        ...prev,
        id: dadosVendedor.id,
        nome: dadosVendedor.nome,
        unidade: dadosVendedor.unidade
      }))
    }



  }, [veiculo, dadosPostais, dadosVendedor]);

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


  //Dados que serao obtidos da tabela veiculo (retornando como veiculo.dado), e serao enviados à tabela vendas
  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataRegistro = formatTimestamp(new Date())
    let dados = {
      placa, id: veiculo.id, marca: veiculo.marca, modelo: veiculo.modelo, cor: veiculo.cor, unidade: veiculo.unidade,
      renavam: veiculo.renavan, comprador, vendedor, nascimento, rg, cpf, telefone, email, cep: dadosPostais.cep, rua: dadosCEP.rua,
      endereco, bairro: dadosPostais.neighborhood, cidade: dadosPostais.city, uf: dadosPostais.state,
      valorVenda, valorFipe, valorFinanciamento, valorEntrada, tipoVenda, instituicao, dataRegistro, observacoes
    }

    dados = toUpperFields(dados, ['placa', 'marca', 'modelo', 'cor', 'unidade', 'comprador', 'vendedor', 'endereco', 'bairro','rua', 'cidade', 'uf', 'instituicao', 'tipoVenda'])
    // Padroniza para caixa alta
    window.confirm("Confirma o registro da venda?")
    //console.log('Dados a serem enviados: ', dados)

    try {
      const resultado = await createData(dados)
      console.log('Venda cadastrada com sucesso, ', resultado)
      window.alert('Venda registrada com sucesso')
      window.location.reload()


    } catch (err) {
      console.error('Falha ao registrar a venda: ', err)
    }
  }

  // Função para lidar com a mudança de unidade
  const handleVendedorChange = (e) => {
    const selectedOption = e.target.selectedOptions[0]
    const id = Number(selectedOption.value)
    const nome = selectedOption.getAttribute('data-descricao')

    setVendedor(nome, id)
  }




  return (
    <ContainerSecundario>
      <div className='container d-flex'>
        <div className='path'>
          <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i>
          <a className="link_a" href="/lojista">Lojista</a><i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Registrar Venda </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center card-container">
        <Box onSubmit={handleSubmit}>
          <div className='panel-heading'>
            <i className='ti ti-car' id="ti-black" ></i>
            <p>REGISTRAR A VENDA DE UM VEÍCULO <br /> Informe os dados do veículo</p>
          </div>
          <Form >

            <div className="col-12 col-md-2">
              <Input label={"Placa:"} type={"text"} maxLength={"7"} style={{ width: '80px' }} nameInput={"placa"}
                value={placa} onChange={(e) => setPlaca(e.target.value)} onBlur={handleBlur} required />
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
            <p>DADOS DO COMPRADOR <br /> Informe os dados do comprador</p>
          </div>
          <Form>
            <div className="col-6 col-md-5">
              <Input label={"Nome Completo:"} type={"text"} style={{ width: '250px' }} nameInput={"comprador"} value={comprador}
                onChange={(e) => setComprador(e.target.value)} required />
            </div>
            <div className="col-6 col-md-4">
              <Input label={"Data de Nascimento:"} style={{ width: '110px' }} value={nascimento}
                nameInput={"data"} onChange={(e) => setNascimento(formatDate(e.target.value))} placeholder={"dd/mm/aaaa"} required />
            </div>
            <div className="col-6 col-md-3">
              <Input label={"CPF:"} type={"text"} style={{ width: '150px' }} maxLength={14}
                nameInput={"modelo"} value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} placeholder={"XXX.XXX.XXX-XX"} required />
            </div>
            <div className="col-6 col-md-3">
              <Input label={"RG:"} type={"text"} style={{ width: '150px' }} maxLength={14}
                nameInput={"rg"} value={rg} onChange={(e) => setRg(e.target.value)} required />
            </div>
            <div className="col-6 col-md-3">
              <Input label={"Telefone:"} type={"text"} style={{ width: '150px' }} maxLength={14}
                nameInput={"telefone"} value={telefone} onChange={(e) => setTelefone(formatTel(e.target.value))} placeholder={"(XX)XXXXX-XXXX"} required />
            </div>
            <div className="col-6 col-md-3">
              <Input label={"Email:"} type={"text"} style={{ width: '200px' }} nameInput={"email"} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-6 col-md-4">
              <Input label={"CEP:"} type={"text"} style={{ width: '100px' }} maxLength={9}
                nameInput={"cep"} value={cep} onChange={(e) => setCep(formatCEP(e.target.value))} onBlur={handleBlur} required />
            </div>
            <div className="col-6 col-md-4">
              <Input label={"Logradouro:"} type={"text"} style={{ width: '250px' }}
                nameInput={"logradouro"} value={dadosCEP.rua} readOnly />
            </div>
            <div className="col-6 col-md-4">
              <Input label={"Complemento:"} type={"text"} style={{ width: '200px' }} nameInput={"complemento"} value={endereco}
                onChange={(e) => setEndereco(e.target.value)} required />
            </div>
            <div className="col-6 col-md-4">
              <Input label={"Bairro:"} type={"text"} style={{ width: '200px' }} nameInput={"bairro"} value={dadosPostais.neighborhood} readOnly />
            </div>
            <div className="col-12 col-md-4">
              <Input label={"Cidade:"} type={"text"} style={{ width: '200px' }} nameInput={"cidade"} value={dadosPostais.city} readOnly />
            </div>
            <div className="col-12 col-md-3">
              <Input label={"UF:"} type={"text"} style={{ width: '70px' }} nameInput={"uf"} value={dadosPostais.state} readOnly />
            </div>
          </Form>
          <div className='sub-panel-heading'>
            <i className='ti ti-money' id="ti-black"></i>
            <p>DADOS DA TRANSAÇÃO <br /> Informe os dados do comprador</p>
          </div>
          <Form>{/*Select de vendedores */}
            <div className='col-12 col-md-4' id='select-all'>
              <label className="label" id="select-label"><span>Loja:</span></label>
              <select type='text' name='loja' value={vendedor} onChange={handleVendedorChange} className="select-item" required >
                <option value="" >SELECIONE UM VENDEDOR</option>
                {dadosVendedor.map((vendedores) => (
                  <option key={vendedores.nome} value={vendedores.nome} data-descricao={vendedores.nome}>
                    {vendedores.nome}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div className='negociacao'>
              <p>Forma de Negociação: </p>
              <div className="form-check " id="options">
                <Input label={"Financeira"} name={"tipoNegociacao"} className="form-check-input" type={"radio"} checked={tipoVenda === 'financeira'}
                  value={"financeira"} onChange={handleVendaChange} onClick={(e) => setTipoVenda(e.target.value)} />
                {tipoVenda === 'financeira' && (
                  <Input placeholder="Informe a financeira" nameInput={"financeira"} value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required />
                )}
                <Input label={"Banco"} name={"tipoNegociacao"} className="form-check-input" type={"radio"} checked={tipoVenda === 'banco'}
                  value={"banco"} onChange={handleVendaChange} onClick={(e) => setTipoVenda(e.target.value)} />
                {tipoVenda === 'banco' && (
                  <Input placeholder="Informe o banco" nameInput={"banco"} value={instituicao} onChange={(e) => setInstituicao(e.target.value)} required />
                )}
                <Input label={"Consorcio"} name={"tipoNegociacao"} className="form-check-input" type={"radio"} checked={tipoVenda === 'consorcio'}
                  value={"consorcio"} onChange={handleVendaChange} onClick={(e) => setTipoVenda(e.target.value)} />
                {tipoVenda === 'consorcio' && (
                  <Input placeholder="Informe o consórcio" nameInput={"consorcio"} value={instituicao} type={"text"} onChange={(e) => setInstituicao(e.target.value)} required />
                )}
                <Input label={"À Vista"} name={"tipoNegociacao"} className="form-check-input " type={"radio"} checked={tipoVenda === 'aVista'} value={"aVista"} onChange={handleVendaChange} onClick={(e) => setTipoVenda(e.target.value)} />

              </div>
            </div>
            <div className="col-12 col-md-6">
              <Input label={"Valor Fipe R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_fipe"} value={valorFipe}
                onChange={(e) => setValorFipe(formatValue(e.target.value))} required />
            </div>
            <div className="col-12 col-md-6">
              <Input label={"Valor Venda R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_venda"} value={valorVenda}
                onChange={(e) => setValorVenda(formatValue(e.target.value))} required />
            </div>
            {condicoes && (
              <>
                <div className="col-12 col-md-6">
                  <Input label={"Valor Entrada R$:"} type={"text"} style={{ width: '150px' }} name={"valor_entrada"} value={valorEntrada}
                    onChange={(e) => setValorEntrada(formatValue(e.target.value))} onBlur={handleBlur} required />
                </div>
                <div className="col-12 col-md-6">
                  <Input label={"Valor Financiado R$:"} type={"text"} style={{ width: '150px' }} nameInput={"valor_financiado"}
                    value={valorFinanciamento} onChange={(e) => setValorFinanciamento(e.target.value)} readOnly />
                </div>
              </>
            )}
            <div className="col-6 col-md-12">
              <Input label={"Observações:"} type={"text"} style={{ width: '500px' }} nameInput={"observacoes"}
                value={observacoes} onChange={(e) => setObservacoes(e.target.value)} required />
            </div>
            <div className="col-6 col-md-12">
              <Button onClick={handleSubmit} variant='primary' >ENVIAR</Button>
            </div>
          </Form>
        </Box>

      </div>

    </ContainerSecundario>
  )
}

export default RegistrarVenda
