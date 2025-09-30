import "./PageInicio.css"
import React from 'react'
import { useState, useEffect } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { RiLogoutBoxRFill } from "react-icons/ri";

const PageInicio = () => {
  const [automoveis, setAutomoveis] = useState([]);
  const location = useLocation();
  const [idAutomovel, setIdAutomovel] = useState(null);
  const { idUsuario } = location.state || {};
  const [ultimasManutencoes, setUltimasManutencoes] = useState([]);
  const navigate = useNavigate();
  const renderedIds = new Set();

  function parseData(dataStr) {
    if (!dataStr) return null;
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(`${ano}-${mes}-${dia}T00:00:00`);
  }


  function porcentagemPorData(dataInstalacao, dataMaxima) {
    const hoje = new Date();
    
    const inicio = parseData(dataInstalacao);
    const fim = parseData(dataMaxima);

    if (!inicio || !fim || isNaN(inicio) || isNaN(fim)) {
      return 'linear-gradient(92deg, rgba(200,200,200,0.5) 100%, rgba(255,255,255,1) 100%)';
    }

    const vidaUtilDias = (fim - inicio) / (1000 * 60 * 60 * 24);
    const diasPassados = (hoje - inicio) / (1000 * 60 * 60 * 24);

    let porcentagem = (diasPassados / vidaUtilDias) * 100;

    if (porcentagem < 1) porcentagem = 3;
    if (porcentagem > 100) porcentagem = 100;
    return porcentagem
  }

  function Kmsparaporcentagem(kmAtual, kmTroca, kmMaximo) {
    const kmRodado = kmAtual - kmTroca
    const vidaUtil = kmMaximo - kmTroca
    let porcentagem = (kmRodado / vidaUtil) * 100
    if (porcentagem < 1) porcentagem = 3
    if (porcentagem > 100) porcentagem = 100
    return porcentagem
  }

  function barraVidaUtil(porcentagemKM,porcentagemData){
    if (porcentagemData>porcentagemKM){
      if (porcentagemData <= 50) {
        return `linear-gradient(92deg, rgba(5,153,0,1) ${porcentagemData}%, rgba(255,255,255,1) ${porcentagemData}%)`; // verde
      } else if (porcentagemData > 50 && porcentagemData < 85) {
        return `linear-gradient(92deg, rgba(255,120,0,1) ${porcentagemData}%, rgba(255,255,255,1) ${porcentagemData}%)`; // laranja
      } else {
        return `linear-gradient(92deg, rgba(255,0,0,1) ${porcentagemData}%, rgba(255,255,255,1) ${porcentagemData}%)`; // vermelho
      }
    }else{
      if (porcentagemKM <= 50) {
        return `linear-gradient(92deg, rgba(5,153,0,1) ${porcentagemKM}%, rgba(255,255,255,1) ${porcentagemKM}%)`; // verde
      } else if (porcentagemKM > 50 && porcentagemKM < 85) {
        return `linear-gradient(92deg, rgba(255,120,0,1) ${porcentagemKM}%, rgba(255,255,255,1) ${porcentagemKM}%)`; // laranja
      } else {
        return `linear-gradient(92deg, rgba(255,0,0,1) ${porcentagemKM}%, rgba(255,255,255,1) ${porcentagemKM}%)`; // vermelho
      }
    }
  }

  function VerificarDataOuKM(porcentagemData,porcentagemKM){
    if (porcentagemData>porcentagemKM){
      return "Data"
    }else {
      return "KM"
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

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include", // envia cookie da sessão
      });

      if (!res.ok) throw new Error("Erro ao fazer logout");

      const data = await res.json();
      alert(data.mensagem);

      // Redireciona para a tela de login
      window.location.href = "/";
    } catch (err) {
      console.error("Erro no logout:", err);
    }
  };

  return (
    <div className="backgroundInicio">
      <div className="linhaSuperior">
        <div className="containerHead">
          <div className="containerInfos">
            <div className="imagemVeiculo">
              {lista_imagens_icones[automoveis.ID_Icone]}
            </div>
            <div className="dadosVeiculo">
              <p>Modelo: {automoveis.nome_automovel}</p>
              <p>Quilometragem Atual: {automoveis.quilometragem}</p>
              <p>Última Peça Trocada: {ultimasManutencoes[0]?.Nome_peca}</p>
            </div>
            <div className="botoesVeiculo">
                <MdEdit className="edit-icon" onClick={() => navigate("/pageAtualizarCarro", { state: { idUsuario: idUsuario } })}/>
                <RiLogoutBoxRFill className="logout-icon" onClick={handleLogout} />
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
                    <p>Vida util em {VerificarDataOuKM(porcentagemPorData(manu.data_instalacao,manu.data_maxima),Kmsparaporcentagem(automoveis.quilometragem,manu.quilometragem_instalacao,manu.quilometragem_maxima))}:</p>
                    <div style={{ display: "flex" }}>
                      <div
                        className="vidaUtilData"
                        style={{
                          background: barraVidaUtil(porcentagemPorData(manu.data_instalacao,manu.data_maxima),Kmsparaporcentagem(automoveis.quilometragem,manu.quilometragem_instalacao,manu.quilometragem_maxima)),
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