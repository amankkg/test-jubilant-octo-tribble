import React, {useState} from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [fetching, setFetching] = useState(false)
  const [echoIn, setEchoIn] = useState('')
  const appLogoClass = fetching ? 'App-logo App-logo-spin' : 'App-logo'

  const onHello = () => {
    setFetching(true)

    fetch(process.env.REACT_APP_API + '/api')
      .then((resp) => resp.text())
      .then((resp) => {
        setFetching(false)
        alert(resp)
      })
  }

  const onEcho = () => {
    setFetching(true)

    fetch(process.env.REACT_APP_API + '/api/echo', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({message: echoIn}),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setFetching(false)
        alert(resp)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={appLogoClass} alt="logo" />
        <p>
          <button onClick={onHello}>fetch /api</button>
        </p>
        <p>
          <label>
            Echo <input onChange={(e) => setEchoIn(e.currentTarget.value)} />
          </label>{' '}
          <button onClick={onEcho}>fetch /api/echo</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React deployment options
        </a>
      </header>
    </div>
  )
}

export default App
