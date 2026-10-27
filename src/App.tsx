import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import Perfil from './pages/Perfil'
import Carrinho from './components/Carrinho'
import { EstiloGlobal } from './styles'
import { store } from './store'

const App = () => (
  <Provider store={store}>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <EstiloGlobal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
      <Carrinho />
    </BrowserRouter>
  </Provider>
)

export default App
