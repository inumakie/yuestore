import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AddShoppingCart } from '@mui/icons-material';
import useStyles from './styles';

const ProductDetails = ( {selectedProduct, handleAddToCart, handleUpdateCartQty, from} ) => {

	const classes = useStyles();

	const [prodQuantity, setProdQuantity] = useState(1);

	const handleProdQuantityUpdate = (operation) => {
		if (operation === "+") {setProdQuantity(prodQuantity + 1)}
		else if (operation === "-" && prodQuantity > 1) {setProdQuantity(prodQuantity - 1)}
	}
	
	return (
		<Container>
			<div className={classes.toolbar}/>
			{selectedProduct.map(prod => {

				const [selectedImg, setSelectedImg] = useState(prod.image.url);

				return (
				<Grid container className={classes.container} spacing={2} key={prod.id}>

					<Grid item lg={6} md={6} sm={12}>
						<Card className={classes.imageCard}>
							<Link to={from}>
								<CloseIcon className={classes.closeIconProd}/>
							</Link>
							<CardMedia
								image={selectedImg}
								className={classes.media}
								component="img"
							/>
						</Card>
						<div className={classes.productImages}>
							{prod.assets.map( (asset) => (
								<img
									src={asset.url}
									alt=""
									className={classes.assets}
									onClick={() => {setSelectedImg(asset.url)}}
									key={asset.id}
									/>
								)
							)}
						</div>
					</Grid>

					<Grid item lg={6} md={6} sm={12}>
						<Card style={{position: 'relative'}}>
							<Link to={from}>
								<CloseIcon className={classes.closeIcon}/>
							</Link>

							<CardContent className={classes.cardContent}>
								<Typography variant="h5"
											gutterBottom
											className={classes.prodName}
											>{prod.name}</Typography>

								<div className={classes.priceAndAddContainer}>
									<Typography variant="h5" className={classes.price}>{prod.price.formatted_with_symbol}</Typography>
									
									<div className={classes.qtyAndCart}>
										<CardActions className={classes.cardActions}>
											<div className={classes.buttons}>
												<button
													type="button"
													size="small"
													onClick={() => handleProdQuantityUpdate("-")}
													variant="outlined"
													className={classes.qtyButton}>
													-</button>
												<Typography style={{padding: '0px 10px'}}>{prodQuantity}</Typography>
												<button
													type="button"
													size="small"
													onClick={() => handleProdQuantityUpdate("+")}
													variant="outlined"
													className={classes.qtyButton}>
													+</button>
											</div>
										</CardActions>

										<Button
											aria-label="add to cart"
											startIcon={<AddShoppingCart/>}
											onClick={() => handleAddToCart(prod.id, prodQuantity)}
											variant="outlined"
											style={{marginLeft: '20px', marginRight: '10px'}}
											>
										ADD TO CART	 
										</Button>
									</div>
								</div>

								<Typography
									variant="body2"
									dangerouslySetInnerHTML={{ __html: prod.description}}
									style={{textDecoration: 'none'}}
									/>
							</CardContent>

						</Card>
					</Grid>
				</Grid>

			)

			} )}
		</Container>
	);
}

export default ProductDetails;