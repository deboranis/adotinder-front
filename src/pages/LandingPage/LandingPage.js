import { Button, Container, Typography, Slide } from "@material-ui/core";
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { themeColors, coolFont, baseFont } from "../../assets/theme";
import { useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Context } from '../../context/Context';
import Navbar from '../../components/Navbar/Navbar';
import quadro1 from '../../assets/images/quadro1.jpg';
import quadro2 from '../../assets/images/quadro2.jpg';
import { get } from "../../utils/localStorage";
import useToken from "../../hooks/withUser";

const useStyles = makeStyles(() => ({
	container1: {
		color: themeColors.palette.secondary.main,
		backgroundColor: themeColors.palette.status.warning,
		padding: 20,
		textAlign: 'center',
	},
	container2: {
		color: themeColors.palette.primary.main,
		backgroundColor: themeColors.palette.status.warning,
		padding: 20,
		textAlign: 'center',
		fontSize: '1.75em'
	},
	imgpets: {
		maxWidth: 360,
		width: '100%'
	},
	btn: {
		backgroundColor: themeColors.palette.status.info,
		color: themeColors.palette.status.warning,
		fontWeight: 700,
		fontSize: '1em',
		border: `3px solid ${themeColors.palette.status.info}`,
		margin: 10,
		boxShadow: 'none',
		fontFamily: baseFont.typography.fontFamily
	},
	'&:hover': {
		backgroundColor: themeColors.palette.status.warning,
		color: themeColors.palette.status.info,
	},
	btn_container: {
		justifyItems: `space-between`,
		marginTop: 20
	},
	text: {
		marginTop: 20
	}
}));

export default function LandingPage() {
	useToken();
	const { state } = useContext(Context);
	const classes = useStyles();

  return(
		<>
		<Navbar />
		<Slide in direction="up" mountOnEnter timeout={{ enter: 800, exit: 600 }}>
    <Container disableGutters>
			<Container className={classes.container1}>
				<img className={classes.imgpets} src={quadro1} alt="fotos de animais adotados"></img>
				<ThemeProvider theme={coolFont}>
					<Typography variant="h4" className={classes.text}>
						A melhor plataforma para você encontrar um pet para chamar de seu!
					</Typography>
				</ThemeProvider>
			</Container>
			
			<Container className={classes.container2}>
				<img className={classes.imgpets} src={quadro2} alt="fotos de animais adotados"></img>
					<ThemeProvider theme={coolFont}>
						<Typography variant="h4" className={classes.text}>
							O Adotinder oferece um algoritmo de combinação que mostra os melhores pets para o seu estilo de vida em aproximadamente um minuto! Quer testar?
						</Typography>
					</ThemeProvider>

			{!state.user.email && !get('authed') ? 
			<Container className={classes.btn_container}>
				<ThemeProvider theme={baseFont}>
					<Button component={ReactLink} to="/signup" variant="contained" className={classes.btn}>Cadastre-se</Button>
					<Button component={ReactLink} to="/login" variant="contained" className={classes.btn}>Login</Button>
				</ThemeProvider>
			</Container> 
			: null}
			</Container>
    </Container>
		</Slide>
	</>
  )
};