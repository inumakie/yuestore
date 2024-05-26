import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material';
import FormInput from './FormInput';
import { commerce } from '../../lib/commerce';
import useStyles from './styles';

const AddressForm = ( { checkoutToken, next } ) => {

	const classes = useStyles();

	//Address country, region and option states
	const [shippingCountries, setShippingCountries ] = useState([]);
	const [shippingCountry, setShippingCountry] = useState("");
	const [shippingRegions, setShippingRegions] = useState([]);
	const [shippingRegion, setShippingRegion] = useState("");
	const [shippingOptions, setShippingOptions] = useState([]);
	const [shippingOption, setShippingOption] = useState("");

	//Form validators
	const methods = useForm();

	const emailValidation = {pattern:
								{ value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, //eslint-disable-line
                      			  message: "Invalid email address" }}
    const onlyText = { pattern: { value: /^[^\d]+$/, message: "Only text allowed"}}

	//Object.entries makes arrays out of the state objects, so we can iterate and render them in JSX.
	const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name}));
	const subdivisions = Object.entries(shippingRegions).map(([code, name]) => ({ id: code, label: name}));
	const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

	const fetchShippingCountries = async (checkoutTokenId) => {
		const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
		setShippingCountries(countries);
		setShippingCountry(Object.keys(countries)[0]);
	}

	const fetchRegions = async (countryCode) => {
		const { subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
		setShippingRegions(subdivisions);
		setShippingRegion(Object.keys(subdivisions)[0]);
	}

	const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
		setShippingOptions(options);
		setShippingOption(options[0].id);	
	}

	// Fetches the shipping countries and subsequent changes to country will fetch regions and options.
	useEffect(() => {
		fetchShippingCountries(checkoutToken.id);
	}, []);

	useEffect(() => {
		if (shippingCountry) fetchRegions(shippingCountry);
	}, [shippingCountry]);

	useEffect(() => {
		if (shippingRegion) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingRegion);
	}, [shippingRegion])

	return(
		<>
			<Typography variant="h6" gutterBottom>Shipping Address</Typography>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingRegion, shippingOption}))}>
					<Grid container spacing={3}>
						<FormInput name="firstName" label="First name" rules={onlyText}/>
						<FormInput name="lastName" label="Last name" rules={onlyText}/>
						<FormInput name="address" label="Address"/>
						<FormInput name="email" label="E-mail" rules={emailValidation}/>
						<FormInput name="city" label="City" rules={onlyText}/>
						<FormInput name="zip" label="ZIP code" />

						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Country</InputLabel>
							<Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
								{countries.map((country) => (
									<MenuItem key={country.id} value={country.id}>
										{country.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Region</InputLabel>
							<Select value={shippingRegion} fullWidth onChange={(e) => setShippingRegion(e.target.value)}>
								{subdivisions.map((region) => (
									<MenuItem key={region.id} value={region.id}>
										{region.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel>Shipping Options</InputLabel>
							<Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
								{options.map((option) => (
									<MenuItem key={option.id} value={option.id}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</Grid>
						<br/>
						<div className={classes.buttons}>
							<Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
							<Button type="submit" color="primary" variant="contained">Next</Button>
						</div>
					</Grid>
				</form>
			</FormProvider>
		</>
	);
}

export default AddressForm;