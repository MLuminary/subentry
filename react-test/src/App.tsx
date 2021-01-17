import React from 'react'
import './App.css'
import { SuspenseDemo } from './suspense-demo/page'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/rxjs-breakout">Rxjs-breakout</Link>
              </li>
              <li>
                <Link to="/suspense">Suspense</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/suspense">
              <SuspenseDemo />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
