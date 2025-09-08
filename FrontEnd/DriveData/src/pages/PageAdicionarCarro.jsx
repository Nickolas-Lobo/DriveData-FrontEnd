import { useState } from 'react';
import './PageAdicionarCarro.css';

const PageAdicionarCarro = () => {
  const [nomeVeiculo, setNomeVeiculo] = useState('');
  const [quilometragem, setQuilometragem] = useState('');

  const adicionarCarro = (e) => {
    e.preventDefault();
    console.log("Veículo adicionado:", { nomeVeiculo, quilometragem });
  }

  return (
    <div className='telaAdicionarVeiculo'>
      <h2>Adicionar Veículo</h2>
      <form onSubmit={adicionarCarro} className="formAdicionarVeiculo">
        <input 
          type="text" 
          placeholder="Nome do veículo" 
          value={nomeVeiculo} 
          onChange={(e) => setNomeVeiculo(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Quilometragem" 
          value={quilometragem} 
          onChange={(e) => setQuilometragem(e.target.value)} 
          required 
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default PageAdicionarCarro;
