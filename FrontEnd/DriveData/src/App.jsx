import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PageLogin from './pages/PageLogin'
import PageAdicionarCarro from './pages/PageAdicionarCarro'
import PageCadastrarPeca from './pages/PageCadastrarPeca'
import PageInicio from './pages/PageInicio'

function App() {
  return (
    <div className='appConfig'>
      <Router>
        <Routes>
          <Route path="/" element={<PageLogin/>}/>
          <Route path="/pageInicio" element={<PageInicio/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
