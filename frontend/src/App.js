import { BrowserRouter } from "react-router-dom";
import { CustomSwitch } from './CustomSwitch';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <CustomSwitch/>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
