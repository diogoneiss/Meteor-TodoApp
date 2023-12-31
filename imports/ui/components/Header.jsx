import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StyledLink from './mui/StyledLink';
import { useLocation, useNavigate } from "react-router-dom";

const UserPhoto = ({ user }) => {
  return (
    <ListItemIcon>
      {user.profile.foto ? (
        <img
          src={user.profile.foto}
          alt={user.username}
          style={{
            width: '24px',
            height: '24px',
            objectFit: 'cover',
          }}
        />
      ) : (
        <IconButton
          size="large"
          aria-label="account of current user"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      )}
    </ListItemIcon>
  );

}


export default function MenuAppBar({ user }) {

  const [title, setTitle] = React.useState("App");

  const location = useLocation();
  const navigate = useNavigate();

  const getTitleByLocation = () => {
    //regex para lidar com os ids das tarefas
    if (/^\/app\/.*$/.test(location.pathname)) {
      return "Visualizando tarefa";
    }
    switch (location.pathname) {
      case '/login': return 'Login';
      case '/signup': return 'Cadastro de conta';
      case '/app': return 'Lista de tarefas';
      case '/account': return 'Minha conta';
      case '/': return 'Bem vindo';
      case '/reset-password': return 'Redefinir senha';
      default: return 'Aplicação lista de tarefas';
    }
  };


  React.useEffect(() => {
    setTitle(getTitleByLocation);
  }, [location]);

  const handleLogout = () => Meteor.logout();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box marginBottom={3} sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {user && (
            <div>
              <Box aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu} display="flex" alignItems="center">

                <UserPhoto user={user} />

                <Typography
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {user.username}
                </Typography>
              </Box>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem >
                  <StyledLink to="/account">Minha conta</StyledLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ marginLeft: "1rem" }}>
          <ListItem button onClick={() => { navigate("/") }}>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {user && (
            <ListItem button>
              <UserPhoto user={user} />
              <StyledLink to="/account"> 
                <ListItemText primary={`Conta - ${user.username}`} />
              </StyledLink>

            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}