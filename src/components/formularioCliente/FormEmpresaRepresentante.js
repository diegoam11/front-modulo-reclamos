
const FormClienteEmpresaRepresentante = ({ empresa, setEmpresa }) => {
    return (
        <>
            <h2>Empresa</h2>
                <label>
                    RUC:
                </label>
                    <input 
                        type="text" 
                        value={empresa.ruc}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                ruc: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Razon Social:
                </label>
                    <input 
                        type="text" 
                        value={empresa.razon_social}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                razon_social: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Direccion Sede:
                </label>
                    <input 
                        type="text" 
                        value={empresa.direccion_sede}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                direccion_sede: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Telefono principal:
                </label>
                    <input
                        type="text"
                        value={empresa.telefono_principal}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                telefono_principal: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Telefono secundario:
                </label>
                    <input
                        type="text"
                        value={empresa.telefono_secundario}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                telefono_secundario: e.target.value
                                }
                            )
                        }
                    />
                <label>
                    Email:
                </label>
                    <input
                        type="text"
                        value={empresa.email}
                        onChange={(e) => 
                            setEmpresa({
                                ...empresa, 
                                email: e.target.value
                                }
                            )
                        }
                    />
        </>
    )
}

export default FormClienteEmpresaRepresentante