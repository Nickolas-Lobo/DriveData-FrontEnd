import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PageLogin from './pages/PageLogin'
import PageAdicionarCarro from './pages/PageAdicionarCarro'
import PageCadastrarPeca from './pages/PageCadastrarPeca'
import PageInicio from './pages/PageInicio'
import PageAtualizarCarro from "./pages/PageAtualizarCarro";

function App() {
  return (
    <div className='appConfig'>
      <Router>
        <Routes>
          <Route path="/" element={<PageLogin/>}/>
          <Route path="/pageInicio" element={<PageInicio/>}/>
          <Route path="/pageCadastrarManutencao" element={<PageCadastrarPeca/>}/>
          <Route path="/pageAdicionarCarro" element={<PageAdicionarCarro/>}/>
          <Route path="/pageAtualizarCarro" element={<PageAtualizarCarro/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
