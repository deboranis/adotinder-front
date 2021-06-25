import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, RadioGroup, Radio, FormLabel, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';
import { baseFont } from '../../assets/theme';
import { DropzoneArea } from 'material-ui-dropzone';
import petMapper from '../../utils/petMapper';
import axios from 'axios';

const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      resolve(reader.result);
    };
  });
};

export default function FormAddPet() {
  // const history = useHistory();
  const [ image, setImage ] = useState('');

  const addPetSchema = yup.object({
    nome: yup
      .string()
      .trim()
      .required('Campo obrigatório'),
    especie: yup
      .string()
      .oneOf(['cachorro', 'gato'])
      .required('Campo obrigatório'),
    descricao: yup
      .string()
      // .min(50, 'Ao menos 50 caracteres')
      .max(300, 'No máximo 300 caracteres'),
    idade: yup
      .string()
      .trim()
      .required('Campo obrigatório'),
    sexo: yup
      .string()
      .oneOf(['macho', 'femea'])
      .required(),
    peso: yup
      .string()
      .trim()
      .required(),
    castrado: yup
      .string()
      .oneOf(['sim', 'nao'])
      .required(),
    vacinas: yup
      .string()
      .oneOf(['sim', 'nao'])
      .required(),
    vermifugo: yup
      .string()
      .oneOf(['sim', 'nao'])
      .required(),
    socializaAnimais: yup
      .string()
      .oneOf(['sim', 'nao'])
      .required(),
    socializaCriancas: yup
      .string()
      .oneOf(['sim', 'nao'])
      .required(),
    fiv: yup
      .string()
      .oneOf(['sim', 'nao']),
    felv: yup
      .string()
      .oneOf(['sim', 'nao']),
    foto: yup.mixed()
  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      especie: '',
      descricao: '',
      idade: '',
      sexo: '',
      peso: '',
      castrado: '',
      vacinas: '',
      vermifugo: '',
      socializaAnimais: '',
      socializaCriancas: '',
      fiv: '',
      felv: '',
      foto: null
    },
    validationSchema: addPetSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (!image) {
          helpers.setFieldError('foto', 'Por favor envia uma imagem do pet')
        }
        const converted = await blobToBase64(image);
        values.foto = converted;
        console.log(values);
        await axios.post(process.env.REACT_APP_PET_CREATE, petMapper(values), { withCredentials: true });
        // history.push('/dashboard');
      } catch (error) {
        console.log(error)
        if (error.response.data?.type === 'User-Repo-Create-email') {
          helpers.setFieldError('email', 'Já existe um usuário com esse email');
        }
        if (error.response.data?.type === 'User-Exists') {
          helpers.setFieldError('cpf', 'Essa conta já existe');
          helpers.setFieldError('email', 'Essa conta já existe');
        }
      }
    }
  });

  const useStyles = makeStyles(() => ({
    formText: {
      color: "grey",
      fontFamily: baseFont.typography.fontFamily,
      marginTop: 20,
    },
    formInput: {
      marginTop: 10,
    },
    btnAddPet: {
      marginTop: 20,
      fontWeight: 700,
      fontSize: "1.2em",
      fontFamily: baseFont.typography.fontFamily,
      margin: 20
    },
    container: {
      display: "flex",
      flexDirection: "column"
    },
  }))



  const classes = useStyles();
	return (
    <ThemeProvider theme={baseFont}>
		  <Container maxWidth="xs">
        <Typography variant="h5" className={classes.formText}>Adicionar pet</Typography>
          <form className={classes.container} onSubmit={formik.handleSubmit} encType="multipart/form-data">

            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Nome do pet"
              name="nome"
              id="nome"
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
              value={formik.values.nome}
              onChange={formik.handleChange}
            />

            <FormLabel component="legend">Espécie</FormLabel>
            <RadioGroup aria-label="espécie do animal" name="especie" value={formik.values.especie} onChange={formik.handleChange}>
              <FormControlLabel value="cachorro" control={<Radio />} label="Cachorro" />
              <FormControlLabel value="gato" control={<Radio />} label="Gato" />
            </RadioGroup>

            <FormLabel component="legend">Sexo</FormLabel>
            <RadioGroup aria-label="sexo do animal" name="sexo" value={formik.values.sexo} onChange={formik.handleChange}>
              <FormControlLabel value="femea" control={<Radio />} label="Fêmea" />
              <FormControlLabel value="macho" control={<Radio />} label="Macho" />
            </RadioGroup>

            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Descrição"
              name="descricao"
              id="descricao"
              error={formik.touched.descricao && Boolean(formik.errors.descricao)}
              helperText={formik.touched.descricao && formik.errors.descricao}
              value={formik.values.descricao}
              onChange={formik.handleChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Idade em meses"
              name="idade"
              id="idade"
              error={formik.touched.idade && Boolean(formik.errors.idade)}
              helperText={formik.touched.idade && formik.errors.idade}
              value={formik.values.idade}
              onChange={formik.handleChange}
            />
            <TextField 
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Peso (em kg)"
              name="peso"
              id="peso"
              error={formik.touched.peso && Boolean(formik.errors.peso)}
              helperText={formik.touched.peso && formik.errors.peso}
              value={formik.values.peso}
              onChange={formik.handleChange}
            />

            <FormLabel component="legend">Castrado?</FormLabel>
            <RadioGroup aria-label="castrado" name="castrado" value={formik.values.castrado} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>

            <FormLabel component="legend">Vacinado?</FormLabel>
            <RadioGroup aria-label="vacinas" name="vacinas" value={formik.values.vacinas} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>

            <FormLabel component="legend">Vermifugado nos últimos 3 meses?</FormLabel>
            <RadioGroup aria-label="vermifugo" name="vermifugo" value={formik.values.vermifugo} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>

            <FormLabel component="legend">Socializa bem com outros animais?</FormLabel>
            <RadioGroup aria-label="socializaAnimais" name="socializaAnimais" value={formik.values.socializaAnimais} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>

            <FormLabel component="legend">Socializa bem com crianças?</FormLabel>
            <RadioGroup aria-label="socializaCriancas" name="socializaCriancas" value={formik.values.socializaCriancas} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Sim" />
              <FormControlLabel value="nao" control={<Radio />} label="Não" />
            </RadioGroup>

            <DropzoneArea
              maxFileSize={5242880}
              filesLimit={1}
              inputProps={{ name: "foto" }}
              acceptedFiles={['image/*']}
              onChange={(file) => {
                const blob = new Blob([...file], {type: 'image/jpeg'});
                setImage(blob);
              }}
              onDelete={() => setImage(null)}
              dropzoneText="Os adotantes precisam ver como é o bichinho! Coloque uma foto dele aqui :)" />

            {formik.values.especie === "gato" ? 
                <>
            <FormLabel component="legend">FIV</FormLabel>
            <RadioGroup aria-label="fiv" name="fiv" value={formik.values.fiv} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Positivo" />
              <FormControlLabel value="nao" control={<Radio />} label="Negativo" />
            </RadioGroup>

            <FormLabel component="legend">FeLV</FormLabel>
            <RadioGroup aria-label="FeLV" name="felv" value={formik.values.felv} onChange={formik.handleChange}>
              <FormControlLabel value="sim" control={<Radio />} label="Positivo" />
              <FormControlLabel value="nao" control={<Radio />} label="Negativo" />
            </RadioGroup>
                </>
          : null}

            <Button
              variant="contained"
              className={classes.btnAddPet}
              color="secondary"
              type="submit"
            >
              Adicionar pet
            </Button>
          </form>
          {image ? <img src={URL.createObjectURL(image)} alt="imagem" /> : null}
      </Container>
    </ThemeProvider>
	)
};
