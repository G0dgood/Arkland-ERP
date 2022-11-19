
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import "./scss/main.scss";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
