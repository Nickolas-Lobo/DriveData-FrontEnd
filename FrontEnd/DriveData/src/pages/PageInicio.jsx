import "./PageInicio.css"
import React from 'react'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";



const PageInicio = () => {
  const [automoveis, setAutomoveis] = useState([]);
  const location = useLocation();
  const [idAutomovel, setIdAutomovel] = useState(null);
  const { idUsuario } = location.state || {};
  const [ultimasManutencoes, setUltimasManutencoes] = useState([]);


  useEffect(() => {
    async function buscarAutomoveis() {
      fetch(`http://localhost:3000/automoveis/${idUsuario}`, {
        method: "GET",
        credentials: "include",

      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar os automoveis");
          return resposta.json();
        })
        .then(dados => {
          setAutomoveis(dados);
          setIdAutomovel(dados.ID)
        })
        .catch(err => console.log(err))
    }
    buscarAutomoveis()
  }, [])

  useEffect(() => {
    async function pegarUltimasManutencoes() {
      fetch(`http://localhost:3000/manutencoes/${idAutomovel}`, {
        method: "GET",
        credentials: "include",

      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar as peças");
          return resposta.json();
        })
        .then(dados => {
          setUltimasManutencoes(dados)

        })
        .catch(err => console.log(err))
    }
    pegarUltimasManutencoes()
  }, [idAutomovel])

  return (
    <div className="backgroundInicio">
      <div className="linhaSuperior">
        <div className="containerHead">
          <div className="containerInfos">
            <div className="imagemVeiculo">
              <img src="" alt="Imagem do veículo" />
            </div>
            <div className="dadosVeiculo">
              <p>Modelo: {automoveis.nome_automovel}</p>
              <p>Quilometragem Atual: {automoveis.quilometragem}</p>
              <p>Última Peça Trocada: {ultimasManutencoes[0]?.Nome_peca}</p>

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
              {ultimasManutencoes.map((manu,index) => {
                return(<div key={index} className="itemManutencao">

                  <p>{manu.Nome_peca}</p>

                  <div className="imagemPeca">
                  <img src="" alt="Imagem da peca" /> 
                  </div>

                  <p>Vida útil</p>

                </div>)
              })

              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInicio