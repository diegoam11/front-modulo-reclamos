const Button = ({ buttonText, tipoFormulario, setTipoFormulario }) => {
    return (
        <button
            className={buttonText === tipoFormulario ? "selected" : null}
            type="button"
            onClick={() => setTipoFormulario(buttonText)}
        >
            {buttonText}
        </button>
    )
}

export default Button