import {Switch, Route} from 'react-router-dom';
import { Home } from './pages/Home/index.js';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Room } from './pages/Room';
import { GlobalStyle } from './styles/global';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CustomSwitch() {
  return (
    <> 
      <ToastContainer enableMultiContainer autoClose={3000} />
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/room/:room_code" exact component={Room}/>
      </Switch>
    </>
  )
} 
export default CustomSwitch;