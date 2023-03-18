import './App.css'
import Cart from './Componentes/Cart/Cart'
import Contact from './Componentes/Contact/Contact'
import Home from './Componentes/Home/Home'
import Nav from './Componentes/NavOF/Nav'
import Productos from './Componentes/Productos/Productos'

function App() {
  return (
    <>
      <Nav/>
      <Home/>
      <Productos/> 
      <Contact/>
      <Cart/>
    </>
  )
}

export default App
