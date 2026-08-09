import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { TicketProvider } from './context/TicketContext'
import { CreatePage } from './pages/CreatePage'
import { HomePage } from './pages/HomePage'
import { PassPage } from './pages/PassPage'

export default function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/pass" element={<PassPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TicketProvider>
  )
}
