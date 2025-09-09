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

  useEffect(()=>{
    async function pegarManutencoes(){
      fetch("http://localhost:3000/",{
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
  },[])


  const filtrar = (e) => {
    e.preventDefault();
    let valorFiltrado = [...manutencoes];
    if (filtros.id) valorFiltrado = valorFiltrado.filter((p) => p.id == filtros.id);
    if (filtros.id_automovel) valorFiltrado = valorFiltrado.filter((p) => p.id_automovel == filtros.id_automovel);
    if (filtros.quilometragem_maxima) valorFiltrado = valorFiltrado.filter((p) => p.quilometragem_maxima == filtros.quilometragem_maxima);
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
                <div className="form-group">
                  <label>Peça Trocada:</label>
                  <select
                    className="select"
                    value={pecaTrocadaField}
                    onChange={(e) => setPecaTrocadaField(e.target.value)}
                  >
                    <option value="">Selecione uma peça</option> {/* Opcional: opção padrão */}
                    {pecas.map((peca,indx) => (
                      <option key={indx} value={peca.id}>
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

            <input type="text" className='input' placeholder='id' value={filtros.id} onChange={(e) => setFiltros({ ...filtros, id: e.target.value })} />

            <input type="text" className='input' placeholder='automovel' value={filtros.id_automovel} onChange={(e) => setFiltros({ ...filtros, id_automovel: e.target.value })} />

            <input type="text" className='input' placeholder='quilometragem_maxima' value={filtros.quilometragem_maxima} onChange={(e) => setFiltros({ ...filtros, quilometragem_maxima: e.target.value })} />

            <button className='buttons' id='filtrar' onClick={filtrar}>Filtrar</button>

          </div>

          <table>
            <thead>
              <tr>
                <th>automovel</th>
                <th>nome da peca</th>
                <th>quilometragem instalacao</th>
                <th>quilometragem maxima</th>
              </tr>
            </thead>
            <tbody>
              {dadosTabela.map((row, index) => (
                <tr key={index}>
                  <td>{row.Nome_automovel}</td>
                  <td>{row.Nome_peca}</td>
                  <td>{row.quilometragem_instalacao}</td>
                  <td>{row.quilometragem_maxima}</td>
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
