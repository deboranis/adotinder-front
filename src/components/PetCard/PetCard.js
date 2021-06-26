import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import axios from 'axios';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Container,
  IconButton,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { themeColors, baseFont, coolFont } from '../../assets/theme';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    height: '56.25%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardTitle: {
    fontFamily: coolFont.typography.fontFamily,
    fontSize: '2em',
    color: themeColors.palette.status.error,
  },
  petInfo: {
    fontFamily: baseFont.typography.fontFamily,
  },
  containerPetInfo: {
    display: "flex",
    flexDirection: "row"
  },
  iconColors: {
    color: themeColors.palette.secondary,
  },
  btnAdopt: {
		backgroundColor: themeColors.palette.status.info,
		color: themeColors.palette.status.warning,
		fontWeight: 700,
		fontSize: '1em',
    fontFamily: baseFont.typography.fontFamily,
		border: `3px solid ${themeColors.palette.status.info}`,
		margin: 10,
		boxShadow: 'none'
	},
	'&:hover': {
		backgroundColor: themeColors.palette.status.warning,
		color: themeColors.palette.status.info,
	},
}));

export default function PetCard({ pet }) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { state } = useContext(Context);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/dashboard');
  };

  const handleAdoption = () => {
    const adoption = {
      protetor: pet.protetor._id,
      adotante: state.user.id,
      status: 'pendente',
      pet: pet._id
    };
    axios.post(process.env.REACT_APP_ADOPTION_CREATE, adoption, { withCredentials: true })
      .then(() => {
        setOpen(true);
      });
  }

  const classes = useStyles();
  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Sua adoção foi registrada com sucesso!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Agora é só esperar o protetor aprovar a sua adoção que você receberá
            uma notificação e brevemente o protetor entrará em contato!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    <Card className={classes.root}>
      <CardHeader
        disableTypography
        className={classes.cardTitle}
        title={pet.nome}
      />
      <CardMedia
        className={classes.media}
        // Precisa fazer uma função para retirar as chaves da string da foto, aí é só jogar o resultado no src
        src={pet.foto}
        title={pet.nome}
        component="img"
      />
      <CardContent>

        <Typography variant="body2" className={classes.petInfo} component="p">
          {pet.idade} meses - {pet.sexo === true ? 'Fêmea' : 'Macho'} - {pet.peso}kg
        </Typography>

      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="adotar">
          <FavoriteIcon color="secondary" />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon color="primary" />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="expandir"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse 
        in={expanded}
        timeout="auto"
        unmountOnExit
        >
        
        <CardContent>
          <Typography paragraph className={classes.petInfo}>Informações do pet</Typography>


          <Container className={classes.containerPetInfo}>
            {pet.vacina ? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>Vacinação em dia</Typography>
          </Container>

          <Container className={classes.containerPetInfo}>
            {pet.vermifugo ? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>Vermifugado</Typography>
          </Container>

          <Container className={classes.containerPetInfo}>
            {pet.socializaAnimais? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>Socializa bem com outros animais?</Typography>
          </Container>

          <Container className={classes.containerPetInfo}>
            {pet.socializaCriancas ? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>Socializa bem com crianças</Typography>
          </Container>

          <Typography paragraph className={classes.petInfo}>
            Mais sobre {pet.nome}: {pet.descricao}
          </Typography>

          {pet.especie ? null : 
          <>
          <Container className={classes.containerPetInfo}>
            {pet.fiv ? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>FIV</Typography>
          </Container>
          <Container className={classes.containerPetInfo}>
            {pet.felv ? <CheckOutlinedIcon color="secondary" /> : <CloseOutlinedIcon />}
            <Typography paragraph className={classes.petInfo}>FeLV</Typography>
          </Container>
          </>
          }

          { state.user.tipo !== 'protetor' ?  <Button className={classes.btnAdopt} onClick={handleAdoption}>Quero adotar!</Button> : null }

        </CardContent>
      </Collapse>
    </Card>
    </>
  )
}