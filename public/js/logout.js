const loginBtn = document.getElementById("btn-logout");

const logoutFormHandler = async () => {
	// Log the user out
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		}
	});
	
	if (response.ok) {
		// Go back to the home page after being logged out
		document.location.replace('/');
	}
	else {
		alert("Failed to logout!");
	}
}

loginBtn.addEventListener("click", logoutFormHandler);