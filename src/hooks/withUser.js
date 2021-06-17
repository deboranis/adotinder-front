import axios from 'axios';
import { useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { set } from '../utils/localStorage';

export default function useToken() {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    if (!state.user.email) {
      axios.get(process.env.REACT_APP_GET_TOKEN, { withCredentials: true }) // dizendo pro axios mandar cookies
			.then((data) => {
				dispatch({
					type: "PROVIDE_USER",
					payload: data.data,
				});
        set('authed', { success: true });
			}).catch(() => set('authed', { success: false }));
    }
  }, []);
}