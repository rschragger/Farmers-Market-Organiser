const stalls = (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		
		// Go to the stalls page
		window.location.replace(`/stalls`);
	}
};

document.getElementById("stalls-button").addEventListener("keypress", stalls);