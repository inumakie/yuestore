import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, CircularProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ( {product, handleAddToCart, handleSelectProduct } ) => {

	const classes = useStyles();
	const [loading, setLoading] = useState(true);

	const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <Card className={classes.root}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }} onClick={() => handleSelectProduct(product.id)}>
                <div className={classes.media}>
                    {loading && (
                        <div className={classes.spinner}>
                            <CircularProgress />
                        </div>
                    )}
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={product.image.url}
                        title={product.name}
                        onLoad={handleImageLoad}
                        style={{ display: loading ? 'none' : 'block' }}
                    />
                </div>
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
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;