import { useState, useEffect } from 'react'
import './PageCadastrarPeca.css'
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useLocation } from "react-router-dom";


const now = new Date();
const dataFormatada = now.toLocaleDateString('pt-BR')

function PageCadastrarPeca() {
  const [automovelSelecionado, setAutomovelSelecionado] = useState("");
  const [pecaTrocadaField, setPecaTrocadaField] = useState("");
  const [quilometragemMaximaField, setQuilometragemMaximaField] = useState("");
  const [dataMaximaField, setDataMaximaField] = useState("");
  const [dataInstalacao, setDataInstalacao] = useState(dataFormatada)
  const location = useLocation();
  const { idUsuario } = location.state || {};

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

  const [pecas, setPecas] = useState([]);

  const [automoveis, setAutomoveis] = useState([]);

  const [idAutomovel, setIdAutomovel] = useState([]);


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
    async function buscarPecas() {
      fetch("http://localhost:3000/pecas", {
        method: "GET",
        credentials: "include", 

      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar as peças");
          return resposta.json();
        })
        .then(dados => {
          setPecas(dados)
        })
        .catch(err => console.log(err))
    }
    buscarPecas()
  }, [])

  useEffect(() => {
    async function pegarManutencoes() {
      fetch(`http://localhost:3000/manutencoes/${idAutomovel}`, {
        method: "GET",
        credentials: "include", 

      })
        .then(resposta => {
          if (!resposta.ok) throw new Error("Erro ao carregar as peças");
          return resposta.json();
        })
        .then(dados => {
          setManutencoes(dados)

        })
        .catch(err => console.log(err))
    }
    pegarManutencoes()
  }, [idAutomovel])

  const criarManutencao = async (e) => {
    e.preventDefault();
  
    function formatarDataParaBD(dataBR) {
      const [dia, mes, ano] = dataBR.split("/");
      return `${ano}-${mes}-${dia}`;
    }
  
    function adicionarMeses(dataStr, meses) {
      const [dia, mes, ano] = dataStr.split("/").map(Number);
      const data = new Date(ano, mes - 1, dia);
      data.setMonth(data.getMonth() + Number(meses));
      
      const anoBD = data.getFullYear();
      const mesBD = String(data.getMonth() + 1).padStart(2, "0");
      const diaBD = String(data.getDate()).padStart(2, "0");
      
      return `${anoBD}-${mesBD}-${diaBD}`;
    }
  
    function formatarDataParaTela(dataBD) {
      const [ano, mes, dia] = dataBD.split("-");
      return `${dia}/${mes}/${ano}`;
    }
  
    const novamanutencao = {
      ID_automovel: Number(automoveis.ID),
      Nome_automovel: automoveis.nome_automovel,
      quilometragem_instalacao:(automoveis.quilometragem),
      ID_pecas: Number(pecaTrocadaField?.ID),
      Nome_peca: pecaTrocadaField?.nome_peca,
      quilometragem_maxima: parseFloat(quilometragemMaximaField),
      data_maxima: adicionarMeses(dataInstalacao, dataMaximaField),
      data_instalacao: formatarDataParaBD(dataInstalacao),
    };
  
    try {
      const resposta = await fetch("http://localhost:3000/manutencoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novamanutencao),
        credentials: "include", 

      });
  
      if (!resposta.ok) throw new Error("Erro ao cadastrar manutenção");
  
      const manutencaoCriada = await resposta.json();
  
      manutencaoCriada.data_instalacao = formatarDataParaTela(manutencaoCriada.data_instalacao);
      manutencaoCriada.data_maxima = formatarDataParaTela(manutencaoCriada.data_maxima);
  
      setManutencoes((prev) => [...prev, manutencaoCriada]);
      alert("Manutenção cadastrada com sucesso!");
    } catch (err) {
      console.log(err);
    }
  };
  
  
  const deletarManutencao = async (id) => {
    fetch(`http://localhost:3000/manutencoes/${id}`,{
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 

    })
      .then((res)=> {
        if (!res.ok) throw new Error ("Erro ao deletar manutenção")
        return res.json();
      })
      .then((resposta) => {
        setManutencoes(prev => prev.filter(m => m.ID !== id));
        setDadosTabela(prev => prev.filter(m => m.ID !== id));
        alert(resposta.mensagem);
      })
      .catch((err)=>{
        console.error(err)
      })
  }




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
                  <select
                    className="select"
                    value={automovelSelecionado?.ID || ""}
                    onChange={(e) => {

                    }}
                  >

                    <option>Modelo: {automoveis.nome_automovel}- KM:{automoveis.quilometragem} </option>     
                  </select>
                </div>


                <div className="form-group">
                  <label>Peça Trocada:</label>
                  <select
                    className="select"
                    value={pecaTrocadaField?.ID || ""}
                    onChange={(e) => {
                      const pecasalva = pecas.find((a) => String(a.ID) === String(e.target.value));
                      setPecaTrocadaField(pecasalva);
                      console.log("Selecionado:", pecasalva);
                    }}
                  >
                    <option value="">Selecione o seu veículo</option>
                    {pecas.map((peca) => (
                      <option key={peca.ID} value={peca.ID}>
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
                  <label>Data máxima de uso (em Meses) :</label>
                  <input
                    className="input"
                    value={dataMaximaField}
                    type="text"
                    placeholder="Data máxima de uso"
                    onChange={(e) => setDataMaximaField(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button onClick={criarManutencao} className='buttonCadastrar'>Cadastrar Manutenção</button>
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

          <div className="table-wrapper">
            <table className="tabela-scroll">
              <thead>
                <tr>
                  <th>Nome do Automóvel</th>
                  <th>Nome da Peça</th>
                  <th>Quilometragem da Instalação</th>
                  <th>Quilometragem Máxima</th>
                  <th>Data Máxima</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {(dadosTabela.length === 0 ? manutencoes : dadosTabela).map((row, index) => (
                  <tr key={index}>
                    <td>{row.Nome_automovel}</td>
                    <td>{row.Nome_peca}</td>
                    <td>{row.quilometragem_instalacao}</td>
                    <td>{row.quilometragem_maxima}</td>
                    <td>{row.data_maxima}</td>
                    <td className="icons">
                      <MdDelete onClick={()=>deletarManutencao(row.ID)} className="delete-icon" />
                      <GrUpdate className="update-icon" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageCadastrarPeca
