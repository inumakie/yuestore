import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const ProductDetails = ( {selectedProduct, handleAddToCart, handleUpdateCartQty, from} ) => {

	const [prodQuantity, setProdQuantity] = useState(1);
	const [zoom, setZoom] = useState(1);
	const [isDragging, setIsDragging] = useState(false); // Dragging state
	const [position, setPosition] = useState({ x: 0, y: 0 }); // Position state
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Start position state

	const classes = useStyles();

	const handleProdQuantityUpdate = (operation) => {
		if (operation === "+") {setProdQuantity(prodQuantity + 1)}
		else if (operation === "-" && prodQuantity > 1) {setProdQuantity(prodQuantity - 1)}
	}

	const handleZoomIn = () => {
		setZoom(prevZoom => Math.min(prevZoom + 0.1, 5)); // Cap the zoom in at 2x
	};
	
	const handleZoomOut = () => {
		setZoom(prevZoom => Math.max(prevZoom - 0.1, 1)); // Cap the zoom out at 1x (original size)
	};


	const handleMouseDown = (e) => {
		setIsDragging(true);
		setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
	};

	const handleWheel = (e) => {
		e.preventDefault(); // Prevent default scrolling behavior
	
		const delta = e.deltaY; // Get the delta value of the wheel event
	
		// Adjust zoom based on scroll direction
		if (delta > 0) {
			handleZoomOut();
		} else {
			handleZoomIn();
		}
	};

	useEffect(() => {
        window.scrollTo(0, 0);
		window.addEventListener('wheel', handleWheel);

		const handleMouseMove = (e) => {
			if (isDragging) {
				setPosition({ x: e.clientX - startPosition.x, y: e.clientY - startPosition.y });
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('wheel', handleWheel);
		};
    }, [isDragging, startPosition]);
	
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
								style={{ transform: `scale(${zoom})  translate(${position.x}px, ${position.y}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-in-out' }}
								onMouseDown={handleMouseDown}
							/>
							<div className={classes.zoomButtons}>
								<Button onClick={handleZoomIn} variant="outlined">+</Button>
								<Button onClick={handleZoomOut} variant="outlined">-</Button>
							</div>

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