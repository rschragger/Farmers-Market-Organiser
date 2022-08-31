const loginFormHandler = async (event) => {
	event.preventDefault();
	const loginForm = document.getElementById("login-form");
	
	if (!loginForm.checkValidity()) {
		event.stopPropagation();
		loginForm.classList.add('was-validated');
		
		return;
	}
	
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
			window.location.replace('/');
		}
		else {
			// Invalidate the form
			loginForm.classList.add('invalid-username-password');
			document.getElementById("login-password").value = "";
		}
	}
}

const signupFormHandler = async (event) => {
	event.preventDefault();
	const signupForm = document.getElementById("signup-form");
	
	if (!signupForm.checkValidity()) {
		event.stopPropagation();
		signupForm.classList.add('was-validated');
		
		return;
	}
	
	const newUser = {
		username: document.getElementById("signup-username").value.trim(),
		password: document.getElementById("signup-password").value.trim(),
		first_name: document.getElementById("signup-first-name").value.trim(),
		last_name: document.getElementById("signup-last-name").value.trim(),
		email: document.getElementById("signup-email").value.trim(),
		mobile: document.getElementById("signup-mobile").value.trim(),
		role_type: document.getElementById("signup-role").value.trim()
	};
	
	const response = await fetch('/api/users/', {
		method: 'POST',
		body: JSON.stringify(newUser),
		headers: {
			'content-type': 'application/json'
		}
	})
	.catch(err => {
		console.log(err);
	});
	
	// If the user was successfully created, redirect to the correct page
	if (response.ok) {
		// Log the user in. this will pass as the user was just created
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({
				username: newUser.username,
				password: newUser.password
			}),
			headers: {
				'content-type': 'application/json'
			}
		})
		.catch(err => {
			console.log(err);
		});
		
		if (response.ok) {
			window.location.replace('/');
		}
	}
	else {
		// Invalidate the form
		alert("Something went wrong!");
	}
	
	const username = document.getElementById("signup-username").value.trim();
	const password = document.getElementById("signup-password").value.trim();
	const firstName = document.getElementById("signup-first-name").value.trim();
	const lastName = document.getElementById("signup-last-name").value.trim();
	const email = document.getElementById("signup-email").value.trim();
	const mobile = document.getElementById("signup-mobile").value.trim();
	const role = document.getElementById("signup-role").value.trim();
	
}

document.querySelector("#login-form")?.addEventListener("submit", loginFormHandler);
document.querySelector("#signup-form")?.addEventListener("submit", signupFormHandler);