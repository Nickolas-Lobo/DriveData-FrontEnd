import { useState, useEffect } from 'react';
import './PageAtualizarCarro.css';
import { useNavigate, useLocation } from "react-router-dom";

const modelosCarros = [
  { nome: 'Conversível', imagem: 'modeloConversivel.png' },
  { nome: 'Crossover', imagem: 'modeloCrossover.png' },
  { nome: 'Esportivo', imagem: 'modeloEsportivo.png' },
  { nome: 'Hatch', imagem: 'modeloHatch.png' },
  { nome: 'Minivan', imagem: 'modeloMinivan.png' },
  { nome: 'Picape', imagem: 'modeloPicape.png' },
  { nome: 'Sedan', imagem: 'modeloSedan.png' },
  { nome: 'SUV', imagem: 'modeloSuv.png' },
];

const PageAtualizarCarro = () => {
  const navigate = useNavigate(); // 
  const location = useLocation();
  const { idUsuario } = location.state || {};
  
  const [apelido, setApelido] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [preview, setPreview] = useState(null);
  
  const [carroSelecionado, setCarroSelecionado] = useState([])
  
  const handleModeloChange = (e) => {
  const index = parseInt(e.target.value, 10);
  setModeloSelecionado(index);
  setPreview(!isNaN(index) ? modelosCarros[index].imagem : null);
};

  useEffect(() => {
      async function buscarAutomoveis() {
        fetch(`http://localhost:3000/automoveis/${idUsuario}`, {
          method: "GET",
          credentials: "include"
        })
          .then(resposta => {
            if (!resposta.ok) throw new Error("Erro ao carregar os automoveis");
            return resposta.json();
          })
          .then(dados => {
            setCarroSelecionado(dados);
          })
          .catch(err => console.log(err))
      }
      buscarAutomoveis()
    }, [])


  const adicionarCarro = async (e) => {
    e.preventDefault();

    const automovelAtualizado={
      ID_Autenticacao:idUsuario,
      nome_automovel:apelido,
      ID_Icone:parseInt(modeloSelecionado),
      quilometragem:parseFloat(quilometragem)
    }

    try{
      const resposta = await fetch("http://localhost:3000/automoveis", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(automovelAtualizado),
        credentials: "include", 
      });
      if (!resposta.ok) throw new Error("Erro ao adiconar veiculo");
      const data = await resposta.json();
      navigate("/pageInicio", { state: { idUsuario: idUsuario} });
      
    } catch(erro){
      console.log(erro);

    }

  };

  return (
    <div className="telaAdicionarVeiculo">
      <div className="painelAdicionar">
        <header className="cabecalho">
          <h2>Adicionar Veículo</h2>
          <p className="sub">Cadastre seu veículo rapidamente</p>
        </header>

        <form onSubmit={adicionarCarro} className="formAdicionarVeiculo" noValidate>
          <label className="field">
            <span className="labelText">Apelido do veículo</span>
            <input
              type="text"
              placeholder={carroSelecionado.nome_automovel}
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="labelText">Quilometragem (km)</span>
            <input
              type="number"
              placeholder={carroSelecionado.quilometragem}
              value={quilometragem}
              onChange={(e) => setQuilometragem(e.target.value)}
              min="0"
              required
            />
          </label>

          <label className="field">
            <span className="labelText">Modelo do veículo</span>
            <select
              value={modeloSelecionado}
              onChange={handleModeloChange}
              required
            >
              <option value="">Selecione um modelo</option>
              {modelosCarros.map((modelo,index) => (
                <option key={modelo.nome} value={index}>
                  {modelo.nome}
                </option>
              ))}
            </select>
          </label>

          {preview && (
            <div className="previewImagem">
              <p>Pré-visualização</p>
              <img src={preview} alt={`Imagem do ${modeloSelecionado}`} />
            </div>
          )}

          <div className="acoes">
            <button type="submit" className="btn primary">Atualizar</button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setApelido('');
                setQuilometragem('');
                setModeloSelecionado('');
                setPreview(null);
              }}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageAtualizarCarro;
