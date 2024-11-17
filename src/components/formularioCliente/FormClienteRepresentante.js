import InputSelect from "../../InputSelect"

const FormClienteNatural = ({ userRepresentante, setUserRepresentante,  setTipoDeDocumentoClienteRepresentante}) => {
    return (
        <>
            <h2>Cliente representante</h2>
                <label>
                    Apellido Paterno:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.apellidoPaterno}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                apellidoPaterno: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Apellido Materno:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.apellidoMaterno}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                apellidoMaterno: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Nombre:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.nombre}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                nombre: e.target.value
                                }
                            )
                        }
                    />
                <label htmlFor="">Tipo de documento</label>
                <InputSelect
                        setElement={setTipoDeDocumentoClienteRepresentante}
                        elements={ 
                            [{ label: 'DNI', value: 'DNI' },
                            { label: 'CE', value: 'CE' }]   
                        }
                />                        
                <label>
                    Numero de Documento:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.numero_documento}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                numero_documento: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Numero de Telefono:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.numero_tel}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                numero_tel: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Direccion:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.direccion}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                direccion: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Email:
                </label>
                    <input 
                        type="text" 
                        value={userRepresentante.email}
                        onChange={(e) => 
                            setUserRepresentante({
                                ...userRepresentante, 
                                email: e.target.value
                                }
                            )
                        }
                    />
        </>
    )
}

export default FormClienteNatural