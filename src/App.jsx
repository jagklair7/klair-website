import { useState } from 'react'
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
import FloatingContact from './components/FloatingContact'
import PolicyModal from './components/PolicyModal'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminBlog from './pages/AdminBlog'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Dashboard from './pages/Dashboard'
import DashboardDemo from './pages/DashboardDemo'
import './index.css'

function Home({ onPolicyClick }) {
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
      <Footer onPolicyClick={onPolicyClick} />
    </>
  )
}

export default function App() {
  const [modalPolicy, setModalPolicy] = useState(null)

  const handleOpenPolicy = (policy) => setModalPolicy(policy)
  const handleClosePolicy = () => setModalPolicy(null)

  const policyComponents = {
    privacy: PrivacyPolicy,
    terms: TermsOfService,
    cookies: CookiePolicy,
  }

  const ActivePolicy = modalPolicy ? policyComponents[modalPolicy] : null

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home onPolicyClick={handleOpenPolicy} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/demo" element={<DashboardDemo />}
      </Routes>
      {ActivePolicy ? (
        <PolicyModal isOpen={true} onClose={handleClosePolicy}>
          <ActivePolicy />
        </PolicyModal>
      ) : null}
      <FloatingContact />
    </BrowserRouter>
  )
}