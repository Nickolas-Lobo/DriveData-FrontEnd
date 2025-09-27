import "./PageInicio.css"
import React from 'react'
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";


const PageInicio = () => {
  const [automoveis, setAutomoveis] = useState([]);
  const location = useLocation();
  const [idAutomovel, setIdAutomovel] = useState(null);
  const { idUsuario } = location.state || {};
  const [ultimasManutencoes, setUltimasManutencoes] = useState([]);
  const navigate = useNavigate();
  const renderedIds = new Set();

  function Kmsparaporcentagem(kmAtual, kmTroca, kmMaximo) {
    console.log(`KM Atual: ${kmAtual}, KM Troca: ${kmTroca}, KM Máximo: ${kmMaximo}`);
    const kmRodado = kmAtual - kmTroca
    const vidaUtil = kmMaximo - kmTroca
    let porcentagem = (kmRodado / vidaUtil) * 100
    if (porcentagem < 1) porcentagem = 3
    console.log(porcentagem)
    if (porcentagem <= 50) {
      return `linear-gradient(92deg, rgba(5,153,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`; // verde
    } else if (porcentagem > 50 && porcentagem < 85) {
      return `linear-gradient(92deg, rgba(255,120,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`; // laranja
    } else {
      return `linear-gradient(92deg, rgba(255,0,0,1) ${porcentagem}%, rgba(255,255,255,1) ${porcentagem}%)`; // vermelho
    }
  }

  const lista_imagens_icones = [
    <img src="modeloConversivel.png" alt="Imagem do carro" />,
    <img src="modeloCrossover.png" alt="Imagem do carro" />,
    <img src="modeloEsportivo.png" alt="Imagem do carro" />,
    <img src="modeloHatch.png" alt="Imagem do carro" />,
    <img src="modeloMivivan.png" alt="Imagem do carro" />,
    <img src="modeloPicape.png" alt="Imagem do carro" />,
    <img src="modeloSedan.png" alt="Imagem do carro" />,
    <img src="modeloSuv.png" alt="Imagem do carro" />,
  ]

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
              {lista_imagens_icones[automoveis.ID_Icone]}
            </div>
            <div className="veiculo">
              <div className="dadosVeiculo">
                <p>Modelo: {automoveis.nome_automovel}</p>
                <p>Quilometragem Atual: {automoveis.quilometragem}</p>
                <p>Última Peça Trocada: {ultimasManutencoes[0]?.Nome_peca}</p>
              </div>
              <div className="editarVeiculo"><MdEdit className="edit-icon" /></div>
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
                    <p>Vida util em KM:</p>
                    <div style={{ display: "flex" }}>
                      <div
                        className="vidaUtilData"
                        style={{
                          background: Kmsparaporcentagem(automoveis.quilometragem, manu.quilometragem_instalacao, manu.quilometragem_maxima),
                          width: "150px",
                          height: "10px",
                          marginTop: "-5px",
                          borderRadius: "8px"
                        }}
                      >
                      </div>
                    </div>
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