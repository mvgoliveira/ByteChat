import {Switch, Route} from 'react-router-dom';
import { Home } from './pages/Home/index.js';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Room } from './pages/Room';

export function CustomSwitch() {
  return (
    <> 
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/room" component={Room}/>
      </Switch>
    </>
  )
} 
export default CustomSwitch;