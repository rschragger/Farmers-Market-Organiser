const search = (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		
		//Retrieve all the values
		const searchTerm = e.target.value.toLowerCase() == "" ? "all" : e.target.value.toLowerCase();
		const filters = [["products", document.getElementById("filter-chk-products")], ["markets", document.getElementById("filter-chk-markets")], ["stallholders", document.getElementById("filter-chk-stallholders")]];
		let searchURL = `/search/${searchTerm}`;
		let queryParam = '';
		
		let isFirstFilter = true;
		filters.forEach((filter) => {
			if (filter[1].checked) {
				if (isFirstFilter) {
					isFirstFilter = false;
					queryParam += `?${filter[0]}=true`;
				}
				else {
					queryParam += `&${filter[0]}=true`
				}
			}
		});
		
		searchURL += queryParam;
		
		// Go to the search page with the search term and all filters
		window.location = searchURL;
	}
};

document.getElementById("search-input")?.addEventListener("keypress", search);