import { BrowserRouter } from 'react-router-dom';
import {CustomSwitch} from './CustomSwitch';
import AppState from './contexts/AppState'

function App() {
  return (
      <AppState>
        <BrowserRouter>
          <CustomSwitch/>
        </BrowserRouter>
      </AppState>
  );
}

export default App;

