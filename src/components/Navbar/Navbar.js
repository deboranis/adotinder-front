import { useContext } from 'react';
import axios from 'axios';
import { Link as ReactLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Link } from "@material-ui/core";
import { baseFont, themeColors } from '../../assets/theme';
import adotinder_logo from '../../assets/adotinder_logo.png';
import { Context } from '../../context/Context';
import { get, remove } from '../../utils/localStorage';

const theme = createMuiTheme(themeColors);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 60,
  },
  appbar: {
    backgroundColor: theme.palette.status.warning,
  },
  menuBtn: {
    fontWeight: 700,
    fontSize: '1em',
    fontFamily: baseFont.typography.fontFamily,
    color: theme.palette.status.success,
  }
}));

export default function ButtonAppBar() {
  const { state, dispatch } = useContext(Context);
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => history.push('/login');
  const logout = () => {
    axios.get(process.env.REACT_APP_LOGOUT, { withCredentials: true }) // dizendo pro axios mandar cookies
			.then(() => {
				dispatch({
					type: "PROVIDE_USER",
					payload: {},
				});
        remove();
        history.push('/');
			});
  }

  return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <ThemeProvider theme={baseFont}>
            <Toolbar>
              <IconButton edge="start" aria-label="menu">
                <Link component={ReactLink} to="/">
                <img className={classes.logo} alt="logo do adotinder" src={adotinder_logo} />
                </Link>
              </IconButton>
              {!get('authed')
              ? <Button onClick={handleClick} className={classes.menuBtn}>Login</Button>
              : get('authed') && history.location.pathname === '/dashboard'
              ? null
              : <Button component={ReactLink} to="/dashboard" className={classes.menuBtn}>Dashboard</Button> }
              <Button className={classes.menuBtn}>Sobre</Button>
              {state.user.email || get('authed') 
              ? 
              <Button onClick={logout} className={classes.menuBtn}>Logout</Button> 
              : null }
            </Toolbar>
          </ThemeProvider>
        </AppBar>
      </div>
  );
}
