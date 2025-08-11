import { useState, useEffect, useRef } from "react";
import ContainerSecundario from '../../../components/container/ContainerSecundario'
import html2pdf from 'html2pdf.js'
import { useGetData } from '../../../services/useGetData';
import { formatDateInfo } from "../../../hooks/formatDate";
import { calculateDaysInStock } from "../../../hooks/useCalc";
import "../GestaoEstoque.css";
import Box from '../../../components/box/Box'
import Table from "../../../components/table/Table";
import Input from "../../../components/input/Input";
import Select from "../../../components/select/Select";
import Button from "../../../components/button/Button";

const RelatorioEstoque = () => {

    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const tabelaRef = useRef(null);


    //Recebendo os veículos da tabela
    const { data: veiculos } = useGetData(`http://localhost:8090/api/v1/veiculos`);

    //Recebe o array de objetos veiculos e realiza as tratativas de busca 
    useEffect(() => {
        if (veiculos && !veiculos.erro && Array.isArray(veiculos)) {
            console.log('Dados recebidos da API: ', veiculos);

            // Organiza os veículos por loja (ordem alfabética)
            const lojasOrdenadas = [...veiculos].sort((a, b) =>
                (a?.unidade || '').localeCompare(b?.unidade || '')
            );

            //Calcula dias em estoque
            const dadosComDias = lojasOrdenadas.map((veiculo) => ({
                ...veiculo,
                dias_estoque: calculateDaysInStock(veiculo.data_registro),
            }));


            // Filtrar por termo e por data
            let filtrados = [...dadosComDias];

            if (searchTerm.trim() !== '') {
                const lower = searchTerm.toLowerCase();
                filtrados = filtrados.filter(v =>
                    v.placa?.toLowerCase().includes(lower) ||
                    v.unidade?.toLowerCase().includes(lower) ||
                    v.marca?.toLowerCase().includes(lower) ||
                    v.modelo?.toLowerCase().includes(lower) ||
                    v.cor?.toLowerCase().includes(lower)
                );
            }

            if (filterDate !== '') {
                filtrados = filtrados.filter(v => {
                    const dataRegistro = new Date(v.data_registro).toISOString().split('T')[0]; // YYYY-MM-DD
                    return dataRegistro === filterDate;
                });
            }

            // dados completos
            setFilteredVehicles(filtrados);     // dados filtrados
            setCurrentPage(1);                       // reseta para primeira página ao filtrar
        }
    }, [veiculos, searchTerm, filterDate]);

    //Passando as colunas com as suas respectivas chaves
    const colunas = [
        { key: 'unidade', label: 'LOJA' },
        { key: 'data_registro', label: 'DATA REGISTRO', format: (value) => formatDateInfo(value) /*Formatando a data para 00/00/00 */ },
        { key: 'marca', label: 'MARCA' },
        { key: 'modelo', label: 'MODELO' },
        { key: 'cor', label: 'COR' },
        { key: 'ano_fabricacao', label: 'ANO FABRICAÇÃO' },
        { key: 'ano_modelo', label: 'ANO MODELO' },
        { key: 'placa', label: 'PLACA' },
        { key: 'renavan', label: 'RENAVAM' },
        { key: 'dias_estoque', label: 'DIAS EM ESTOQUE', format: (value) => value !== undefined ? `${value} dia(s)` : 'N/A' /*in */ },

    ]


    //Função que trata da paginação da tabela
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredVehicles.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(filteredVehicles.length / pageSize);

    //Array de opções para o select
    const options = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 50, label: '50' },
        { value: 100, label: 'TODOS' },
    ];

    //Funçao que gera o PDF da tabela
    const gerarPDF = () => {
        const element = tabelaRef.current;
        const opt = {
            margin: 0.5,
            filename: 'Veiculos.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <ContainerSecundario >
            <div className='container d-flex'>
                <div className='path'>
                    <a className="link_a" href="/">Gestão</a><i className=' ti ti-angle-right ' id='card-path'></i><a className="link_a" href="/gestao_estoque">Gestão de Estoque</a>
                    <i className=' ti ti-angle-right ' id='card-path'></i><p className='atual'>Estoque </p>
                </div>
            </div>
            <div className="container d-flex justify-content-center card-container">
                <Box>
                    <div className='panel-heading'>
                        <i className='ti ti-car' id="ti-black" ></i>
                        <p>VERIFICAR ESTOQUE DE VEÍCULOS</p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="d-flex flex-row-reverse" >
                            <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} label={"Pesquisar por loja, placa, modelo, marca ou cor:"} id='criterios-pesquisa' />
                            <br />
                            <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} label={"Pesquisar pela data de entrada"} />
                        </div>
                        <br />
                        <br />
                        <div className="position-absolute top-25 start-50 translate-middle" id="pagination" >
                            <Button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} variant={currentPage === 1 ? 'disabled' : 'primary'} className={"px-3 py-1 bg-gray-300 rounded"} >
                                <i className=' ti ti-angle-left px-3 py-1 bg-gray-300 rounded' id='card-path' />ANTERIOR
                            </Button>
                            <span>
                                PÁGINA {currentPage} DE {totalPages}
                            </span>
                            <Button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className={"px-3 py-1 bg-gray-300 rounded"} >
                                PRÓXIMA <i className=' ti ti-angle-right px-3 py-1 bg-gray-300 rounded' />
                            </Button>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="position-absolute top-25 start-50 translate-middle">
                            <div className="p-2 ">
                                <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} options={options} className={"quantidade"} label={"Quantidade de veiculos por página"} />
                            </div>
                        </div>
                        <br />
                        <br />

                    </div>
                    <div className="table-responsive" ref={tabelaRef}>
                        <div>
                            <Table data={paginatedData} columns={colunas} className={"table table-striped table-bordered table-data dataTable no-footer"} role="grid" id="estoque" />
                        </div>
                    </div>
                    <Button onClick={gerarPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
                        GERAR PDF
                    </Button>
                </Box>
            </div>
        </ContainerSecundario>
    )
}

export default RelatorioEstoque
