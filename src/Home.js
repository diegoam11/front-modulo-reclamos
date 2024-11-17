
import './home.css'
const Home = () => {
    return (
        <div className="contenedor">
        <header className="header" id="inicio">
                <div className="ContTitulo">
                  <h1 className="titulo">Módulo de Reclamos, Solicitudes y Quejas</h1>
                </div>
                
                <p className="copy">¡Bienvenido al Módulo de Reclamos, Solicitudes y Quejas de nuestra plataforma integral de ERP para telecomunicaciones! 
                Estamos emocionados de presentarte una herramienta diseñada para simplificar y agilizar la gestión de interacciones críticas con tus clientes.
                A continuación, se muestra un resumen de los RQS registrados en el sistema:
                </p>
        </header>

        <div className="contenedor-recuadros">
            <div className="recuadro">
                <h2>Reclamos</h2>
                {/* Contenido del recuadro de reclamos */}
            </div>

            <div className="recuadro">
                <h2>Solicitudes</h2>
                {/* Contenido del recuadro de solicitudes */}
            </div>

            <div className="recuadro">
                <h2>Quejas</h2>
                {/* Contenido del recuadro de quejas */}
            </div>
        </div>
    </div>

        
        
    )
}


export default Home

