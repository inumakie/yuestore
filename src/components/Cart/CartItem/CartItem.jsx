import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, CardActions, CardContent, CardMedia, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

const CartItem = ( { item, handleUpdateCartQty, handleRemoveFromCart, handleSelectProduct, cartLoading, setCartLoading } ) => {

	const classes = useStyles();

	const handleQtyUpdate = async (newQty) => {

		try {
			await handleUpdateCartQty(item.id, newQty);
		} catch (error) {
			console.error('Error updating quantity:', error);
		}
    };

	return(
		<Card className={classes.root} style={{ opacity: cartLoading ? 0.3 : 1 }}>
			<Link to={`/product/${item.product_id}`} style={{textDecoration: 'none'}}
			onClick={() => handleSelectProduct(item.product_id)}>

				<CardMedia image={item.image.url}
						alt={item.name}
						className={classes.media}
						component="img" />

				<CardContent className={classes.cardContent}>
					<Typography variant="h5" className={classes.productName}>{item.name}</Typography>
					<Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
				</CardContent>
			</Link>

			<CardActions className={classes.cardActions}>
				<div className={classes.buttons}>
					<button type="button"
							size="small"
							variant="outlined"
							className={classes.qtyButton}
							onClick={() => handleQtyUpdate(item.quantity - 1)}>-</button>

					<Typography>{item.quantity}</Typography>

					<button type="button"
							size="small"
							variant="outlined"
							className={classes.qtyButton}
							onClick={() => handleQtyUpdate(item.quantity + 1)}>+</button>
				</div>
				<Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
			</CardActions>
            {cartLoading && <CircularProgress className={classes.loadingSpinner} />}
		</Card>
	);

}

export default CartItem;