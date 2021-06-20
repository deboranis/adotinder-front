import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { set, remove } from '../utils/localStorage';

export default function useToken(locationState) {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(state.user).length < 1 && arguments.length === 0 || !locationState) {
      axios.get(process.env.REACT_APP_GET_TOKEN, { withCredentials: true }) // dizendo pro axios mandar cookies
			.then((data) => {
        if (data.data.email) {
          dispatch({
            type: "PROVIDE_USER",
            payload: data.data,
          });
          set('authed', { success: true });
        }
			})
      .catch((error) => remove());
    }
  }, []);
}