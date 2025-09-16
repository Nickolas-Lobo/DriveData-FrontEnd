import "./PageInicio.css"
import React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const PageInicio = () => {
  const [ultimasPecasAdd, setUltimasPecasAdd] = useState([])
  const [automoveis, setAutomoveis] = useState([]);
  const location = useLocation();
  const [idAutomovel, setIdAutomovel] = useState(null);
  const { idUsuario } = location.state || {};
  const [ultimasManutencoes, setUltimasManutencoes] = useState([]);
  const navigate = useNavigate();
  const renderedIds = new Set();


  function Kmsparaporcentagem(kmAtual,kmMaximo){
    let porcentagem
    porcentagem=parseFloat((kmAtual/kmMaximo)*100)
    console.log(porcentagem)
    if (porcentagem<=40){
      return`linear-gradient(92deg, rgba(5,153,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`
    }else if(porcentagem>40&&porcentagem<70){
      return`linear-gradient(92deg, rgba(255,120,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`
    }else{
      return`linear-gradient(92deg, rgba(255,0,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`
    }
  }


  const lista_imagem_pecas = [
    <img src="Fluído_de_motor.png" alt="Imagem da peca" />,
    <img src="Fluído_de_freio.png" alt="Imagem da peca" />,
    <img src="Fluído_de_direção.png" alt="Imagem da peca" />,
    <img src="filtro_de_ar.png" alt="Imagem da peca" />,
    <img src="Filtro_de_oleo.png" alt="Imagem da peca" />,
    <img src="Filtro_de_combustivel.png" alt="Imagem da peca" />,
    <img src="Filtro_de_cabine.png" alt="Imagem da peca" />,
    <img src="pneus.png" alt="Imagem da peca" />,
    <img src="Pastilhas_de_freio.png" alt="Imagem da peca" />,
    <img src="disco_de_freio.png" alt="Imagem da peca" />,
    <img src="bateria.png" alt="Imagem da peca" />,
    <img src="Correia_dentada.png" alt="Imagem da peca" />,
    <img src="vela_ignição.png" alt="Imagem da peca" />,
    <img src="amortecedor.png" alt="Imagem da peca" />,
    <img src="Corrente_de_comando.png" alt="Imagem da peca" />,
  ]

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
          <button className="btnAdicionarPeca" onClick={() => navigate("/pageCadastrarManutencao", { state: { idUsuario: idUsuario } })}>Adicionar Manutenção</button>
        </div>
      </div>

      <div className="linhaInferior">
        <div className="listaManutencoes">
          <div className="titulo">
            <h1>Minhas Manutenções</h1>
          </div>
          <div className="scrollWrapper">
            <div className="containerCards">

              {ultimasManutencoes.map((manu, index) => {
                if (renderedIds.has(manu.ID_pecas)) {
                  return null; // já renderizado, pula
                }
                renderedIds.add(manu.ID_pecas); // marca como renderizado

                return (
                  <div key={index} className="itemManutencao">
                    <p>{manu.Nome_peca}</p>
                    <div className="imagemPeca">
                      {lista_imagem_pecas[manu.ID_pecas - 1]}
                    </div>
                    <div
                      className="vidaUtilData"
                      style={{
                        background:Kmsparaporcentagem(automoveis.quilometragem,manu.quilometragem_maxima),
                        width: "150px",
                        height: "20px",
                        marginBottom: "5px",
                        borderRadius: "8px"
                      }}
                    ></div> 
                    <div
                      className="vidaUtilKM"
                      style={{
                        background: `linear-gradient(92deg, rgba(5,153,0,1) ${20}%, rgba(255,255,255,1) ${20}%)`,
                        width: "150px",
                        height: "20px",
                        borderRadius: "8px"
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageInicio