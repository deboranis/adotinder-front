import { useContext } from 'react';
import { Context } from '../../context/Context';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { Button, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { themeColors, baseFont, coolFont } from "../../assets/theme";
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import useToken from '../../hooks/withUser';

export default function Dashboard() {
  const { state } = useContext(Context);

  useToken();
  // estamos partindo do princípio que pode acontecer de não ter nada no local storage, então consultamos o state tbm

  const useStyles = makeStyles(() => ({
    dashboardContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: 20,
    },
    btnDashboard: {
      backgroundColor: themeColors.palette.status.error,
      color: themeColors.palette.status.warning,
      fontFamily: baseFont.typography.fontFamily,
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      width: "100%",
      justifyContent: "space-between"
    },
    iconColor: {
      color: themeColors.palette.status.warning,
    },
    dashboardText: {
      fontFamily: coolFont.typography.fontFamily,
      color: themeColors.palette.status.error,
    },
    dashboardSubtext: {
      fontFamily: baseFont.typography.fontFamily,
      color: themeColors.palette.status.error,
    },
    buttonContainer: {
      padding: 0,
      marginTop: 20,
    }
  }));

  const classes = useStyles();

  return(
    <>
    <Navbar />
    <Container className={classes.dashboardContainer}>
      <Typography 
        variant="h4"
        className={classes.dashboardText}
        >
          Dashboard
      </Typography>
      <Typography 
        variant="h6"
        className={classes.dashboardSubtext}
        >
          Olá, {state.user.nome}!
      </Typography>

      {state.user.tipo === 'adotante' ?
      <Container className={classes.buttonContainer}>

        <Button component={Link} className={classes.btnDashboard} to="/user/edit">
            <SettingsOutlinedIcon className={classes.iconColor} />
          Editar meu cadastro
        </Button>

        <Button component={Link} className={classes.btnDashboard} to="/quiz">
            <QuestionAnswerOutlinedIcon className={classes.iconColor} />
          Fazer quiz
        </Button>

        <Button component={Link} className={classes.btnDashboard} to="/adocoes">
            <StarBorderOutlinedIcon className={classes.iconColor} />
          Minhas intenções de adoção
        </Button>
      </Container>
      :
      <Container className={classes.buttonContainer}>

        <Button component={Link} className={classes.btnDashboard} to="/user/edit">
            <SettingsOutlinedIcon className={classes.iconColor} />
          Editar meu cadastro
        </Button>

        <Button component={Link} className={classes.btnDashboard} to="/pets/add">
            <AddCircleOutlineOutlinedIcon className={classes.iconColor} />
          Adicionar animais
        </Button>

        <Button component={Link} className={classes.btnDashboard} to="/user/pets">
            <PetsOutlinedIcon className={classes.iconColor} />
          Ver animais cadastrados
        </Button>
        
        </Container>}
      </Container>
		</>
  );
}