import FormLogin from '../../components/FormLogin/FormLogin';
import Navbar from '../../components/Navbar/Navbar';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/Context';
import { get } from '../../utils/localStorage';

export default function Login() {
  const { state } = useContext(Context);
  const history = useHistory();

  return(
    <>
      <Navbar />
      <FormLogin />
    </>
  )
};
