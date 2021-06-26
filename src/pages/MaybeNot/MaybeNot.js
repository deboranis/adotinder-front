import { Container, Typography } from "@material-ui/core";
import Navbar from '../../components/Navbar/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import { themeColors, baseFont, coolFont } from "../../assets/theme";

const useStyles = makeStyles(() => ({
  tCool: {
    fontFamily: coolFont.typography.fontFamily,
    color: themeColors.palette.primary.main
  },
  tBase: {
    fontFamily: baseFont.typography.fontFamily,
    color: themeColors.palette.primary.main
  }
}))


export default function MaybeNot() {
  const classes = useStyles();
  return(
    <>
    <Navbar />
    <Container>
      <Typography align="center" variant="h4" className={classes.tCool}>Talvez este não seja o melhor momento pra você adotar um pet...</Typography>
      <Typography className={classes.tBase} variant="h6" align="center">Aqui no Adotinder, nossa prioridade é encontrar adoções certeiras, que proporcionem um lar "pra sempre" para nossos animaizinhos. Um de nossos principais pilares é evitar a devolução dos bichinhos, que é um processo extremamente estressante pra eles e pode ocorrer em algumas situações: quando a adoção foi uma decisão de impulso; quando ele não consultou as outras pessoas que moram consigo sobre a adoção; ou quando existe uma expectativa irrealista sobre o animal, levando o adotante a devolvê-lo na primeira dificuldade.</Typography>
      <Typography className={classes.tBase} variant="h6" align="center">Também nos preocupamos muito com o bem estar a longo prazo dos animais que estão para adoção, então exigimos que sua moradia não tenha rotas de fuga, possua janelas teladas (ou inacessíveis, no caso de cães) e que ele tenha espaço para brincar e interagir com humanos e/ou outros animais (ou seja, não são feitas adoções para adotantes que pretendem deixar o animalzinho preso num cômodo ou quintal), o que é fundamental para seu desenvolvimento saudável e para evitar que o animal torne-se antissocial.</Typography>
      <Typography className={classes.tBase} variant="h6" align="center">Além disso, é cobrada uma taxa de adoção que ajuda a custear medicações, exames, cirurgias, vacinas, vermífugos e castrações necessários no ato de resgate e reabilitação dos animais. O valor varia de acordo com a instituição. Essa medida também desestimula a adoção por impulso.</Typography>
      <Typography className={classes.tBase} variant="h6" align="center">Mas se você realmente quiser mudar a vida de um animalzinho e pretende fazer as adaptações necessárias pra isso acontecer, te esperamos no futuro! :)</Typography>
    </Container>
    </>
  )
};
