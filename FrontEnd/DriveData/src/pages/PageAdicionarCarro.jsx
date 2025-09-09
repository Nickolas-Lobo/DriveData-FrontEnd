import { useState, useRef, useEffect } from 'react';
import './PageAdicionarCarro.css';

const PageAdicionarCarro = () => {
  const [nomeVeiculo, setNomeVeiculo] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImagemChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImagem(file || null);

    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const adicionarCarro = (e) => {
    e.preventDefault();

    if (!nomeVeiculo.trim()) {
      alert('Informe o nome do veículo.');
      return;
    }
    if (!quilometragem || Number(quilometragem) < 0) {
      alert('Informe uma quilometragem válida.');
      return;
    }

    console.log('Veículo adicionado:', {
      nomeVeiculo,
      quilometragem,
      imagem: imagem ? imagem.name : 'Nenhuma imagem selecionada',
    });

    setNomeVeiculo('');
    setQuilometragem('');
    setImagem(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="telaAdicionarVeiculo">
      <div className="cardAdicionar">
        <header className="cardHeader">
          <h2>Adicionar Veículo</h2>
          <p className="sub">Cadastre seu veículo rapidamente</p>
        </header>

        <form onSubmit={adicionarCarro} className="formAdicionarVeiculo" noValidate>
          <label className="field">
            <span className="labelText">Nome do veículo</span>
            <input
              type="text"
              placeholder="Ex: Honda Civic"
              value={nomeVeiculo}
              onChange={(e) => setNomeVeiculo(e.target.value)}
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
            <span className="labelText">Foto do veículo</span>
            <label htmlFor="fotoVeiculo" className="btn uploadBtn">Selecionar foto</label>
            <input
              id="fotoVeiculo"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImagemChange}
              aria-label="Enviar foto do veículo"
              hidden
            />
          </label>


          {preview && (
            <div className="previewImagem">
              <p>Pré-visualização</p>
              <img src={preview} alt="Pré-visualização do veículo" />
            </div>
          )}

          <div className="actions">
            <button type="submit" className="btn primary">Cadastrar</button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setNomeVeiculo('');
                setQuilometragem('');
                setImagem(null);
                if (preview) {
                  URL.revokeObjectURL(preview);
                  setPreview(null);
                }
                if (fileInputRef.current) fileInputRef.current.value = '';
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
