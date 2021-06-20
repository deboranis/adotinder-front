import { Route, Redirect, Switch } from 'react-router-dom';
import { Context } from './context/Context';
import { useContext } from 'react';
import { get } from './utils/localStorage';
import LandingPage from './pages/LandingPage/LandingPage';
import Quiz from './pages/Quiz/Quiz';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import EditUser from './pages/EditUser/EditUser';
import AddPet from './pages/AddPet/AddPet';
import MaybeNot from './pages/MaybeNot/MaybeNot';

function App() {
  const { state } = useContext(Context)

  return (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {state.user.email || get('authed') ? <Route exact path="/dashboard" component={Dashboard} /> : <Redirect to="/login" />}
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/editUser" component={EditUser} />
        <Route exact path="/addPet" component={AddPet} />
        <Route exact path="/maybeNot" component={MaybeNot} />
    </Switch>
  );
}

export default App;
