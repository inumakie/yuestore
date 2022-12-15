import React, { useRef, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import Slider from './Slider/Slider';
import useStyles from './styles';

const Products = ( { products, handleAddToCart, handleSelectProduct, filterProd, setFrom } ) => {

	const classes = useStyles();

	const elementRef = useRef();

	useEffect(() => {
		setFrom("/");
	}, []);

	return (
		<main className={classes.content}>

			<select name="filter" ref={elementRef} className={classes.select} onChange={() => filterProd(elementRef.current.value)}>
				<option value="all">filter by category</option>
				<option value="audio">audio</option>
				<option value="notebooks">notebooks</option>
				<option value="music-instruments"> music instruments</option>
			</select>

			<Slider products={products} filterProd={filterProd} />

			<Grid container justifyContent="center" spacing={4}>
				{products.map( (product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product
							product={product}
							handleAddToCart={handleAddToCart}
							handleSelectProduct={handleSelectProduct}
						/>
					</Grid>
				))
				}
			</Grid>

		</main>
		);
}

export default Products;