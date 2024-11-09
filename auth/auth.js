// // auth.js

// // Register new user
// document
//   .getElementById("registerForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     const username = document.getElementById("username").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const user = {
//       username: username,
//       email: email,
//       password: password,
//     };

//     // Save user data to localStorage
//     localStorage.setItem(username, JSON.stringify(user));
//     alert("Registration successful! You can now log in.");
//   });

// // Login existing user
// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Get the stored user from localStorage
//   const user = JSON.parse(localStorage.getItem(username));

//   if (user && user.password === password) {
//     alert("Login successful!");
//     localStorage.setItem("loggedInUser", username); // Save logged-in state
//     window.location.href = "index.html"; // Redirect to homepage
//   } else {
//     alert("Invalid username or password");
//   }
// });

// // Check if user is logged in
// function checkLoginStatus() {
//   const loggedInUser = localStorage.getItem("loggedInUser");
//   if (loggedInUser) {
//     document.querySelector(".navbar").innerHTML = `
//             <a href="index.html">Home</a>
//             <a href="#" onclick="logout()">Logout</a>
//         `;
//   }
// }

// // Logout user
// function logout() {
//   localStorage.removeItem("loggedInUser");
//   window.location.href = "login.html";
// }

// Import Firebase Authentication methods
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// Get references to the form elements
const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Initialize Firebase Auth
  const auth = getAuth();

  // Create a new user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully registered
      const user = userCredential.user;
     
      alert("Registration successful!",  user);
      console.log("User registered:", user);

      // Redirect to index.html after registration
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
      console.error(`Error (${errorCode}): ${errorMessage}`);
    });
});
