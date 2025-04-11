import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import InvestmentDashboard from './components/investment-dashboard'
import InvestorsPage from './components/investors-page'
import { ThemeProvider } from './components/theme/theme-provider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"




function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    
    <Router>
      <Routes>
        <Route path="/" element={<InvestmentDashboard />} />
        <Route path="/investors" element={<InvestorsPage />} />
      </Routes>
    </Router>

     </ThemeProvider>
  )
}

export default App
