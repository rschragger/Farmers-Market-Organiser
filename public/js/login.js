const loginFormHandler = async (event) => {
	event.preventDefault();
	
	const username = document.getElementById("login-username").value.trim();
	const password = document.getElementById("login-password").value.trim();
	
	if (username && password) {
		// If a username and password is supplied, log the user in
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
		.catch(err => {
			console.log(err);
		});
		
		// If the user was successfully logged in, redirect to the correct page
		if (response.ok) {
			document.location.replace('/');
		}
		else {
			alert("The username or password is incorrect!");
		}
	}
}

const signupFormHandler = async (event) => {
	event.preventDefault();
}

document.querySelector("#login-form")?.addEventListener("submit", loginFormHandler);
document.querySelector("#signup-form")?.addEventListener("submit", signupFormHandler);