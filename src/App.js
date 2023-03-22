import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Cart from './components/Cart'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/cart" component={Cart} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
