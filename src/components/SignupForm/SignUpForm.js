import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../context/Context';

export default function SignupForm({ classes }) {
	const { state, dispatch } = useContext(Context);
	const [user, setUser] = useState();
  const history = useHistory();

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
      .isValid('protetor')
      .isValid('adotante')
      .required(),
    nomeOng: yup
      .string(),
    cnpj: yup
      .string()
      .matches(/[0-9]/, 'Apenas números')
      .min(16, 'Apenas números')
  });

	useEffect(() => {
    if (user) {
      dispatch({
        type: 'PROVIDE_USER',
        payload: user
      });
    }
  }, [user]);
	
  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      confirmarSenha: ''
    },
    validationSchema: signupSchema,
    onSubmit: async (values, helpers) => {
      try {
        const mapped = { email: values.email, senha: values.senha }
        const user = await axios.post(`${process.env.REACT_APP_SIGNUP}/auth/signup`, values, {
          withCredentials: true
        });
        setUser(user.data);
        history.push('/dashboard');
      } catch (error) {
        if (error.response.data?.type === 'User-Repo-Create-email') {
          helpers.setFieldError('email', 'Já existe um usuário com esse email');
        }
        if (error.response.data?.type === 'User-Exists') {
          helpers.setFieldError('nickname', 'Essa conta já existe');
          helpers.setFieldError('email', 'Essa conta já existe');
        }
      }
    }
  });

	return (
		<Container maxWidth="xs">
      <Typography variant="h5">Cadastre-se</Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              fullWidth
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
              variant="standard"
              label="Telefone com DDD"
              name="telefone"
              id="telefone"
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
              value={formik.values.telefone}
              onChange={formik.handleChange}
            />
            {/* COLOCAR O RADIAL, CNPJ E NOME DA ONG */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Cadastrar
            </Button>
            </form>
    </Container>
	)
}