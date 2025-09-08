import "./PageInicio.css"
import React from 'react'

const PageInicio = () => {
  return (
    <div className="backgroundInicio">
        <div className="containerHead">
            <h1>Modelo:</h1>
            <span></span>
            <h1>Kilometragem Atual:</h1>
            <span></span>
            <h1>Ultima Peça Trocada:</h1>
            <span></span>
        </div>
        <button className="btnAdicionarPeca">Adicionar Peça</button>
        
        <div className="listaPecas">

        </div>
    </div>
  )
}

export default PageInicio