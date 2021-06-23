import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, TextField, Button, Typography, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import { baseFont } from '../../assets/theme';

export default function SignUpForm() {
	const { dispatch } = useContext(Context);
	const [user, setUser] = useState();
	const [tipo, setTipo] = useState();
  const history = useHistory();

  const handleType = (event) => {
    setTipo(event.target.value);
  };

	const signupSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email('Ops... este email não parece correto!')
      .required('Campo obrigatório'),
    senha: yup
      .string()
      .trim()
      .matches(/[A-Z]/, 'Ao menos uma letra maiúscula')
      .matches(/[a-z]/, 'Ao menos uma letra minúscula')
      .matches(/[!@#%^&*+=_?-]/, 'Ao menos um caractere especial')
      .min(8, 'Ao menos 8 caracteres')
      .max(50, 'No máximo 50 caracteres')
      .required('Campo obrigatório'),
    confirmarSenha: yup
      .string()
      .trim()
      .oneOf([yup.ref('senha'), null], 'Senhas diferentes')
      .required('Campo obrigatório'),
    nome: yup
      .string()
      .trim()
      .required(),
    cpf: yup
      .string()
      .trim()
      .matches(/[0-9]/, 'Apenas números')
      .min(11, 'Insira os números do seu CPF')
      .required(),
    telefone: yup
      .string()
      .trim()
      .required()
      .matches(/[0-9]/, 'Apenas números')
      .min(10, 'Digite seu DDD e número de telefone')
      .max(11, 'Apenas números'),
    tipo: yup
      .string()
      .oneOf(['adotante', 'protetor'])
      .required(),
    nomeOng: yup
      .string(),
    cnpj: yup
      .string()
      .matches(/[0-9]/, 'Apenas números')
      .min(14, 'Digite todos os números do CNPJ')
  });

	useEffect(() => {
    if (user) {
      dispatch({
        type: 'PROVIDE_USER',
        payload: user
      });
    }
  }, [user, dispatch]);
	
  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      confirmarSenha: '',
      nome: '',
      cpf: '',
      telefone: '',
      tipo: '',
      nomeOng: '',
      cnpj: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values, helpers) => {
      try {
        if (values.tipo === 'adotante') {
          delete values.nomeOng;
          delete values.cnpj
        }
        delete values.confirmarSenha;
        const user = await axios.post(process.env.REACT_APP_SIGNUP, values, {
          withCredentials: true
        });
        setUser(user.data);
        history.push('/dashboard');
      } catch (error) {
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
    btnSignup: {
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
        <Typography variant="h5" className={classes.formText}>Cadastre-se</Typography>
          <form className={classes.container} onSubmit={formik.handleSubmit}>
            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Nome completo"
              name="nome"
              id="nome"
              error={formik.touched.nome && Boolean(formik.errors.nome)}
              helperText={formik.touched.nome && formik.errors.nome}
              value={formik.values.nome}
              onChange={formik.handleChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="E-Mail"
              name="email"
              id="email"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formInput}
              type="password"
              variant="standard"
              label="Senha"
              name="senha"
              id="senha"
              error={formik.touched.senha && Boolean(formik.errors.senha)}
              helperText={formik.touched.senha && formik.errors.senha}
              value={formik.values.senha}
              onChange={formik.handleChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formInput}
              type="password"
              variant="standard"
              label="Confirme sua senha"
              name="confirmarSenha"
              id="confirmarSenha"
              error={formik.touched.confirmarSenha && Boolean(formik.errors.confirmarSenha)}
              helperText={formik.touched.confirmarSenha && formik.errors.confirmarSenha}
              value={formik.values.confirmarSenha}
              onChange={formik.handleChange}
            />
            <TextField 
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Insira seu CPF"
              name="cpf"
              id="cpf"
              error={formik.touched.cpf && Boolean(formik.errors.cpf)}
              helperText={formik.touched.cpf && formik.errors.cpf}
              value={formik.values.cpf}
              onChange={formik.handleChange}
            />
            <TextField
              required
              fullWidth
              className={classes.formInput}
              variant="standard"
              label="Telefone com DDD"
              name="telefone"
              id="telefone"
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
              value={formik.values.telefone}
              onChange={formik.handleChange}
            />
            <Select
              required
              autoWidth
              className={classes.formInput}
              variant="standard"
              name="tipo"
              id="tipo"
              label="tipo"
              defaultValue=''
              value={formik.values.tipo}
              onChange={(event) => {handleType(event); formik.handleChange(event)}}
              >
                <MenuItem value={'protetor'}>Protetor</MenuItem>
                <MenuItem value={'adotante'}>Adotante</MenuItem>
             </Select>
            {tipo === 'protetor' ? 
                <>
                  <TextField
                    required
                    fullWidth
                    className={classes.formInput}
                    variant="standard"
                    label="Nome da ONG"
                    name="nomeOng"
                    id="nomeOng"
                    error={formik.touched.nomeOng && Boolean(formik.errors.nomeOng)}
                    helperText={formik.touched.nomeOng && formik.errors.nomeOng}
                    value={formik.values.nomeOng}
                    onChange={formik.handleChange}
                    />
                  <TextField
                    required
                    fullWidth
                    className={classes.formInput}
                    variant="standard"
                    label="CNPJ da ONG"
                    name="cnpj"
                    id="cnpj"
                    error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                    helperText={formik.touched.cnpj && formik.errors.cnpj}
                    value={formik.values.cnpj}
                    onChange={formik.handleChange}
                  />
                </>
          : null}
            <Button
              variant="contained"
              className={classes.btnSignup}
              color="secondary"
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
      </Container>
    </ThemeProvider>
	)
};
