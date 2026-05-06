import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import TrustStrip  from './components/TrustStrip'
import Services    from './components/Services'
import Products    from './components/Products'
import WhyKlair    from './components/WhyKlair'
import Testimonials from './components/Testimonials'
import CTABanner   from './components/CTABanner'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import './index.css'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Products />
        <WhyKlair />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}