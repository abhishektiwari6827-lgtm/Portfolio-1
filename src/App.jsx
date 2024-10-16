import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Header />
      <main className="pt-20 pb-12 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}