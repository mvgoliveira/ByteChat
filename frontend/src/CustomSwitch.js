import { Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { GlobalStyle } from './styles/global';

export function CustomSwitch() {
  return (
    <>
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
      </Switch>
    </>
  )
}