import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Quiz from './pages/Quiz/Quiz';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import EditUser from './pages/EditUser/EditUser';
import AddPet from './pages/AddPet/AddPet';
import useToken from './hooks/withUser';
import { get } from './utils/localStorage';
import './App.css';

function App() {
  useToken();

  return (
    <BrowserRouter>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {get('authed') ? <Route exact path="/dashboard" component={Dashboard} /> : <Redirect to="/login" />}
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/editUser" component={EditUser} />
        <Route exact path="/addPet" component={AddPet} />
    </BrowserRouter>
  );
}

export default App;
