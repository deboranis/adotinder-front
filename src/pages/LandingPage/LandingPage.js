import { Box, Button, Container, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { themeColors } from "../../assets/theme";
import { useContext } from 'react';
import { Context } from '../../context/Context';
import Navbar from '../../components/Navbar/Navbar';
import quadro1 from '../../assets/images/quadro1.jpg';
import quadro2 from '../../assets/images/quadro2.jpg';
import { get } from "../../utils/localStorage";

const useStyles = makeStyles(() => ({
	container1: {
		backgroundColor: themeColors.pink,
		color: themeColors.white,
		padding: 20
	},
	container2: {
		backgroundColor: themeColors.blue,
		color: themeColors.white,
		padding: 20
	},
	imgpets: {
		maxWidth: 360,
		width: '100%'
	},
	btn: {
		backgroundColor: themeColors.yellow,
		color: themeColors.white,
		fontStyle: `bold`,
		border: `3px solid ${themeColors.yellow}`,
		margin: 10,
		boxShadow: 'none'
	},
	'&:hover': {
		backgroundColor: themeColors.white,
		color: themeColors.yellow,
	},
	btn_container: {
		justifyItems: `space-between`,
	}
}));

export default function LandingPage() {
	const { state } = useContext(Context);
	const classes = useStyles();

  return(
		<>
		<Navbar />
    <Container>
			<Box>
					<img className={classes.imgpets} src={quadro1} alt="fotos de animais adotados"></img>
				<Typography variant="h4" className={classes.container1}>
					A melhor plataforma para você encontrar um pet pra chamar de seu!
				</Typography>
			</Box>
			<Box>
				<img className={classes.imgpets} src={quadro2} alt="fotos de animais adotados"></img>
				<Typography variant="h4" className={classes.container2}>
					O Adotinder oferece um algoritmo de combinação que mostra os melhores pets para o seu estilo de vida em aproximadamente um minuto! Quer testar?
				</Typography>
			</Box>
			{!state.user.email && !get('authed') ? <Box className={classes.btn_container}>
				<Button href="/signup" variant="contained" className={classes.btn}>Cadastre-se</Button>
				<Button href="/login" variant="contained" className={classes.btn}>Login</Button>
			</Box> : null}
    </Container>
		</>
  )
}