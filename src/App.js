import { Provider } from './context/Context';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" render={Login} />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
