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
			window.location = '/';
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
	
	const newUser = {
		username: document.getElementById("signup-username").value.trim(),
		password: document.getElementById("signup-password").value.trim(),
		first_name: document.getElementById("signup-first-name").value.trim(),
		last_name: document.getElementById("signup-last-name").value.trim(),
		email: document.getElementById("signup-email").value.trim(),
		mobile: document.getElementById("signup-mobile").value.toString().trim(),
		role_type: document.getElementById("signup-role").value.trim()
	};
	
	// Check the validation of the fields
	const validationResult = checkValidation(newUser);
	
	if (validationResult === undefined) {
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
				window.location = '/';
			}
		}
		else {
			// Invalidate the form
			alert("Something went wrong!");
		}
	}
	else {
		// Validation failed. Notify the user
		if ("username" in validationResult) {
			document.querySelector(".invalid-username").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-username").classList.remove("display-error");
		}
		
		if ("first_name" in validationResult) {
			document.querySelector(".invalid-first-name").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-first-name").classList.remove("display-error");
		}
		
		if ("last_name" in validationResult) {
			document.querySelector(".invalid-last-name").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-last-name").classList.remove("display-error");
		}
		
		if ("password" in validationResult) {
			document.querySelector(".invalid-password").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-password").classList.remove("display-error");
		}
		
		if ("email" in validationResult) {
			document.querySelector(".invalid-email").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-email").classList.remove("display-error");
		}
		
		if ("mobile" in validationResult) {
			document.querySelector(".invalid-mobile").classList.add("display-error");
		}
		else {
			document.querySelector(".invalid-mobile").classList.remove("display-error");
		}
	}
}

const checkValidation = (data) => {
	const constraints = {
		email: {
			email: true
		},
		username: {
			length: {
				minimum: 6
			}
		},
		password: {
			length: {
				minimum: 6
			}
		},
		first_name: {
			length: {
				minimum: 1
			}
		},
		last_name: {
			length: {
				minimum: 1
			}
		},
		mobile: {
			// Match the back-end
			format: /\d{3}-\d{3}-\d{4}/
		}
	};
	
	return validate(data, constraints);
}

const checkMobile = (e) => {
	// Adds a dash to match the regex pattern
	const mobileEle = document.getElementById("signup-mobile");
	
	if (mobileEle.value.length === 2 || mobileEle.value.length === 6) {
		if (e.key !== "Backspace") {
			// Add a dash if typing a number
			mobileEle.value += e.key + '-';
			e.preventDefault();
		}
	}
	if (mobileEle.value.length === 4 || mobileEle.value.length === 8) {
		if (e.key === "Backspace") {
			// Remove the dash and the next number if pressing backspace
			mobileEle.value = mobileEle.value.slice(0, mobileEle.value.length - 2);
			e.preventDefault();
		}
	}
};

document.querySelector("#login-form")?.addEventListener("submit", loginFormHandler);
document.querySelector("#signup-form")?.addEventListener("submit", signupFormHandler);

// Add listener for mobile to add dashes
document.getElementById("signup-mobile")?.addEventListener("keydown", checkMobile);