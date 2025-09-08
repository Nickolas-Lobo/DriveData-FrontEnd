import './App.css'
import PageLogin from './pages/PageLogin'
import PageAdicionarCarro from './pages/PageAdicionarCarro'
import PageCadastrarPeca from './pages/PageCadastrarPeca'
import PageInicio from './pages/PageInicio'

function App() {
  return (
    <div className='appConfig'>
      <PageLogin/>
      <PageAdicionarCarro/>
      <PageCadastrarPeca/>
      <PageInicio/>
    </div>
  )
}

export default App
