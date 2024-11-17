import Home from './Home';
import About from './components/About';
import Missing from './components/Missing';
import { format } from 'date-fns'
import {useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

//API 
import apiBack from './api/api'
import apiClientes from './api/clientes'

//Import sidebar modules y estilos de la sidebar vertical
import './components/elements/Bar/sidebar.css'// Estilo css
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme} from 'antd'
import Logo from './components/elements/Bar/Logo'
import MenuList from './components/elements/Bar/MenuList'
import ToggleThemeButton from './components/elements/Bar/ToggleThemeButton'

//Formulario de Registro
import FormRQS from './components/formulariosrqs/FormRQS';

//Tablas de RQS's
import TablaReclamo from './components/tablasrqs/TablaReclamo';
import TablaSolicitud from './components/tablasrqs/TablaSolicitud';
import TablaQueja from './components/tablasrqs/TablaQueja';

//Ventana de Detalle de RQS's
import DetalleReclamo from './components/detallerqs/DetalleReclamo';



import EditarReclamo from './components/editarrqs/EditarReclamo';
import EditarSolicitud from './components/editarrqs/EditarSolicitud';
import DetalleQueja from './components/detallerqs/DetalleQueja';
import DetalleSolicitud from './components/detallerqs/DetalleSolicitud';
import EditarQueja from './components/editarrqs/EditarQueja';

const {Header, Sider} = Layout//Componentes Sidebar Vertical




function App() {

  // Sidebar vertical Responsive variables
  const [darkTheme, setDarkTheme] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: {colorBgContainer},
  } = theme.useToken()

  const  toggleTheme = () => {
    setDarkTheme(!darkTheme)
  }

  //Implementacion Forzosa de patron builder
  // ------------------------------------------------
  // Definimos nuestra funcion builder

  //VARIABLES ARREGLO DE R Q S
  const [reclamosClases, setReclamosClases] = useState([])//Arreglo de Reclamos traido de la Api
  //Arreglo de Solicitudes traido de la Api
  //Arreglo de Quejas traido de la Api

  //MODAL
  const [modalVisible, setModalVisible] = useState(false)
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (!modalVisible) {
      // Limpiar el estado de procesamiento y mensajes de error al cerrar el modal
      setProcessing(false);
      setErrorMessage('');
    }
  }, [modalVisible]);

  const openModal = () => {
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    //history.push('/')
  };
  //DATOS FORMULARIO RQS
  //VARIABLE SOLICITUD
  //id_solicitud
  //id_cliente


  // id_tipo_solicitud = 
  // tipo_bien_contratado = Column(Integer) 
  // codigo_producto = Column(Integer)
  // orden_compra = Column(Integer)
  // descripcion = Column(String)
  // peticion_del_cliente = Column(String)
  // forma_respuesta = Column(String)
  // fecha_solicitud = Column(Date)
  // estado = Column(Integer)
  // // acciones_tomadas = Column(String)
  // // fecha_respuesta = Column(Date)
  const [estadoSolic, setEstadoSolic] = useState(0)
  const [tipoSolic, setTipoSolic] = useState()
  const [fechaSolic, setFechaSolic] = useState()//setear hoy
  const [formaRespSolic, setFormaRespSolic] = useState()
  const [tipoBienContratadoSolic, setTipoBienContratadoSolic] = useState()
  const [numeroPedidoSolic, setNumeroPedidoSolic] = useState(0)
  const [codigoProductoSolic, setCodigoProductoSolic] = useState()
  const [detalleSolic, setDetalleSolic] = useState()
  const [peticionClienteSolic, setPeticionClienteSolic] = useState()
  //Automaticos
  const [accionesTomadasSolic, setAccionesTomadasSolic] = useState()
  const [fechaRptaSolic, setFechaRptaSolic] = useState()
  


  //VARIABLES RQS
  //id_queja: autoincrement
  //id_cliente: autoincrement
  const [estadoQuej, setEstadoQuej] = useState(0)
  const [fechaQuej, setFechaQuej] = useState()//Seteamos hoy en useEffect[]
  const [formaRespQuej, setFormaRespQuej] = useState()
  const [tipoBienContratadoQuej, setTipoBienContratadoQuej] = useState()
  const [fechaCompraQuej, setFechaCompraQuej] = useState()
  const [numeroPedidoQuej, setNumeroPedidoQuej] = useState(0)
  const [codigoProductoQuej, setCodigoProductoQuej] = useState()
  const [detalleQuej, setDetalleQuej] = useState()
  const [peticionClienteQuej, setPeticionClienteQuej] = useState()
  //Variable No usadas en el post
  const [accionesTomadasQuej, setAccionesTomadasQuej] = useState("")//Campos nulos al inicio
  const [fechaLimitQuej, setFechaLimitQuej] = useState("En 5 dias")
  const [fechaRptaQuej, setFechaRptaQuej] = useState("")


  //Variable Comunes para cada RQS
  //RECLAMOS VARIABLES
  //id_reclamo: autoincrement
  //id_cliente: autoincrement
  //id_tipo_reclamo: Foreign Key
  const [tipoRecl, setTipoRecl] = useState()
  const [tipoBienContratadoRecl, setTipoBienContratadoRecl] = useState()
  const [numeroPedidoRec, setNumeroPedidoRec] = useState(0)//Orden de compra
  const [codigoProductoRec, setCodigoProductoRec] = useState()
  const [fechaCompraRecl, setFechaCompraRecl] = useState()
  const [formaRespRecl, setFormaRespRecl] = useState()
  const [fechaRecl, setFechaRecl] = useState()
  const [detalleRecl, setdetalleRecl] = useState()
  const [montoRecl, setMontoRecl] = useState()
  const [peticionClienteRecl, setPeticionClienteRecl] = useState()
  const [accionesTomadasRecl, setAccionesTomadasRecl] = useState("")//Campos nulos al inicio
  const [estadoRecl, setEstadoRecl] = useState(1)
  const [fechaRptaRecl, setFechaRptaRecl] = useState("")
  const [fechaLimitRecl, setFechaLimitRecl] = useState("En 5 dias")
  const [editAccionesTomadas, setEditAccionesTomadas] = useState()

  // VARIABLE TODOS LOS USUARIOS DE LA API
  const [users, setUsers] = useState([])

  //VARIABLES USUARIO
  const [element, setElement] = useState(-2)
  const [user, setUser] = useState(null)
  //GET Clientes
  const fetchClientes = async (setUser) => {
    try {
      const response = await apiClientes.get('/clientes');// Llamar API
      setUsers(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }
  const fetchCliente = async ({dni}) => {
    try {
      const response = await apiClientes.get(`/clientes/buscarPorDNI/${dni}`);// Llamar API
      setUser(response.data);
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }
  useEffect(() => {
    const fechaActual = new Date();
    const formatoFecha = format(fechaActual, 'yyyy-MM-dd');

    // Establecer la fecha formateada en el estado
    setFechaRecl(formatoFecha);
    setFechaQuej(formatoFecha)
    setFechaSolic(formatoFecha)

    fetchClientes(setUser);
  }, [])

  //FUNCIONES SELECCIONAR CLIENTE
  useEffect(() => {
    const userFound = users.find(user => (user.dni).toString() === element.toString())
    if(userFound === undefined) {
        setUser({
            id: -2,
            tipo_documento: "",
            numero_documento: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            numero_tel: "",
            email: "",
            direccion: "",
        })
    } else {
        setUser(userFound)
    }

  }, [element])


  // FUNCIONES API BACKEND (GET, POST, PUT)

  //Funciones GET para iniciallizar los arreglos
  // Funciones GET Reclamo
  //Get Reclamos
  const fetchReclamos = async (setReclamosClases) => {
    try {
      const response = await apiBack.get('/reclamos');// Llamar API
      setReclamosClases(response.data);
      
    } catch (err) {
      if (err.response) {
        // Not in the 200 response range 
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }
  useEffect(() => {

    fetchReclamos(setReclamosClases);
  }, [])
  
  useEffect(() => {
    console.log("Estamos cargando desde cero", reclamosClases)
  }, [reclamosClases])


  //Funciones POST para subir un RQS
  // Funcion Post de subir un Reclamos

  const handleSubmitReclamo = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Formatea la fecha en el formato deseado
    setEstadoRecl(0)
    const reclamoClaseFormatoNuevo = {id_cliente: user.dni,orden_compra: numeroPedidoRec,codigo_producto: codigoProductoRec,forma_respuesta: formaRespRecl,detalle_reclamo: detalleRecl,peticion_cliente: peticionClienteRecl,estado: estadoRecl,id_tipo_reclamo: tipoRecl,fecha_limite: fechaLimitRecl,tipo_bien_contratado: tipoBienContratadoRecl,fecha_compra: fechaCompraRecl,fecha_reclamo: fechaRecl,monto_reclamado: montoRecl,fecha_respuesta: fechaRptaRecl,acciones_tomadas: accionesTomadasRecl}
    try {
      openModal();
      const response = await apiBack.post('/reclamos', reclamoClaseFormatoNuevo);
      const allReclamos = [...reclamosClases, response.data];
      setReclamosClases(allReclamos);

      setFechaCompraRecl(null)
      setNumeroPedidoRec(null)
      setCodigoProductoRec(null)
      setdetalleRecl(null)
      setMontoRecl(null)
      setPeticionClienteRecl(null)
      
      setUser(null)
    } catch (err) {
      if (err.response) {
        console.log("Error de respuesta:", err.response.data);
        console.log("Código de estado HTTP:", err.response.status);
        console.log("Encabezados de respuesta:", err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      openModal();
      setErrorMessage('Error de procesamiento');
    } finally {
      setProcessing(false);
    }
  }

  const handleSubmitQueja = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Formatea la fecha en el formato deseado
    setEstadoQuej(0)
    const quejaClaseFormatoNuevo = {id_cliente: user.dni,orden_compra: numeroPedidoQuej,codigo_producto: codigoProductoQuej,forma_respuesta: formaRespQuej,detalle_queja: detalleQuej,peticion_cliente: peticionClienteQuej,estado: estadoQuej,fecha_limite: fechaLimitQuej,tipo_bien_contratado: tipoBienContratadoQuej,fecha_compra: fechaCompraQuej,fecha_queja: fechaQuej,fecha_respuesta: fechaRptaQuej,acciones_tomadas: accionesTomadasQuej}
    try {
      openModal();
      const response = await apiBack.post('/quejas',quejaClaseFormatoNuevo);
      setFechaCompraQuej(null)
      setNumeroPedidoQuej(null)
      setCodigoProductoQuej(null)
      setDetalleQuej(null)
      setPeticionClienteQuej(null)
      
      setUser(null)
    } catch (err) {
      if (err.response) {
        console.log("Error de respuesta:", err.response.data);
        console.log("Código de estado HTTP:", err.response.status);
        console.log("Encabezados de respuesta:", err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      openModal();
      setErrorMessage('Error de procesamiento');
    } finally {
      setProcessing(false);
    }
  }

  const handleSubmitSolicitud = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Formatea la fecha en el formato deseado
    setEstadoQuej(0)
    const solicitudClaseFormatoNuevo ={id_cliente :user.dni, id_tipo_solicitud :tipoSolic, tipo_bien_contratado :tipoBienContratadoSolic, codigo_producto :codigoProductoSolic, orden_compra :numeroPedidoSolic, detalle_solicitud :detalleSolic, peticion_cliente :peticionClienteSolic, forma_respuesta :formaRespSolic, fecha_solicitud :fechaSolic, estado :estadoSolic, acciones_tomadas :accionesTomadasSolic, fecha_respuesta :fechaRptaSolic}
    try {
      openModal();
      const response = await apiBack.post('/solicitudes',solicitudClaseFormatoNuevo);
      setNumeroPedidoSolic(null)
      setCodigoProductoSolic(null)
      setDetalleSolic(null)
      setPeticionClienteSolic(null)
      
      setUser(null)
    } catch (err) {
      if (err.response) {
        console.log("Error de respuesta:", err.response.data);
        console.log("Código de estado HTTP:", err.response.status);
        console.log("Encabezados de respuesta:", err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
      openModal();
      setErrorMessage('Error de procesamiento');
    } finally {
      setProcessing(false);
    }
  }

  const handleSubmitFormulario = (tipo, e) => {
    switch (tipo) {
      case 'Solicitud':
        handleSubmitSolicitud(e);
        break;
      case 'Reclamo':
        handleSubmitReclamo(e);
        break;
      case 'Queja':
        handleSubmitQueja(e);
        break;
      default:
        break;
    }
  };


  //Funciones PUT para modificar cada RQS
  return (
    <div className="App">
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className="sidebar"
        >
          <Logo />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer }}>
            <Button
              type='text'
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ?
                <MenuUnfoldOutlined /> :
                <MenuFoldOutlined />
              }

            />
            </Header>

            <Switch>
              <Route exact path="/">
                <Home  />
              </Route>
              <Route exact path="/formularioRQS">
                <FormRQS
                  modalVisible={modalVisible}
                  closeModal={closeModal}
                  processing={processing}
                  errorMessage={errorMessage}
                  user={user}
                  users={users}
                  setElement={setElement}
                  handleSubmitFormulario={handleSubmitFormulario} 
                  tipoRecl={tipoRecl}
                  setTipoRecl={setTipoRecl}
                  fechaRecl={fechaRecl}
                  setFechaRecl={setFechaRecl}
                  formaRespRecl={formaRespRecl}
                  setFormaRespRecl={setFormaRespRecl}
                  tipoBienContratadoRecl={tipoBienContratadoRecl}
                  setTipoBienContratadoRecl={setTipoBienContratadoRecl}
                  fechaCompraRecl={fechaCompraRecl}
                  setFechaCompraRecl={setFechaCompraRecl}
                  numeroPedidoRec={numeroPedidoRec}
                  setNumeroPedidoRec={setNumeroPedidoRec}
                  codigoProductoRec={codigoProductoRec}
                  setCodigoProductoRec={setCodigoProductoRec}
                  detalleRecl={detalleRecl}
                  setdetalleRecl={setdetalleRecl}
                  montoRecl={montoRecl}
                  setMontoRecl={setMontoRecl}
                  peticionClienteRecl={peticionClienteRecl}
                  setPeticionClienteRecl={setPeticionClienteRecl} 
                  fechaQuej={fechaQuej}//QUejas
                  setFormaRespQuej={setFormaRespQuej}
                  setTipoBienContratadoQuej={setTipoBienContratadoQuej}
                  fechaCompraQuej={fechaCompraQuej}
                  setFechaCompraQuej={setFechaCompraQuej}
                  numeroPedidoQuej={numeroPedidoQuej}
                  setNumeroPedidoQuej={setNumeroPedidoQuej}
                  codigoProductoQuej={codigoProductoQuej}
                  setCodigoProductoQuej={setCodigoProductoQuej}
                  detalleQuej={detalleQuej}
                  setDetalleQuej={setDetalleQuej}
                  peticionClienteQuej={peticionClienteQuej}
                  setPeticionClienteQuej={setPeticionClienteQuej}  //Fin Quejas  
                  estadoSolic={estadoSolic}//Solicitudes
                  setEstadoSolic={setEstadoSolic}
                  tipoSolic={tipoSolic}
                  setTipoSolic={setTipoSolic}
                  fechaSolic={fechaSolic}
                  setFechaSolic={setFechaSolic}
                  formaRespSolic={formaRespSolic}
                  setFormaRespSolic={setFormaRespSolic}
                  tipoBienContratadoSolic={tipoBienContratadoSolic}
                  setTipoBienContratadoSolic={setTipoBienContratadoSolic}
                  numeroPedidoSolic={numeroPedidoSolic}
                  setNumeroPedidoSolic={setNumeroPedidoSolic}
                  codigoProductoSolic={codigoProductoSolic}
                  setCodigoProductoSolic={setCodigoProductoSolic}
                  detalleSolic={detalleSolic}
                  setDetalleSolic={setDetalleSolic}
                  peticionClienteSolic={peticionClienteSolic}
                  setPeticionClienteSolic={setPeticionClienteSolic}                  
                />
              </Route>
              <Route exact path="/Reclamos">
                <TablaReclamo
                />
              </Route>
              <Route exact path="/Solicitudes">
                <TablaSolicitud
                />
              </Route>
              <Route exact path="/Quejas">
                <TablaQueja
                />
              </Route>
              <Route exact path="/Reclamo/:id">
                <DetalleReclamo
                />
              </Route>
              <Route exact path="/Queja/:id">
                <DetalleQueja
                />
              </Route>
              <Route exact path="/Solicitud/:id">
                <DetalleSolicitud
                />
              </Route>
              <Route exact path="/editarReclamo/:id">
                <EditarReclamo
                  editAccionesTomadas={editAccionesTomadas}
                  setEditAccionesTomadas={setEditAccionesTomadas}
                  modalVisible={modalVisible}
                  closeModal={closeModal}
                  processing={processing}
                  errorMessage={errorMessage}
                  openModal={openModal}
                  setProcessing={setProcessing}
                  setErrorMessage={setErrorMessage}
                />
              </Route>
              <Route exact path="/editarSolicitud/:id">
                <EditarSolicitud
                  editAccionesTomadas={editAccionesTomadas}
                  setEditAccionesTomadas={setEditAccionesTomadas}
                  modalVisible={modalVisible}
                  closeModal={closeModal}
                  processing={processing}
                  errorMessage={errorMessage}
                  openModal={openModal}
                  setProcessing={setProcessing}
                  setErrorMessage={setErrorMessage}               
                />
              </Route>
              <Route exact path="/editarQueja/:id">
                <EditarQueja
                  editAccionesTomadas={editAccionesTomadas}
                  setEditAccionesTomadas={setEditAccionesTomadas}
                  modalVisible={modalVisible}
                  closeModal={closeModal}
                  processing={processing}
                  errorMessage={errorMessage}
                  openModal={openModal}
                  setProcessing={setProcessing}
                  setErrorMessage={setErrorMessage} 
                />
              </Route>

              <Route exact path="/about" component={About} />
              <Route path="*" component={Missing} />
            </Switch>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;