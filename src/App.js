import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Products, Navbar, Cart, Checkout, ProductDetails } from './components';
import { commerce } from './lib/commerce';
import './App.css';

import NotFound from './components/NotFound';

const App = () => {

	//	States	//

	const [products, setProducts] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [selectedProduct, setSelectedProduct] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [from, setFrom] = useState("");

	//	Fetching functions	//

	const fetchProducts = async () => {
		const { data } = await commerce.products.list({ include : "assets" });
		setProducts(data);
		setAllProducts(data);
	}

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	}


	// Handler functions  //

	const filterProd = (category) => {
		if (category === "all"){
			setProducts(allProducts);
		} else {
			const data = allProducts.filter( prod => prod.categories.some(cat => cat.slug === category));
			setProducts(data);	
		}

	}

	const handleSelectProduct = (id) => {
		setSelectedProduct(products.filter(prod => prod.id === id));	
	}

	// Cart functions //
	const handleAddToCart = async (productId, quantity) => {
		const response = await commerce.cart.add(productId, quantity);
		setCart(response);
	}

	const handleUpdateCartQty = async (productId, quantity) => {
		const response = await commerce.cart.update(productId, { quantity });
		setCart(response);
	}

	const handleRemoveFromCart = async (productId) => {
		const response = await commerce.cart.remove(productId);
		setCart(response);
	}

	const handleEmptyCart = async () => {
		const response = await commerce.cart.empty();
		setCart(response);
	}

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
	}


	// Checkout functions //
	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
			setOrder(incomingOrder);
			refreshCart();
		} catch (error) {
			setErrorMessage(error.data.error.message);
		}
	}

	//	Loading on render	//

	useEffect(() => {
		fetchProducts();
		handleEmptyCart();
		fetchCart();
	}, []);

	return(
		<Router>
			<div>
				<Navbar totalItems={cart.total_items}
						products={products}
						setProducts={setProducts}
						fetchProducts={fetchProducts}
						allProducts={allProducts}/>

				<Routes>
					<Route exact path="/" element={
						   <Products products={products}
						   			handleAddToCart={handleAddToCart}
						   			handleSelectProduct={handleSelectProduct}
						   			filterProd={filterProd}
									setFrom={setFrom}
						   	/>}
					/>
					<Route exact path="/cart" element={
						<Cart cart={cart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							handleEmptyCart={handleEmptyCart}
							handleSelectProduct={handleSelectProduct}
							setFrom={setFrom}
						/>}
					/>
					<Route exact path="/checkout" element={
						<Checkout
							cart={cart}
							order={order}
							handleCaptureCheckout={handleCaptureCheckout}
							errorMessage={errorMessage}
						/>}
					/>
					<Route exact path="/product/:id" element={
						<ProductDetails
							selectedProduct={selectedProduct}
							handleAddToCart={handleAddToCart}
							handleUpdateCartQty={handleUpdateCartQty}
							handleRemoveFromCart={handleRemoveFromCart}
							from={from}
						/>}
					/>
					<Route path="*" element={
						<NotFound/>
					}/>
				</Routes>
			</div>
		</Router>
	);

}

export default App;