import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('simulador');

  return (
    <div className="min-vh-100 bg-light">
      <Navbar setCurrentPage={setCurrentPage} />
      
      <main>
        {currentPage === 'simulador' && <Simulador />}
        {currentPage === 'garantia' && <GarantiaIA />}
        {/* Lógica para las demás páginas */}
      </main>
    </div>
  );
}

export default App
