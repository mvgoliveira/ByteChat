import { BrowserRouter } from "react-router-dom";
import { CustomSwitch } from './CustomSwitch';
import { AuthContextProvider } from './contexts/AuthContext';
import { SettingsContextProvider } from './contexts/SettingsContext';

function App() {
  return (
    <AuthContextProvider>
      <SettingsContextProvider>
        <BrowserRouter>
          <CustomSwitch/>
        </BrowserRouter>
      </SettingsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
