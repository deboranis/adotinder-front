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
import UserPets from './pages/UserPets/UserPets';
import Results from './pages/Results/Results';

function App() {
  const { state } = useContext(Context)

  return (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {state.user.email || get('authed') ? <Route exact path="/dashboard" component={Dashboard} /> : <Redirect to="/login" />}
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/user/edit" component={EditUser} />
        <Route exact path="/pets/add" component={AddPet} />
        <Route eact path="/user/pets" component={UserPets} />
        <Route exact path="/maybenot" component={MaybeNot} />
        <Route exact path="/results" component={Results} />
    </Switch>
  );
}

export default App;
