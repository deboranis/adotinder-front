import { Button, Container, Typography } from '@material-ui/core';
import { useEffect, useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { get, set, remove } from '../../utils/localStorage';
import axios from 'axios';

export default function Dashboard({ location }) {
  const history = useHistory();
  const [user, setUser] = useState(location.state);
  console.log(user);
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (!location.state || !state.user.email) {
      axios.get(process.env.REACT_APP_GET_TOKEN, { withCredentials: true }) // dizendo pro axios mandar cookies
			.then((data) => {
        if (data.data.email) {
          dispatch({
            type: "PROVIDE_USER",
            payload: data.data,
          });
          set('authed', { success: true });
          setUser(prev => {return {...prev, ...data.data}});
        }
			})
      .catch(() => { remove(); history.push('/login'); });
    }
  }, []);
  // estamos partindo do princípio que pode acontecer de não ter nada no local storage, então consultamos o state tbm

  return(
    <>
    <Navbar />
    <Typography>DASHBOARD</Typography>
    {Boolean(user || location.state) &&
    Boolean(user.tipo === 'adotante'
      || Boolean(location.state
      && location.state.tipo === 'adotante')) ?
      <Container>
        <Button href="/editUser">Editar meu cadastro</Button>
        <Button href="/quiz">Fazer quiz</Button>
        <Button>Minhas intenções de adoção</Button>
      </Container>
      :<Container>
        <Button href="/editUser">Editar meu cadastro</Button>
        <Button href="/add">Adicionar animais</Button>
        <Button href="/pets">Ver animais cadastrados</Button>
      </Container>}
		</>
  );
}