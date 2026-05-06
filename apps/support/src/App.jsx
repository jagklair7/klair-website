import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TicketForm from './components/TicketForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TicketForm />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}

export default App
