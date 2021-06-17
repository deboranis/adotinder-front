import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import { set } from '../../utils/localStorage';

export default function FormLogin({ classes }) {
	const { dispatch } = useContext(Context);
  const history = useHistory();

	const loginSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email('Ops... este email não parece correto!'),
    senha: yup
      .string()
      .trim()
      .required('Campo obrigatório'),
  });
  // validando os inputs do form de login com yup
	
  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    // inicializando o objeto com email e senha
    validationSchema: loginSchema,
    onSubmit: async (values, helpers) => {
      try {
        const user = await axios.post(process.env.REACT_APP_LOGIN, values, {
          withCredentials: true
        });
        dispatch({
          type: 'PROVIDE_USER',
          payload: user.data,
        });
        set('authed', { success: true })
        history.push('/dashboard');
      } catch (error) {
        if (error.response.data?.type === 'User-Invalid-Credentials') {
          // esse operador pergunta se existe dentro do objeto 'data' que vem no response um campo chamado 'type' e, se houver, se o valor dele é 'User-Invalid-Credentials'
          helpers.setFieldError('email', 'Usuário ou senha incorretos');
          helpers.setFieldError('senha', 'Usuário ou senha incorretos');
        }
      }
    }
  });

	return (
		<Container maxWidth="xs">
      <Typography variant="h5">Acessar</Typography>
        <form onSubmit={formik.handleSubmit}>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Entrar
            </Button>
            </form>
    </Container>
	)
};