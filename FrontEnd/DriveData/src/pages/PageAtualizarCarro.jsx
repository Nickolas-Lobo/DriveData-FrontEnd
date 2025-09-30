import { useState, useEffect } from 'react';
import './PageAtualizarCarro.css';
import { RiArrowGoBackLine } from "react-icons/ri";
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


  const atualizarCarro = async (e) => {
  e.preventDefault();

  // 🔎 Validações
  if (!apelido.trim()) {
    alert("O apelido do veículo não pode estar em branco!");
    return;
  }

  if (!quilometragem || isNaN(quilometragem) || parseFloat(quilometragem) < 0) {
    alert("Informe uma quilometragem válida (maior que 0)!");
    return;
  }

  if (modeloSelecionado === "" || isNaN(parseInt(modeloSelecionado))) {
    alert("Selecione um modelo de veículo!");
    return;
  }

  const automovelAtualizado = {
    ID:carroSelecionado.ID,
    ID_Autenticacao: idUsuario,
    nome_automovel: apelido.trim(),
    ID_Icone: parseInt(modeloSelecionado),
    quilometragem: parseFloat(quilometragem)
  };

  try {
    const resposta = await fetch(`http://localhost:3000/automoveis`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(automovelAtualizado),
      credentials: "include",
    });

    if (!resposta.ok) throw new Error("Erro ao atualizar veículo");

    await resposta.json();

    alert("Veículo atualizado com sucesso!");
    navigate("/pageInicio", { state: { idUsuario: idUsuario } });

  } catch (erro) {
    console.log(erro);
    alert("Erro ao atualizar veículo, tente novamente.");
  }
};




  return (
    <div className="telaAtualizarVeiculo">
      
      <div className="painelAtualizar">
        <RiArrowGoBackLine className="toDoBack-icon" onClick={() => navigate("/pageInicio",{ state: { idUsuario: idUsuario } })}/>
        <br />
        <header className="cabecalho">
          <h2>Atualizar Veículo</h2>
          <p className="sub">Atualize seu veículo rapidamente</p>
        </header>

        <form onSubmit={atualizarCarro} className="formAdicionarVeiculo" noValidate>
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
