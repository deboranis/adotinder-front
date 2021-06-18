import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { get, set } from '../utils/localStorage';

export default function useToken() {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    console.log(get('authed'));
    if (!state.user.email && !get('authed')) {
      axios.get(process.env.REACT_APP_GET_TOKEN, { withCredentials: true }) // dizendo pro axios mandar cookies
			.then((data) => {
				dispatch({
					type: "PROVIDE_USER",
					payload: data.data,
				});
        set('authed', { success: true });
			});
    }
  }, []);
}