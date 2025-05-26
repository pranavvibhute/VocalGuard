import { useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import {Toaster} from 'react-hot-toast'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import TryDemo from './components/TryDemo'
import ResultCard from './components/ResultCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="relative bg-black bg-opacity-70 text-white font-sans overflow-x-hidden">
        {/* <MouseGradientBackground /> */}
        <ParticleBackground />
        <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <TryDemo />
      <div className=' text-white p-8 space-y-6'>
        <h1 className='text-3xl font-bold mb-4'>Test Result Card</h1>
        <ResultCard result={{ label: "Spoofed", confidence: 91.27 }} />
        <ResultCard result={{ label: "Real", confidence: 98.73 }} />
        <ResultCard result={{ error: "Audio format not supported" }} />
      </div>
      <Footer />
    </div>
    
  );
}

export default App
