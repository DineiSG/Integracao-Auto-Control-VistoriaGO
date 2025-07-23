import "../container/Container.css"


function ContainerSecundario({children}){
    return(
        <div className="container-fluid container_secundario min-vh-100 d-flex flex-column p-0">
            {children}
        </div>
    )
}

export default ContainerSecundario