import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import useStyles from './styles';

const CartItem = ( { item, handleUpdateCartQty, handleRemoveFromCart, handleSelectProduct } ) => {

	const classes = useStyles();

	return(
		<Card className={classes.root}>
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
								onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</button>

						<Typography>{item.quantity}</Typography>

						<button type="button"
								size="small"
								variant="outlined"
								className={classes.qtyButton}
								onClick={() => handleUpdateCartQty(item.id, item.quantity + 1) }>+</button>
					</div>
					<Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
				</CardActions>

		</Card>
	);

}

export default CartItem;