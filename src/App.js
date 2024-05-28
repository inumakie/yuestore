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
    const [cart, setCart] = useState({ line_items: [], total_items: 0 });
    const [optimisticCart, setOptimisticCart] = useState({ line_items: [], total_items: 0 });
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
		// Ensure optimisticCart.line_items is defined and is an array
		const currentLineItems = optimisticCart.line_items || [];

		// Create a copy of the current cart items
		const newCartItems = [...currentLineItems];

		// Find and update the product in the cart items
		const itemIndex = newCartItems.findIndex(item => item.product_id === productId);

		if (itemIndex > -1) {
			// Product already exists in the cart, update the quantity
			newCartItems[itemIndex].quantity += quantity;
		} else {
			// Product does not exist in the cart, add a new entry
			newCartItems.push({
				product_id: productId,
				quantity,
				// Add other necessary product details here if needed
			});
		}

		// Update the optimistic cart state with the new cart items and total item count
		const newOptimisticCart = {
			...optimisticCart,
			line_items: newCartItems,
			total_items: (optimisticCart.total_items || 0) + quantity,
		};

		// Set the optimistic cart state immediately
		setOptimisticCart(newOptimisticCart);

		// Make the actual API request to update the cart
		try {
			const response = await commerce.cart.add(productId, quantity);

			// On success, update both the cart and optimisticCart states with the response data
			setCart(response);
			setOptimisticCart(response);
		} catch (error) {
			// On failure, revert the optimisticCart state to the previous cart state
			setOptimisticCart(cart);
			console.error('Failed to add to cart:', error);
		}
	}

	const handleUpdateCartQty = async (productId, quantity) => {
		// Ensure optimisticCart.line_items is defined and is an array
		const currentLineItems = optimisticCart.line_items || [];
	
		// Create a copy of the current cart items
		const newCartItems = [...currentLineItems];
	
		// Find and update the product in the cart items
		const itemIndex = newCartItems.findIndex(item => item.product_id === productId);
	
		if (itemIndex > -1) {
			// Product exists in the cart, update the quantity
			if (quantity <= 0) {
				// Remove the item if quantity is zero or less
				newCartItems.splice(itemIndex, 1);
			} else {
				newCartItems[itemIndex].quantity = quantity;
			}
		}
	
		// Calculate the new total items count
		const newTotalItems = newCartItems.reduce((total, item) => total + item.quantity, 0);
	
		// Update the optimistic cart state with the new cart items and total item count
		const newOptimisticCart = {
			...optimisticCart,
			line_items: newCartItems,
			total_items: newTotalItems,
		};
	
		// Set the optimistic cart state immediately
		setOptimisticCart(newOptimisticCart);
	
		// Make the actual API request to update the cart
		try {
			const response = await commerce.cart.update(productId, { quantity });
	
			// On success, update both the cart and optimisticCart states with the response data
			setCart(response);
			setOptimisticCart(response);
		} catch (error) {
			// On failure, revert the optimisticCart state to the previous cart state
			setOptimisticCart(cart);
			console.error('Failed to update cart quantity:', error);
		}
	};

	const handleRemoveFromCart = async (productId) => {
		// Ensure optimisticCart.line_items is defined and is an array
		const currentLineItems = optimisticCart.line_items || [];
	
		// Create a copy of the current cart items
		const newCartItems = currentLineItems.filter(item => item.product_id !== productId);
	
		// Calculate the new total items count
		const newTotalItems = newCartItems.reduce((total, item) => total + item.quantity, 0);
	
		// Update the optimistic cart state with the new cart items and total item count
		const newOptimisticCart = {
			...optimisticCart,
			line_items: newCartItems,
			total_items: newTotalItems,
		};
	
		// Set the optimistic cart state immediately
		setOptimisticCart(newOptimisticCart);
	
		// Make the actual API request to remove the item from the cart
		try {
			const response = await commerce.cart.remove(productId);
	
			// On success, update both the cart and optimisticCart states with the response data
			setCart(response);
			setOptimisticCart(response);
		} catch (error) {
			// On failure, revert the optimisticCart state to the previous cart state
			setOptimisticCart(cart);
			console.error('Failed to remove from cart:', error);
		}
	};


	const handleEmptyCart = async () => {
		// Optimistically clear the cart
		const newOptimisticCart = {
			...optimisticCart,
			line_items: [],
			total_items: 0,
		};
	
		setOptimisticCart(newOptimisticCart);
	
		try {
			const response = await commerce.cart.empty();
			setCart(response);
			setOptimisticCart(response);
		} catch (error) {
			setOptimisticCart(cart);
			console.error('Failed to empty cart:', error);
		}
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();
		setCart(newCart);
		setOptimisticCart(newCart); 
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
				<Navbar totalItems={optimisticCart.total_items}
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