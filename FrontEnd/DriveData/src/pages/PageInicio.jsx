import "./PageInicio.css"
import React from 'react'

const PageInicio = () => {
  return (
    <div className="backgroundInicio">
      <div className="containerHead">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>Modelo:</p>
          <span></span>
          <p>Quilometragem Atual:</p>
          <span></span>
          <p>Ultima Peça Trocada:</p>
          <span></span>
        </div>
      </div>
      <button className="btnAdicionarPeca">Adicionar Manutenção</button>

      <div className="listaManutencoes">
        <div className="titulo">
          <h1>Minhas Manutenções</h1>
        </div>
        <div className="">
          <p>Nome_peca</p>
          <p>Vida util</p>
        </div>
      </div>
    </div>
  )
}

export default PageInicio