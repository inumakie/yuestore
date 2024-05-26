import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import useStyles from './styles';

const Product = ( {product, handleAddToCart, handleSelectProduct} ) => {

	const classes = useStyles();

	return (
			<Card className={classes.root}>
				
				<Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}
				onClick={() => handleSelectProduct(product.id)}>
					<CardMedia
						className={classes.media}
						image={product.image.url}
						component="img"
						title={product.name}/>
				
					<CardContent>
						<div className={classes.cardContent}>
							<Typography variant="h6" gutterBottom className={classes.productName}>
								{product.name}
							</Typography>
						</div>
					</CardContent>
				</Link>

				<CardActions disableSpacing className={classes.cardActions}>
					<Typography variant="h5" className={classes.productPrice}>
						{product.price.formatted_with_symbol}
					</Typography>
					<IconButton aria-label="add to cart" onClick={() => handleAddToCart(product.id, 1)}>
						<AddShoppingCart/>
					</IconButton>
				</CardActions>

			</Card>
	);
}

export default Product;