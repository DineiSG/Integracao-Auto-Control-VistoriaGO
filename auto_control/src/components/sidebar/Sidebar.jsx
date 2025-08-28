import { useEffect, useRef, /*useState*/ } from "react";
import "../../assets/css/themify-icons.css"
import './Sidebar.css';
import ButtonSidebar from "../button_sidebar/ButtonSidebar";




function Sidebar() {

  /*const [clickedCredito, setClickedCredito] = useState(false);
  const [clickedVeiculo, setClickedVeiculo] = useState(false);*/

  // Refs para os elementos de crédito e veículo
  // Isso é necessário para verificar se o clique foi fora desses elementos
  const creditoRef = useRef(null);
  const veiculoRef = useRef(null);


  /*const handleClickCredito = (e) => {
    e.preventDefault();
    setClickedCredito(true);

  };

  const handleClickVeiculo = (e) => {
    e.preventDefault();
    setClickedVeiculo(true);
  };*/

  // Efeito para adicionar e remover o evento de clique fora dos elementos
  // Isso é necessário para fechar os menus quando o usuário clica fora deles
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (
        creditoRef.current &&
        !creditoRef.current.contains(event.target) &&
        veiculoRef.current &&
        !veiculoRef.current.contains(event.target)
      ) {
        //setClickedCredito(false);
        //setClickedVeiculo(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    }
  }, []);

  return (

    <div className="corpo_menu">
      <div className="logo_img">
        <img src="https://ambteste.credtudo.com.br/adm/sistema/logoClientes/2849/KoKJAxPldsG9ho7.jpeg" alt="Logo" />
      </div>
      <div >
        <li className="separator">
          <span>EXPLORE</span>
        </li>
        <div className="menu">
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-stats-up "} classNameLink={"item_menu"} text={"Dashboard"} href={"#"} />
          </li>
          <li className="botoes" >
            <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Atividades"} href={"#"} />
          </li>
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-panel"} classNameLink={"item_menu"} text={"Administrativo"} href={"#"} />
          </li>
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-calendar"} classNameLink={"item_menu"} text={"Agendamento/OS"} href={"#"} />
          </li>
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Gestão de Vistorias"} href={"#"} />
          </li>
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Dashboard"} href={"#"} />
          </li>
          <li className="botoes">
            <ButtonSidebar iconClass={"ti ti-time"} classNameLink={"item_menu"} text={"Dashboard"} href={"#"} />
          </li>



          <li className="separator"><span>CONSULTE</span></li>
          <div className="dropdown" >
            <a className="btn btn-secondary dropdown-toggle  item_menu ti ti-time" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="item_menu">
              Dropdown link 1
            </a>
            <ul className="dropdown-menu " >
              <li><a className="dropdown-item " href="#" >Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
          <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle item_menu" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown link 2
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>



      </div>
    </div>





  );
}
export default Sidebar;