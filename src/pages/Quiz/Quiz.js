import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Typography } from '@material-ui/core';
import Navbar from '../../components/Navbar/Navbar';

function Quiz (props) {
  const history = useHistory();
  const [resposta, setResposta] = useState([]);
  const [contador, setContador] = useState(0);

  const registraResposta = value => {
    if(value === false) {
      history.push('/maybeNot');
      return;
    }
    if(value === null) { // condicional para não guardar valor no array para query
      setContador(contador+1);
      return;
    }
    setResposta(previousResposta => [...previousResposta, value]); // guardando as respostas num array para concatenar numa query no back. Usando callback no setState para eliminar problemas de concorrência
    setContador(contador+1); // precisamos escrever como +1 em vez de += ou ++ pois estaríamos mutando o estado diretamente
    console.log(resposta);
  };

  return (
    <>
      <Navbar />
        {contador === 0 ? 
        <>
          <Typography variant="h3">
            Qual a sua preferência de espécie?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta('?especie=true')}
            >
              Cães
            </Button>
            <Button
              onClick={() => registraResposta('?especie=false')}
            >
              Gatos
            </Button>
          </Container>
        </>
        : null}

        {contador === 1 ? 
        <>
          <Typography variant="h3">
            Você tem uma casa telada e sem rotas de fuga?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta(null)}
            >
              Sim, minha casa tem janelas teladas e as portas/portões são totalmente fechados
            </Button>
            <Button
              onClick={() => registraResposta(null)}
            >
              Não, mas as janelas são inacessíveis ou não oferecem risco
            </Button>
            <Button
              onClick={() => registraResposta(null)}
            >
              Sim, mas posso resolver esse problema!
            </Button>
            <Button
              onClick={() => registraResposta(false)}
            >
              Não, minha casa tem rotas de fuga e/ou janelas que podem ocasionar queda e não posso mudar essa situação
            </Button>
          </Container>
        </>
        : null}

        {contador === 2 ? 
        <>
          <Typography variant="h3">
            Qual seu nível de tolerância com bagunça?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta('?idade=true')}
            >
              Estou preparado pra educar um pet do zero, sei que vai ter bagunça!
            </Button>
            <Button
              onClick={() => registraResposta('?idade=false')}
            >
              Prefiro não ter muito trabalho, um animal de temperamento conhecido seria melhor
            </Button>
          </Container>
        </>
        : null}

      {contador === 3 ? 
        <>
          <Typography variant="h3">
            Você tem crianças ou outros animais em casa?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta('?criancas=true')}
            >
              Tenho crianças
            </Button>
            <Button
              onClick={() => registraResposta('?animais=true')}
            >
              Tenho outros animais
            </Button>
            <Button
              onClick={() => {
                registraResposta('criancas=true');
                registraResposta('animais=true');
                registraResposta(null);
              }}
            >
              Tenho ambos
            </Button>
            <Button
              onClick={() => registraResposta(null)}
            >
              Moro só ou com outros adultos
            </Button>
          </Container>
        </>
        : null} 

        {contador === 4 ? 
        <>
          <Typography variant="h3">
            Falando em outras pessoas, todo mundo na sua residência está de acordo com a ideia de adotar um animal?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta(null)}
            >
              Sim!
            </Button>
            <Button
              onClick={() => registraResposta(false)}
            >
              Eu pretendia fazer uma surpresa...
            </Button>
          </Container>
        </>
        : null}

        {contador === 5 ? 
        <>
          <Typography variant="h3">
            Há gatos positivos para FIV/FeLV morando na sua casa?
          </Typography>
          <Container>
            <Button
            onClick={() => registraResposta('?fiv=true')}
            >
              Tenho gatos FIV positivo
            </Button>
            <Button
            onClick={() => registraResposta('?felv=true')}
            >
              Tenho gatos FeLV positivo
            </Button>
            <Button
            onClick={() => { 
              registraResposta('?fiv=true')
              registraResposta('?felv=true')
            }}
            >
              Tenho gatos FIV/FeLV positivo
            </Button>
            <Button
              onClick={() => {
                registraResposta('?fiv=false')
                registraResposta('?felv=false')
              }}
            >
              Tenho gatos FIV/FeLV negativos em casa
            </Button>
            <Button
              onClick={() => registraResposta(null)}
            >
              Não tenho gatos
            </Button>
          </Container>
        </>
        : null}

        {contador === 6 ? 
        <>
          <Typography variant="h3">
            Prontinho, temos seus melhores matches! Vamos ver?
          </Typography>
          <Container>
            <Button
            onClick={() => {
              console.log(resposta.join('&'));
              // history.push('/results')
            }}
            >
              Sim
            </Button>
          </Container>
        </> 
        : null}

      </>
    );
  
}
export default Quiz;
