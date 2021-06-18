import { Route, Redirect, Switch } from 'react-router-dom';
import { Context } from './context/Context';
import { useContext } from 'react';
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
  const { state } = useContext(Context)

  return (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {get('authed') || state.user.email ? <Route exact path="/dashboard" component={Dashboard} /> : <Redirect to="/login" />}
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/editUser" component={EditUser} />
        <Route exact path="/addPet" component={AddPet} />
    </Switch>
  );
}

export default App;
