import './App.css'
import PageLogin from './pages/PageLogin'
import PageAdicionarCarro from './pages/PageAdicionarCarro'
import PageCadastrarPeca from './pages/PageCadastrarPeca'

function App() {
  return (
    <div className='appConfig'>
      <PageLogin/>
      <PageAdicionarCarro/>
      <PageCadastrarPeca/>
    </div>
  )
}

export default App
