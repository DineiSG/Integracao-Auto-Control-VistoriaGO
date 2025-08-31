import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useGetData } from "../../../../services/useGetData"
import useGroupedChart from "../../../../hooks/useGroupedChart";
import Button from "../../../../components/button/Button";
import html2pdf from 'html2pdf.js'
import { useRef } from "react";

const Marca = () => {

  const { data } = useGetData("/veiculos")

  const graphRef = useRef(null);

  const { chartData, chartOptions } = useGroupedChart({
    data: data ?? [],
    datasetLabel: "",
    groupByKey: "marca",
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
      filename: 'Marca.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
  };


  return (
    <div >
      <div ref={graphRef}>
        <div className='panel-heading'>
          <i className='ti ti-bar-chart-alt' id="ti-black" ></i>
          <p>VEICULOS POR MARCA</p>
        </div>
        <div style={{ width: "1000px", height: "400px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
              <div className="d-flex flex-row-reverse">
          <Button onClick={gerarPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
            GERAR PDF
          </Button>
        </div>
    </div>

  );
}

export default Marca
