import { useState } from 'react';
import './PageAdicionarCarro.css';

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

const PageAdicionarCarro = () => {
  const [apelido, setApelido] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [modeloSelecionado, setModeloSelecionado] = useState('');
  const [preview, setPreview] = useState(null);

  const handleModeloChange = (e) => {
    const nome = e.target.value;
    setModeloSelecionado(nome);
    const modelo = modelosCarros.find((m) => m.nome === nome);
    setPreview(modelo ? modelo.imagem : null);
  };

  const adicionarCarro = (e) => {
    e.preventDefault();

    if (!apelido.trim()) {
      alert('Informe um apelido para o veículo.');
      return;
    }
    if (!quilometragem || Number(quilometragem) < 0) {
      alert('Informe uma quilometragem válida.');
      return;
    }
    if (!modeloSelecionado) {
      alert('Selecione um modelo de veículo.');
      return;
    }

    console.log('Veículo adicionado:', {
      apelido,
      quilometragem,
      modelo: modeloSelecionado,
      imagem: preview || 'Nenhuma imagem selecionada',
    });

    setApelido('');
    setQuilometragem('');
    setModeloSelecionado('');
    setPreview(null);
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
              placeholder="Ex: Honda Civic"
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span className="labelText">Quilometragem (km)</span>
            <input
              type="number"
              placeholder="Ex: 120000"
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
              {modelosCarros.map((modelo) => (
                <option key={modelo.nome} value={modelo.nome}>
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
            <button type="submit" className="btn primary">Cadastrar</button>
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

export default PageAdicionarCarro;
