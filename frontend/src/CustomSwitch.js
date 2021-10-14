import {Switch, Route} from 'react-router-dom';
import home_page from './pages/home/home_page';
import login_page from './pages/login_page/login_page';
import register_page from './pages/register_page/register_page';

export function CustomSwitch() {
  return (
    <> 
      <Switch>
        <Route path="/" exact component={home_page}/>
        <Route path="/login" component={login_page}/>
        <Route path="/register" component={register_page}/>
      </Switch>
    </>
  )
} 
export default CustomSwitch;