import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
