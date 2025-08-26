import { useState, useEffect } from 'react'
import './PageCadastrarPeca.css'

function PageCadastrarPeca() {
  const [pecaTrocadaField, setPecaTrocadaField] = useState("");
  const [quilometragemMaximaField, setQuilometragemMaximaField] = useState("");
  const [dataMaximaField, setDataMaximaField] = useState("");

  const [filtros, setFiltros] = useState({
    id: "",
    id_automovel: "",
    nome_peca: "",
    quilometragem_instalacao: "",
    quilometragem_maxima: ""
  })

  const [dadosTabela, setDadosTabela] = useState([]);

  const manutencoes = [
    { id: 1, id_automovel: "1", nome_peca: "Filtro de Ar", quilometragem_instalacao: "150000", quilometragem_maxima: "165000" },
    { id: 2, id_automovel: "1", nome_peca: "Óleo", quilometragem_instalacao: "150000", quilometragem_maxima: "160000" },
    { id: 3, id_automovel: "1", nome_peca: "Filtro de Óleo", quilometragem_instalacao: "150000", quilometragem_maxima: "160000" },
    { id: 4, id_automovel: "1", nome_peca: "Filtro de Combustível", quilometragem_instalacao: "150000", quilometragem_maxima: "170000" },
    { id: 5, id_automovel: "1", nome_peca: "Pastilhas de Freio", quilometragem_instalacao: "150000", quilometragem_maxima: "165000" },
    { id: 6, id_automovel: "1", nome_peca: "Pneus", quilometragem_instalacao: "150000", quilometragem_maxima: "180000" },
    { id: 7, id_automovel: "1", nome_peca: "Correia Dentada", quilometragem_instalacao: "150000", quilometragem_maxima: "210000" },
    { id: 8, id_automovel: "1", nome_peca: "Velas de Ignição", quilometragem_instalacao: "150000", quilometragem_maxima: "180000" },
    { id: 9, id_automovel: "1", nome_peca: "Amortecedores", quilometragem_instalacao: "150000", quilometragem_maxima: "210000" },
    { id: 10, id_automovel: "1", nome_peca: "Bateria", quilometragem_instalacao: "150000", quilometragem_maxima: "180000" }
  ];


  useEffect(() => {
    setDadosTabela(manutencoes)
  }, [])

  const filtrar = (e) => {
    let valorFiltrado = [...manutencoes];
    if (filtros.id) valorFiltrado = valorFiltrado.filter((p) => p.id == filtros.id);
    if (filtros.id_automovel) valorFiltrado = valorFiltrado.filter((p) => p.id_automovel == filtros.id_automovel);
    if (filtros.quilometragem_maxima) valorFiltrado = valorFiltrado.filter((p) => p.quilometragem_maxima == filtros.quilometragem_maxima);
    setDadosTabela(valorFiltrado)

  }

  return (
    <>
      <div className='telaManutencao'>
        <div className='adicionarManutenção'>
          <form>
            <fieldset>
              <legend> Adicionar Manutenção</legend>

              <div className='form-container'>
                <div className="form-group">
                  <label>Peça Trocada:</label>
                  <select
                    value={pecaTrocadaField}
                    onChange={(e) => setPecaTrocadaField(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    <option value="0">Filtro de Ar</option>
                    <option value="1">Óleo</option>
                    <option value="2">Filtro de Óleo</option>
                    <option value="3">Filtro de Combustível</option>
                    <option value="4">Pastilha de Freio</option>
                    <option value="5">Pneus</option>
                    <option value="6">Correia Dentada</option>
                    <option value="7">Velas de Ignição</option>
                    <option value="8">Amortecedores</option>
                    <option value="9">Bateria</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Quilometragem máxima de uso:</label>
                  <input
                    value={quilometragemMaximaField}
                    type="text"
                    placeholder="Quilometragem máxima de uso"
                    onChange={(e) => setQuilometragemMaximaField(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Data máxima de uso :</label>
                  <input
                    value={dataMaximaField}
                    type="text"
                    placeholder="Data máxima de uso"
                    onChange={(e) => setDataMaximaField(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button className='buttons'>Cadastrar Manutenção</button>
                </div>

              </div>
            </fieldset>
          </form>
        </div>
        <div className='buscarManutencao'>
          <div className='inputs'>

            <input type="text" className='input' placeholder='id' value={filtros.id} onChange={(e) => setFiltros({ ...filtros, id: e.target.value })} />

            <input type="text" className='input' placeholder='id_automovel' value={filtros.id_automovel} onChange={(e) => setFiltros({ ...filtros, id_automovel: e.target.value })} />

            <input type="text" className='input' placeholder='quilometragem_maxima' value={filtros.quilometragem_maxima} onChange={(e) => setFiltros({ ...filtros, quilometragem_maxima: e.target.value })} />

            <button className='buttons' onClick={filtrar}>Filtrar</button>

          </div>

          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>id_automovel</th>
                <th>nome_peca</th>
                <th>quilometragem_instalacao</th>
                <th>quilometragem_maxima</th>
              </tr>
            </thead>
            <tbody>
              {dadosTabela.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.id_automovel}</td>
                  <td>{row.nome_peca}</td>
                  <td>{row.quilometragem_instalacao}</td>
                  <td>{row.quilometragem_maxima}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default PageCadastrarPeca
