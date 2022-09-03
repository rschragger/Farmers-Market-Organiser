
const stallholders = (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		
		// Go to the stallholders page
		window.location.replace(`/stallholders`);
	}
};

document.getElementById("stallholders-button").addEventListener("keypress", stallholders);