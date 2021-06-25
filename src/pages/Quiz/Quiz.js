import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../../components/Navbar/Navbar';
import { themeColors, baseFont, coolFont } from '../../assets/theme';

const useStyles = makeStyles((theme) => ({
  btnQuiz: {
		backgroundColor: themeColors.palette.status.info,
		color: themeColors.palette.status.warning,
		fontWeight: 700,
		fontSize: '1em',
    fontFamily: baseFont.typography.fontFamily,
		border: `3px solid ${themeColors.palette.status.info}`,
		margin: 10,
		boxShadow: 'none',
	},
	'&:hover': {
		backgroundColor: themeColors.palette.status.warning,
		color: themeColors.palette.status.info,
	},
  containerQuiz: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    textAlign: "center",
    marginTop: 30,
  },
  btnQuizContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "column"
  },
  quizQuestion: {
    fontFamily: coolFont.typography.fontFamily,
    color: themeColors.palette.status.success,
    marginTop: 20,
    padding: 20,
    textAlign: "center"
  }
}));

function Quiz (props) {
  const history = useHistory();
  const [resposta, setResposta] = useState([]);
  const [contador, setContador] = useState(0);
  const classes = useStyles();

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
  };

  return (
    <>
      <Navbar />
        {contador === 0 ? 
        <Box className={classes.containerQuiz}>
          <Typography variant="h5" className={classes.quizQuestion}>
            Qual a sua preferência de espécie?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
            className={classes.btnQuiz}
            onClick={() => registraResposta('?especie=true')}
            >
              Cães
            </Button>
            <Button
            className={classes.btnQuiz}
              onClick={() => registraResposta('?especie=false')}
            >
              Gatos
            </Button>
          </Container>
        </Box>
        : null}

        {contador === 1 ? 
        <>
          <Typography variant="h5" className={classes.quizQuestion}>
            Você tem uma casa telada e sem rotas de fuga?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
            className={classes.btnQuiz}
            onClick={() => registraResposta(null)}
            >
              Sim, minha casa tem janelas teladas e as portas/portões são totalmente fechados
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(null)}
            >
              Não, mas as janelas são inacessíveis ou não oferecem risco
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(null)}
            >
              Sim, mas posso resolver esse problema!
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(false)}
            >
              Não, minha casa tem rotas de fuga e/ou janelas que podem ocasionar queda e não posso mudar essa situação
            </Button>
          </Container>
        </>
        : null}

        {contador === 2 ? 
        <>
          <Typography variant="h5" className={classes.quizQuestion}>
            Qual seu nível de tolerância com bagunça?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('idade=true')}
            >
              Estou preparado pra educar um pet do zero, sei que vai ter bagunça!
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('idade=false')}
            >
              Prefiro não ter muito trabalho, um animal de temperamento conhecido seria melhor
            </Button>
          </Container>
        </>
        : null}

      {contador === 3 ? 
        <>
          <Typography variant="h5" className={classes.quizQuestion}>
            Você tem crianças ou outros animais em casa?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('criancas=true')}
            >
              Tenho crianças
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('animais=true')}
            >
              Tenho outros animais
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => {
                registraResposta('criancas=true');
                registraResposta('animais=true');
                registraResposta(null);
              }}
            >
              Tenho ambos
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(null)}
            >
              Moro só ou com outros adultos
            </Button>
          </Container>
        </>
        : null} 

        {contador === 4 ? 
        <>
          <Typography variant="h5" className={classes.quizQuestion}>
            Falando em outras pessoas, todo mundo na sua residência está de acordo com a ideia de adotar um animal?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(null)}
            >
              Sim!
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(false)}
            >
              Eu pretendia fazer uma surpresa...
            </Button>
          </Container>
        </>
        : null}

        {contador === 5 ? 
        <>
          <Typography variant="h5" className={classes.quizQuestion}>
            Há gatos positivos para FIV/FeLV morando na sua casa?
          </Typography>
          <Container className={classes.btnQuizContainer}>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('fiv=true')}
            >
              Tenho gatos FIV positivo
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta('felv=true')}
            >
              Tenho gatos FeLV positivo
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => { 
              registraResposta('fiv=true')
              registraResposta('felv=true')
            }}
            >
              Tenho gatos FIV/FeLV positivo
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => {
                registraResposta('fiv=false')
                registraResposta('felv=false')
              }}
            >
              Tenho gatos FIV/FeLV negativos em casa
            </Button>
            <Button
              className={classes.btnQuiz}
              onClick={() => registraResposta(null)}
            >
              Não tenho gatos
            </Button>
          </Container>
        </>
        : null}

        {contador === 6 ? 
        <Container className={classes.btnQuizContainer}>
          <Typography variant="h5" className={classes.quizQuestion}>
            Prontinho, temos seus melhores matches! Vamos ver?
          </Typography>
          <Container>
            <Button
              className={classes.btnQuiz}
              onClick={() => {
              console.log(resposta.join('&'));
              // history.push('/results')
            }}
            >
              Sim
            </Button>
          </Container>
        </Container> 
        : null}

      </>
    );
  
}
export default Quiz;
