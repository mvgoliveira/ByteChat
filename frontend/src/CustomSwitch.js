import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Room } from './pages/room';

export function CustomSwitch() {
  return (
    <>
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/room/:roomId" exact component={Room}/>
      </Switch>
    </>
  )
}