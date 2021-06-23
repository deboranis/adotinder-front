/* eslint no-restricted-globals: "off" */
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, TextField, Button, Typography } from '@material-ui/core';
import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import { remove } from '../../utils/localStorage';
import { makeStyles } from '@material-ui/core/styles';
import { themeColors, baseFont, coolFont } from "../../assets/theme";

export default function FormEditUser() {
	const { dispatch } = useContext(Context);
	const [user, setUser] = useState({
    email: '',
    cpf: '',
    telefone: '',
    tipo: '',
    nomeOng: '',
    cnpj: '',
  });
  const history = useHistory();

  useEffect(() => {
    axios.get(process.env.REACT_APP_USER_EDIT, { withCredentials: true }).then((data) => {
      setUser(data.data);
    }) //withCredentials é uma prop de config do axios
  }, []);

  const deleteUser = () => {
    axios.delete(process.env.REACT_APP_USER_DELETE, { withCredentials: true }).then(() => {
      remove();
      dispatch({
        type: 'PROVIDE_USER',
        payload: {},
      })
    });
  };

	const editSchema = yup.object({
    email: yup
      .string()
      .trim()
      .email('Ops... este email não parece correto!')
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
      .string()
      .when('tipo', { is: 'protetor', then: yup.string().required('Insira o nome de registro da organização') }),
    cnpj: yup
      .string()
      .when('tipo', {
        is: 'protetor',
        then: yup.string()
          .matches(/[0-9]/, 'Apenas números')
          .min(14, 'Digite todos os números do CNPJ')
          .required('Insira o CNPJ da organização')
      })
  });
	
  const formik = useFormik({
    initialValues: {
      email: user.email,
      nome: user.nome,
      cpf: user.cpf,
      telefone: user.telefone,
      tipo: user.tipo,
      nomeOng: user.nomeOng,
      cnpj: user.cnpj,
    },
    validationSchema: editSchema,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      try {
        if (values.tipo === 'adotante') {
          delete values.nomeOng;
          delete values.cnpj
        }
        delete values.cpf;
        delete values.tipo;
        const user = await axios.post(process.env.REACT_APP_USER_EDIT, values, {
          withCredentials: true
        });
        dispatch({ 
          type: 'PROVIDE_USER',
          payload: user.data,
         });
        history.push('/dashboard');
      } catch (error) {
        if (error.response.data?.type === 'User-Repo-Create-email') {
          helpers.setFieldError('email', 'Já existe um usuário com esse email');
        }
        if (error.response.data?.type === 'User-Exists') {
          helpers.setFieldError('email', 'Essa conta já existe');
        }
      }
    }
  });

  const useStyles = makeStyles(() => ({
    formContainer: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      padding: 0,
    },
    formField: {
      marginTop: 10,
      fontFamily: baseFont.typography.fontFamily,
      color: "grey",
    },
    formBtn: {
      fontFamily: baseFont.typography.fontFamily,
      marginTop: 10,
      width: "60%",
      backgroundColor: themeColors.palette.status.error,
      color: themeColors.palette.status.warning,
    },
    formBtnErase: {
      fontFamily: baseFont.typography.fontFamily,
      marginTop: 10,
      width: "60%",
      backgroundColor: themeColors.palette.status.warning,
      color: themeColors.palette.status.error,
      fontWeight: 600,
      border: `2px solid ${themeColors.palette.status.warning}`,
    },
    formTitle: {
      fontFamily: coolFont.typography.fontFamily,
      color: themeColors.palette.status.error,
    },
  }));

  const classes = useStyles();

	return (
		<Container className={classes.formContainer}>
      <Typography className={classes.formTitle} variant="h5">Atualizar Cadastro</Typography>
            <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              className={classes.formField}
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
              className={classes.formField}
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
              disabled
              className={classes.formField}
              variant="standard"
              label="CPF"
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
              className={classes.formField}
              variant="standard"
              label="Telefone com DDD"
              name="telefone"
              id="telefone"
              error={formik.touched.telefone && Boolean(formik.errors.telefone)}
              helperText={formik.touched.telefone && formik.errors.telefone}
              value={formik.values.telefone}
              onChange={formik.handleChange}
            />
              {user.tipo === 'protetor' ? <TextField
                required
                fullWidth
                className={classes.formField}
                variant="standard"
                label="Nome da ONG"
                name="nomeOng"
                id="nomeOng"
                error={formik.touched.nomeOng && Boolean(formik.errors.nomeOng)}
                helperText={formik.touched.nomeOng && formik.errors.nomeOng}
                value={formik.values.nomeOng}
                onChange={formik.handleChange}
                /> : null }
              {user.tipo === 'protetor' ? <TextField
                required
                fullWidth
                className={classes.formField}
                variant="standard"
                label="CNPJ da ONG"
                name="cnpj"
                id="cnpj"
                error={formik.touched.cnpj && Boolean(formik.errors.cnpj)}
                helperText={formik.touched.cnpj && formik.errors.cnpj}
                value={formik.values.cnpj}
                onChange={formik.handleChange}
              /> : null}

            <Button
              className={classes.formBtn}
              variant="contained"
              type="submit"
            >
              Alterar dados
            </Button>

          </form>
        <Button
          className={classes.formBtnErase}
          variant="contained"
          type="button"
          onClick={() => {
            let result = confirm('Você realmente quer apagar sua conta? Esta ação é irreversível e removerá todos os seus dados do aplicativo, como animais adotados/cadastrados.')
            if(result) {
              deleteUser();
              remove();
              history.push('/');
            }
          }}
        >
        Apagar conta
        </Button>
    </Container>
	)
}