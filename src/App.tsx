import { BrowserRouter, Route, Routes } from 'react-router'
import { LocaleProvider } from './components/LocaleProvider.tsx'
import { GamePage } from './pages/GamePage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { LocatePage } from './pages/LocatePage.tsx'

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play" element={<GamePage />} />
          <Route path="/locate" element={<LocatePage />} />
        </Routes>
      </BrowserRouter>
    </LocaleProvider>
  )
}
