import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ( {cart, order, handleCaptureCheckout, errorMessage} ) => {

	const [activeStep, setActiveStep] = useState(0);
	const [checkoutToken, setCheckoutToken ] = useState(null);
	const [shippingData, setShippingData ] = useState({});

	const classes = useStyles();

	useEffect(() => {

		// Generates token //

		if (cart.id) {
		const generateToken = async () => {
			try {
				const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});
				setCheckoutToken(token);
			} catch (errorMessage) {
				console.log(errorMessage);
			}
		}

		generateToken();
		}

	}, [cart]);

	//stepper functionality
	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );

	//next() receives data from the addressForm, saves it in shippingData and moves the activeStep up
	const next = (data) => {
		setShippingData(data);
		nextStep();
	}

	// Confirmation component //
	let Confirmation = () => order.customer ? (
		<>
			<div>
				<Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
				<Divider className={classes.divider}/>
				<Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
				<Typography variant="subtitle2">The details of the order have been sent to your email :)</Typography>
			</div>
			<br />
			<Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
		</>
	) : (
		<div className={classes.spinner}>
			<CircularProgress />
		</div>
	);

	// Confirmation error //
	if(errorMessage) {
		Confirmation = () => (
			<>
				<Typography variant="h5">Error: {errorMessage}</Typography>
				<br />
				<Button variant="outlined" type="button" component={Link} to="/">Back to Home</Button>
			</>
		);
	}

	// Form component //
	const Form = () => activeStep === 0
		? <AddressForm
			checkoutToken={checkoutToken}
			next={next}/>
		: <PaymentForm
			shippingData={shippingData}
			checkoutToken={checkoutToken}
			nextStep={nextStep}
			backStep={backStep}
			handleCaptureCheckout={handleCaptureCheckout}/>

	return(
		<>
			<CssBaseline />
			<div className={classes.toolbar}/>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography variant="h4" align="center">Checkout</Typography>
					<Stepper activeStep={activeStep} className={classes.stepper}>
						{steps.map((step) => (
							<Step key={step}>
								<StepLabel>{step}</StepLabel>
							</Step>
						))}
					</Stepper>
					{!checkoutToken &&
						(<div className={classes.spinner}>
							<CircularProgress />
								</div>)}
					{activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
				</Paper>
			</main>
		</>
	);
}

export default Checkout;