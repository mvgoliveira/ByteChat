import { BrowserRouter } from 'react-router-dom';
import {CustomSwitch} from './CustomSwitch';
import AppState from './components/AppState'
import ThemeState from './components/ThemeState'

function App() {
  return (
    <ThemeState>
      <AppState>
        <BrowserRouter>
          <CustomSwitch/>
        </BrowserRouter>
      </AppState>
    </ThemeState>   
  );
}

export default App;
