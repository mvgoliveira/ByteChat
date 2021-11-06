import { BrowserRouter } from 'react-router-dom';
import {CustomSwitch} from './CustomSwitch';
import AppState from './contexts/AppState'
import ThemeState from './contexts/ThemeState'

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

