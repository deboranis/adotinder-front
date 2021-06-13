import { Provider } from './context/Context';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" render={Login} />
        <Route exact path="/signup" render={Signup} />
        <Route exact path="/dashboard" render={Dashboard} />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
