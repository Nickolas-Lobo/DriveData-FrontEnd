import { useState, useEffect } from 'react'
import './PageCadastrarPeca.css'
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";



function PageCadastrarPeca() {
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("");
  const [pecaTrocadaField, setPecaTrocadaField] = useState("");
  const [quilometragemMaximaField, setQuilometragemMaximaField] = useState("");
  const [dataMaximaField, setDataMaximaField] = useState("");

  const [filtros, setFiltros] = useState({
    id: "",
    nome_automovel: "",
    nome_peca: "",
    quilometragem_instalacao: "",
    quilometragem_maxima: "",
    data_maxima: ""
  })

  const [dadosTabela, setDadosTabela] = useState([]);

  const [manutencoes, setManutencoes] = useState([]);

  const [pecas, setPecas] = useState([])

  useEffect(() => {
    async function buscarPecas() {
      fetch("http://localhost:3000/pecas", {
        method: "GET"
      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar as peças");
          return resposta.json();
        })
        .then(dados => {
          setPecas(dados)
          console.log(dados); // para debug
        })
        .catch(err => console.log(err))
    }
    buscarPecas()
  }, [])

  useEffect(() => {
    async function pegarManutencoes() {
      fetch("http://localhost:3000/", {
        method: "GET"
      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar as peças");
          return resposta.json();
        })
        .then(dados => {
          setManutencoes(dados)
          console.log(dados); // para debug
        })
        .catch(err => console.log(err))
    }
    pegarManutencoes()
  }, [])


  const filtrar = (e) => {
    e.preventDefault();
    let valorFiltrado = [...manutencoes];
    if (filtros.nome_peca) valorFiltrado = valorFiltrado.filter((p) => p.Nome_peca == filtros.nome_peca);
    if (filtros.nome_automovel) valorFiltrado = valorFiltrado.filter((p) => p.Nome_automovel == filtros.nome_automovel);
    if (filtros.quilometragem_maxima) valorFiltrado = valorFiltrado.filter((p) => p.quilometragem_maxima == filtros.quilometragem_maxima);
    if (filtros.data_maxima) valorFiltrado.filter((p) => p.data_maxima == filtros.data_maxima)
    setDadosTabela(valorFiltrado)
  }

  return (
    <div className='containerPageAdd'>
      <div className='telaManutencao'>
        <div className='adicionarManutenção'>
          <form>
            <fieldset>
              <legend> Adicionar Manutenção</legend>

              <div className='form-container'>
                <div className='form-group'>
                  <label>Veículo:</label>
                  <select className="select" value={veiculoSelecionado} onChange={(e) => setVeiculoSelecionado(e.target.value)}>
                    <option value="">Selecione o seu veículo</option>
                    {/* {veiculos.map((veiculo, index) => (
                      <option key={index} value={veiculo.id}>
                        {veiculo.nome}
                      </option>
                    ))} */}
                  </select>
                </div>
                <div className="form-group">
                  <label>Peça Trocada:</label>
                  <select
                    className="select"
                    value={pecaTrocadaField}
                    onChange={(e) => setPecaTrocadaField(e.target.value)}
                  >
                    <option value="">Selecione uma peça</option> {/* Opcional: opção padrão */}
                    {pecas.map((peca, index) => (
                      <option key={index} value={peca.id}>
                        {peca.nome_peca}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Quilometragem máxima:</label>
                  <input
                    className="input"
                    value={quilometragemMaximaField}
                    type="text"
                    placeholder="Quilometragem máxima"
                    onChange={(e) => setQuilometragemMaximaField(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Data máxima de uso :</label>
                  <input
                    className="input"
                    value={dataMaximaField}
                    type="text"
                    placeholder="Data máxima de uso"
                    onChange={(e) => setDataMaximaField(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button className='buttonCadastrar'>Cadastrar Manutenção</button>
                </div>

              </div>
            </fieldset>
          </form>
        </div>

        <div className='buscarManutencao'>
          <div className='inputs'>

            <input type="text" className='input' placeholder='Nome do Automóvel' value={filtros.nome_automovel} onChange={(e) => setFiltros({ ...filtros, nome_automovel: e.target.value })} />

            <input type="text" className='input' placeholder='Nome da Peça' value={filtros.nome_peca} onChange={(e) => setFiltros({ ...filtros, nome_peca: e.target.value })} />

            <input type="text" className='input' placeholder='Quilometragem Máxima' value={filtros.quilometragem_maxima} onChange={(e) => setFiltros({ ...filtros, quilometragem_maxima: e.target.value })} />

            <button className='buttons' id='filtrar' onClick={filtrar}>Filtrar</button>

          </div>

          <table>
            <thead>
              <tr>
                <th>Nome do Automóvel</th>
                <th>Nome da Peça</th>
                <th>Quilometragem da Instalacao</th>
                <th>Quilometragem Máxima</th>
                <th>Data Máxima</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dadosTabela.length === 0 ? manutencoes.map((row, index) => (
                <tr key={index}>
                  <td>{row.Nome_automovel}</td>
                  <td>{row.Nome_peca}</td>
                  <td>{row.quilometragem_instalacao}</td>
                  <td>{row.quilometragem_maxima}</td>
                  <td>{row.data_maxima}</td>
                  <td className="icons">
                    <MdDelete className="delete-icon" />
                    <GrUpdate className="update-icon" />
                  </td>
                </tr>
              )) : dadosTabela.map((row, index) => (
                <tr key={index}>
                  <td>{row.Nome_automovel}</td>
                  <td>{row.Nome_peca}</td>
                  <td>{row.quilometragem_instalacao}</td>
                  <td>{row.quilometragem_maxima}</td>
                  <td>{row.data_maxima}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PageCadastrarPeca
