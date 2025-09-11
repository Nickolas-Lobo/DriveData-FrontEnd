import "./PageInicio.css"
import React from 'react'

const PageInicio = () => {
  return (
    <div className="backgroundInicio">
      <div className="linhaSuperior">
        <div className="containerHead">
          <div className="containerInfos">
            <div className="imagemVeiculo">
              <img src="" alt="Imagem do veículo" />
            </div>
            <div className="dadosVeiculo">
              <p>Modelo:</p>
              <span></span>
              <p>Quilometragem Atual:</p>
              <span></span>
              <p>Última Peça Trocada:</p>
              <span></span>
            </div>
          </div>
          <button className="btnAdicionarPeca">Adicionar Manutenção</button>
        </div>
      </div>

      <div className="linhaInferior">
        <div className="listaManutencoes">
          <div className="titulo">
            <h1>Minhas Manutenções</h1>
          </div>
          <div className="scrollWrapper">
            <div className="containerCards">
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
              <div className="itemManutencao">
                <p>Nome da Peça</p>
                <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" />
                </div>
                <p>Vida útil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInicio