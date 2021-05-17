import React from 'react'

//routes
import Routes from './routes'
import Header from './components/Header'
import "./App.css"
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes />
      </main>
      
    </div>
  )
}

export default App
