import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart, Search } from '@material-ui/icons';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import logo from '../../assets/logo.jpg';
import useStyles from './styles';

const Navbar = ({ totalItems, products, setProducts, fetchProducts, allProducts }) => {

	const location = useLocation();
	const navigate = useNavigate();
	const searchDiv = useRef();

	const [query, setQuery] = useState('');
	const classes = useStyles(query);

	const handleQuery = (e) => {
		setQuery(e.target.value);
	}

	const handleEnter = (e) => {
		if (e.keyCode === 13 ){
			handleSearch(query);
		}
	}

	const clearFilter = () => {
		setProducts(allProducts);
		setQuery('');
		if(location.pathname !== "/"){
			navigate("/");
		}
	}

	const handleSearch = (query) => {
		const filterProds = allProducts.filter(prod => prod.name.toLowerCase().includes(query.toLowerCase()));
		setProducts(filterProds);
		setQuery('');
		if (location.pathname !== "/"){
			navigate("/");
		}
	}

	// hides results dropdown when clicking outside the search box //
	useEffect(() => {
		if (searchDiv){
			document.addEventListener('mousedown', (e) => {
				if(searchDiv.current && !searchDiv.current.contains(e.target)){
					setQuery("");
				}
			});
		}
	});

	return(
		<div>
			<AppBar position="fixed" className={classes.appBar} color="inherit">
				<Toolbar className={classes.toolbar}>
					<Typography component={Link} to="/" onClick={clearFilter} variant="h6" className={classes.title} color="inherit">
						<img src={logo} alt="Commerce.js" height="30px" className={classes.image}/>
						YueStore
					</Typography>

					{ (location.pathname !== "/checkout") && (
					<div className={classes.search} ref={searchDiv}>
						<div className={classes.searchContainer}>
							<input className={classes.searchInput}
								placeholder="Search..."
								value={query}
								onChange={handleQuery}
								onKeyDown={handleEnter}
								aria-label="search" />


							<div className={classes.results}>
								{products.filter(prod => {
									const searchTerm = query.toLowerCase();
									const prodName = prod.name.toLowerCase();

									return searchTerm
												&& prodName.includes(searchTerm)
												&& prodName !== searchTerm;
									})
									.map(prod => (
									<Typography
										variant="body2"
										className={classes.searchItem}
										key={prod.id}
										onClick={() => handleSearch(prod.name)}
										>{prod.name}</Typography>
									))}
							</div>
						
						</div>
						<div className={classes.searchIconWrapper}>
							<Search className={classes.searchIcon} onClick={() => handleSearch(query)} />
						</div>
						<div className={classes.filterIcon}>
							{products.length < allProducts.length ?
								<FilterAltOffIcon
									className={classes.filterOffIcon}
									onClick={clearFilter}/>
								: <FilterAltIcon /> }
						</div>
					</div>
					)}

					{ (location.pathname === "/" || location.pathname.startsWith("/product/"))
						&& (
						<div className={classes.button}>
							<IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
								<Badge badgeContent={totalItems} overlap="rectangular" color="secondary">
									<ShoppingCart />
								</Badge>
							</IconButton>
						</div>)}

				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;