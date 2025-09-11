import "./ButtonEntrar.css"

const Button = ({onClick}) => {
  return (
    <button onClick={onClick} id="btnEntrar">
        Entrar
    </button>
  )
}

export default Button