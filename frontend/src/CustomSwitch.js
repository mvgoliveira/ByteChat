import {Switch, Route} from 'react-router-dom';
import { Home } from './pages/Home/index.js';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Room } from './pages/Room';
import { GlobalStyle } from './styles/global';

export function CustomSwitch() {
  return (
    <> 
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/room/:roomCode" exact component={Room}/>
      </Switch>
    </>
  )
} 
export default CustomSwitch;