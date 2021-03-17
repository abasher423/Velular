import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Button, Typography, Avatar, Divider, Paper, List, ListItem, ListItemAvatar, ListItemText, FormControl, Select, MenuItem, IconButton, Card, CardContent } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { addToCart } from '../actions/cartActions';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    title: {
        marginBottom: "2rem"
    },
    item: {
        margin: "0 2rem"
    },
    drawerPaper: { 
        width: "900px",
        height: "100px",
        margin: "1rem 0",
        background: "#f5f5f5" 
    },
    box: {
        display: "flex",
        justifyContent: "space-between"
    }
  }));

const CartScreen = ({ match, location, history}) => {
    // const productId = match.params.cartId;
    // const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    // useEffect(() => {
	// 	if (productId) dispatch(addToCart(productId, qty))
	// }, [dispatch, productId, qty])
    const classes = useStyles();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart)

    const removeFromCartHandler = (productId) => {
        console.log("remove");
    };
    
    return (
        <Container>
            <Typography variant="h2" component="h2" className={classes.title}>Shopping Cart</Typography>
            <Card className={classes.root} variant="outlined">
            <CardContent justify="space-between">
                <div className={classes.box}>
                    <Typography gutterBottom>Items</Typography>
                    <Typography variant="h5"gutterBottom>5</Typography>
                </div>
                <Divider style={{margin: "0.5rem 0"}}/>
                <div className={classes.box}>
                    <Typography gutterBottom>Subtotal</Typography>
                    <Typography variant="h5"gutterBottom>£10</Typography>
                </div>
            </CardContent>
            </Card>
            {cartItems.length === 0 
                ?   <div>
                    <Button variant="contained" color="secondary"  component={Link} to={'/products'}style={{ marginBottom: "2rem"}}>go back</Button>
                    <Message status="info" text="Your cart is empty" />
                </div>  
                : (
                <List dense className={classes.root}>
                    {cartItems.map(item => {
                        return (
                            <Paper className={classes.drawerPaper}>
                                <ListItem key={item.productId} Button>
                                <ListItemAvatar className={classes.item}>
                                    <Avatar alt="product image" src={item.productImage}  className={classes.large}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.name}/>
                                <ListItemText primary={`£${item.price}`} style={{margin: "0 10rem"}}/>
                                <ListItemText primary={
                                    <FormControl className={classes.formControl}>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    style={{margin: "0 10rem"}}
                                    value={item.quantity}
                                    onChange={e => dispatch(addToCart(item.productId, Number(e.target.value)))}
                                    >
                                    {
                                        [...Array(item.quantityInStock).keys()].map(x => (
                                            <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                                } />
                                <ListItemText primary={
                                    <IconButton aria-label="delete" onClick={() => removeFromCartHandler(item.productId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                } />
                            </ListItem>
                            </Paper>
                            
                            
                        )
                    })}
                </List>
            )}
        </Container>
    );
}

export default CartScreen;

{/* <Card className={classes.root} variant="outlined">
                            <CardContent justify="space-between">
                                <div className={classes.box}>
                                    <Typography gutterBottom>Price</Typography>
                                    <Typography variant="h5"gutterBottom>{`£${product.price}`}</Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                                
                                <div className={classes.box}>
                                    <Typography color="success" gutterBottom>Status</Typography>
                                    <Typography 
                                    color="success" 
                                    gutterBottom 
                                    style={product.quantityInStock > 0 ? {color: "#81c784"} : {color: "red"}}>
                                        {product.quantityInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Typography>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>

                                <div className={classes.box}>
                                    <Typography color="success" gutterBottom>Quantity</Typography>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={quantity}
                                        onChange={handleQtyChange}
                                        >
                                        {
                                            [...Array(product.quantityInStock).keys()].map(x => (
                                                <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                            ))
                                        }
                                        </Select>
                                    </FormControl>
                                </div>
                                <Divider style={{margin: "0.5rem 0"}}/>
                            </CardContent>
                            <CardActions>
                                <Button 
                                variant="outlined" 
                                color="primary" 
                                size="small" 
                                className={classes.btn}
                                onClick={addToCartHandler} 
                                disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                            </Card> */}