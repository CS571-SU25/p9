import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'

import Homepage from './pages/Homepage'
import Projects from './pages/Projects'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'


function App() {
  //const [count, setCount] = useState(0);

  return <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/projects" element={<Projects/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </HashRouter>
  </>;
}

export default App
