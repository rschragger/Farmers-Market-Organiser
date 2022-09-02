const searchProducts = (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		
		// Go to the search page and pass the value as a query string
		const product = e.target.value.toLowerCase();
		window.location = `/search/${product}`;
	}
};

document.getElementById("search-products")?.addEventListener("keypress", searchProducts);