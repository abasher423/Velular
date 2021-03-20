import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import title from '../images/title.png';
import Link from 'react-router-dom/Link'
import SearchIcon from '@material-ui/icons/Search';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { logout } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "2rem"
  },
  title: {
    flexGrow: 1,
    fontWeight: '500'
  },
  logo: {
      marginTop: '15px',
      width: '250px',
      height: 'auto'
  },
  breadcrumbs: {
      marginBottom: '25px',
      fontWeight: '500'
  },
  icons: {
      margin: '5px 0'
  },
  typography: {
    h6: {
      "fontWeight": 600,
    }
  },
  loggedIn: {
      backgroundColor: theme.palette.success.main,
      color: 'white'
  }
}));

const Header = ({ history }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);



    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutHandler = () => {
        dispatch(logout());
        setAnchorEl(null);
    };

    // https://material-ui.com/components/menus/

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Container>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    <Link to={'/'}>
                        <img src={title} alt="logo" className={classes.logo}/>
                    </Link>
                    <Button className={classes.breadcrumbs} color="inherit" component={Link} to={'/products'} >Shop</Button>
                    <Button className={classes.breadcrumbs} color="inherit" component={Link} to={'/products/brands'} >Brands</Button>
                    <Button className={classes.breadcrumbs} color="inherit" component={Link} to={'/favourites'} >Favourites</Button>
                    <Button className={classes.breadcrumbs} color="inherit" component={Link} to={'/services'} >services</Button>
                    </Typography>
                    
                    <IconButton edge="start" className={classes.icons} color="inherit" component={Link} to={'/search'} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.icons} color="inherit" component={Link} to={'/favourites'} aria-label="favorite">
                        <FavoriteBorderIcon />
                    </IconButton>
                    <IconButton edge="start" className={classes.icons} component={Link} to={'/cart'} color="inherit" aria-label="cart">
                        <ShoppingBasketOutlinedIcon />
                    </IconButton>
                    { userInfo ? (
                        <div>
                            <Button 
                                className={userInfo ? classes.loggedIn : ''}
                                variant="contained"
                                color="primary"
                                onClick={handleClick}>
                                    {userInfo.firstName}
                                </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={'/profile'} onClick={handleClose}>Profile</MenuItem>
                                <MenuItem component={Link} to={'/account'} onClick={handleClose}>Account</MenuItem>
                                <MenuItem component={Link} to={'/orders'} onClick={handleClose}>Orders</MenuItem>
                                <MenuItem component={Link} to={'/help'} onClick={handleClose}>Help</MenuItem>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) :
                    <IconButton edge="start" className={classes.icons} component={Link} to={'/login'} color="inherit" aria-label="login">
                        <PersonOutlineOutlinedIcon />
                    </IconButton>}
                </Toolbar>
                </Container>
            </AppBar>
        </div>
        );
};

export default Header;