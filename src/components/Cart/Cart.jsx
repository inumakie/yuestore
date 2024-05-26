import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import CartItem from './CartItem/CartItem';

import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart, handleSelectProduct, setFrom }) => {

	const classes = useStyles();

	useEffect(() => {
		setFrom("/cart");
	}, []);

	const EmptyCart = () => (
		<Typography variant="subtitle1" align="center" className={classes.emptyText}>
			You have no items in your shopping cart... 
			<Link to="/" className={classes.link}>start adding some!</Link>
		</Typography>
	);

	const FilledCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map( (item) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
						<CartItem item={item}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleSelectProduct={handleSelectProduct}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cartDetails}>
				<Typography variant="h4" className={classes.subtotal}>
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div className={classes.buttons}>
					<Button
						className={classes.emptyButton}
						type="button"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
					Empty cart
					</Button>
					<Button
						className={classes.checkoutButton}
						variant="contained"
						color="primary"
						component={Link}
						to="/checkout"
					>
					Checkout
					</Button>
				</div>
			</div>
		</>
	);


	if (!cart.line_items) return 'Loading...';

	return(
		<Container className={classes.container}>
			<Typography className={classes.title} variant="h4" align="center" gutterBottom>Your shopping cart</Typography>
			{ !cart.line_items.length ? <EmptyCart /> : <FilledCart />}
		</Container>
	);
}

export default Cart;