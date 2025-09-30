import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import PageLogin from './pages/PageLogin'
import PageAdicionarCarro from './pages/PageAdicionarCarro'
import PageCadastrarPeca from './pages/PageCadastrarPeca'
import PageInicio from './pages/PageInicio'
import PageAtualizarCarro from "./pages/PageAtualizarCarro";
import PageQrCode from "./pages/PageQrCode";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className='appConfig'>
      <Router>
        <Routes>
          <Route path="/" element={<PageLogin/>}/>
          <Route path="/pageInicio" element={
            <ProtectedRoute>
              <PageInicio/>
            </ProtectedRoute>
            }/>
          <Route path="/pageCadastrarManutencao" element={
            <ProtectedRoute>
              <PageCadastrarPeca/>
            </ProtectedRoute>
            }/>
          <Route path="/pageAdicionarCarro" element={
            <ProtectedRoute>
              <PageAdicionarCarro/>
            </ProtectedRoute>
            }/>
          <Route path="/pageAtualizarCarro" element={
            <ProtectedRoute>
              <PageAtualizarCarro/>
            </ProtectedRoute>
            }/>
          <Route path="/pageQrCode" element={<PageQrCode/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
