import './App.css'

import ContainerPrincipal from "./components/container/ContainerPrincipal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './pages/body/Body';

function App() {

  return (
    <>
      <ContainerPrincipal>
       <Body/>
      </ContainerPrincipal>
    </>
  )
}

export default App
