import { Button, Container, Typography } from '@material-ui/core';
import { useEffect, useContext, createContext } from 'react';
import { Context } from '../../context/Context';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { get } from '../../utils/localStorage';

export default function Dashboard() {
  const history = useHistory();
  const { state } = useContext(Context);

  useEffect(() => get('authed') || state.user.email ? null : history.push('/login'));
  // estamos partindo do princípio que pode acontecer de não ter nada no local storage, então consultamos o state tbm

  return(
    <>
    <Navbar />
    <Typography>DASHBOARD</Typography>
    {state.user.tipo === 'adotante' ? 
      <Container>
        <Button href="/editUser">Editar meu cadastro</Button>
        <Button href="/quiz">Fazer quiz</Button>
        <Button>Minhas intenções de adoção</Button>
      </Container>
      :
      <Container>
        <Button href="/editUser">Editar meu cadastro</Button>
        <Button href="/add">Adicionar animais</Button>
      </Container>
      }
		</>
  );
}