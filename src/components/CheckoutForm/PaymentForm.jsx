import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js' 
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ( {checkoutToken, backStep, nextStep, shippingData, handleCaptureCheckout } ) => {

	const handleSubmit = async (e, elements, stripe) => {
		e.preventDefault();
		if(!stripe || !elements ) return;

		const cardElement = elements.getElement(CardElement);

		const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

		if(error){
			console.log(error);
		} else {
			const orderData = {
				list_items: checkoutToken.line_items,
				customer: {
					firstname: shippingData.firstName,
					lastname: shippingData.lastName,
					email: shippingData.email
				},
				shipping: {
					name: 'Primary',
					street: shippingData.address,
					town_city: shippingData.city,
					county_state: shippingData.shippingRegion,
					postal_zip_code: shippingData.zip,
					country: shippingData.shippingCountry
				},
				fulfillment: { shipping_method: shippingData.shippingOption },
				payment: {
					gateway: 'stripe',
					stripe: {
						payment_method_id: paymentMethod.id
					}
				}
			}
			
			handleCaptureCheckout(checkoutToken.id, orderData);
			nextStep();
		}
	}

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
        	{({ elements, stripe }) => (
         		<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            	<CardElement style={{background: 'lightblue'}}/>
           	 	<br /> <br />
					<p style={{
					textAlign: 'center',
					borderRadius: '10px',
					backgroundColor: '#f3e5f5', // Very light purple
					padding: '15px',
					margin: '10px 0'
				}}>
					Test using '4242 4242 4242 4242' for card number, any future month/year value for expiration date and any five-digit number as ZIP code :)</p>
            	<div style={{ display: 'flex', justifyContent: 'space-between' }}>
             		<Button variant="outlined" onClick={backStep}>Back</Button>
             		<Button type="submit" variant="contained" disabled={!stripe} color="primary">
                		Pay {checkoutToken.subtotal.formatted_with_symbol}
              		</Button>
           		</div>
          </form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;

