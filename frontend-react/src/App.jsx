

import  './assets/css/style.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
function App() {
  

  return (
    <>
    <div className="d-flex flex-column min-vh-100 bg-black">
      <Header />
      <main className="flex-grow-1">
        <Main />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
