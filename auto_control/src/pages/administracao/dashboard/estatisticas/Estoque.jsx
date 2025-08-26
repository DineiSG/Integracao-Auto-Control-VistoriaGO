import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useGetData } from "../../../../services/useGetData";// seu hook de fetch (mock abaixo)
import useGroupPercent from "../../../../hooks/useGroupPercent";
import useGroupedChart from "../../../../hooks/useGroupedChart";
import Button from "../../../../components/button/Button";
import html2pdf from 'html2pdf.js'
import { useRef } from "react";

const Estoque = () => {

    const { data } = useGetData(`/veiculos`)

    const graphRef = useRef(null);

    //Recebendo as configurações do hook useGroupPercent
    const { total, chartOptions} = useGroupPercent({
        data: data ?? [],
        groupByKey: "unidade",
        datasetLabel: "Estoque por loja ",
        percentLabel: "Percentual (%)",
        sortBy: "value",
        sortOrder: "desc",
        round: 1,
    });

    const { chartData } = useGroupedChart({
        data: data ?? [],
        datasetLabel: "",
        groupByKey: "unidade",
        aggregate: "count",
        chartType: "bar",
        sortBy: "value",
        sortOrder: "desc"
    });

    //Funçao que gera o PDF do grafico
    const gerarPDF = () => {
        const element = graphRef.current;
        const opt = {
            margin: 0.5,
            filename: 'Estoque Loja.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().set(opt).from(element).save();
    };

    return (
        <div>
            <div style={{ width: "1000px", height: "400px", alignItems:"center" }} ref={graphRef}>
                <div className='panel-heading'>
                    <i className='ti ti-bar-chart-alt' id="ti-black" ></i>
                    <p>ESTOQUE DAS LOJAS EM %<br /> Quantidade total: {total} veiculos </p>
                </div>
                <div style={{ height: 260 }}  >
                    <Pie options={chartOptions} data={chartData} id="graficos" />
                </div>

            </div>
            <div className="d-flex flex-row-reverse">
                <Button onClick={gerarPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
                    GERAR PDF
                </Button>
            </div>

        </div>


    )
}

export default Estoque
