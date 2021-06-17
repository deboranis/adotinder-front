import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Link } from "@material-ui/core";
import { themeColors } from '../../assets/theme';
import adotinder_logo from '../../assets/adotinder_logo.png';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: 50,
  },
  appbar: {
    backgroundColor: themeColors.white,
    color: themeColors.orange,
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  function handleClick() {
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} aria-label="menu">
            <Link component={ReactLink} to="/">
            <img className={classes.logo} alt="logo do adotinder" src={adotinder_logo} />
            </Link>
          </IconButton>
          <Button onClick={handleClick} color="inherit">Login</Button>
          <Button color="inherit">Sobre</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
