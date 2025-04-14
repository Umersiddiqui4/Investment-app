import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import InvestmentDashboard from './components/investment-dashboard'
import InvestorsPage from './components/investors-page'
import { ThemeProvider } from './components/theme/theme-provider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CreateCompanyPage from './components/CreateCompany'
import Profile from './components/Profile'
import Installments from './components/Installments'
import Settings from './components/Settings'
import Sell from './components/Sell'
import { AuthForms } from './components/auth/auth-forms'




function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    
    <Router>
      <Routes>
        <Route path="/" element={<InvestmentDashboard />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/create-company" element={<CreateCompanyPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/installments" element={<Installments />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/auth" element={<AuthForms />} />
      </Routes>
    </Router>

     </ThemeProvider>
  )
}

export default App
