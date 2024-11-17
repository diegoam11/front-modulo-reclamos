import axios from "axios";
//Arrancamos la api local mediante la consola con 
//npx json-server -p 3500 -w dataAPILocal-Prueba/db.json
export async function getReclamos () {
    try {
        const response = await axios({
            url: 'http://localhost:3500/datosReclamos',
            method: 'GET'
        })

        return response
    } catch (error) {
        console.log(error)
    }
}

export async function saveReclamo (reclamoData) {
    try {
        const formData = new FormData()

        formData.append('idRec', reclamoData.idReclamoDetalle)
        formData.append('catRec', reclamoData.catRec)
        formData.append('subcatRec', reclamoData.subcatRec)
        formData.append('descripcionRqs', reclamoData.descripcionRqs)
        formData.append('fechaRegistro', reclamoData.fechaRegistro)
        formData.append('idClienteNat', reclamoData.idClienteNat)
        formData.append('idClienteJur', reclamoData.idClienteJur)
        formData.append('idEmpleado', reclamoData.idEmpleado)
        formData.append('areaResponsable', reclamoData.areaResponsable)
        formData.append('fechaResoluRec', reclamoData.fechaResoluRec)
        formData.append('fechaVenciRec', reclamoData.fechaVenciRec)
        formData.append('idServRec', reclamoData.idServRec)
        formData.append('nombreServRec', reclamoData.nombreServRec)
        formData.append('idProducRec', reclamoData.idProducRec)
        formData.append('nombreProducRec', reclamoData.nombreProducRec)
        formData.append('estadoRec', reclamoData.estadoRec)
        formData.append('exigenciaRec', reclamoData.exigenciaRec)
        formData.append('prioridadRec', reclamoData.prioridadRec)
        formData.append('accionesRec', reclamoData.accionesRec)

        const response = await axios({
            url: 'http://localhost:3500/datosReclamos',
            method: 'POST',
            data: formData
        })

        return response
    } catch (error) {
        console.log(error.response.data)
    }
}