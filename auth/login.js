const firebaseConfig = {
  apiKey: "AIzaSyCCMoWp5IQ3951AOEkcqDwEcT0H3-fmD-c",
  authDomain: "moviesearchapp-f2bdd.firebaseapp.com",
  projectId: "moviesearchapp-f2bdd",
  storageBucket: "moviesearchapp-f2bdd.firebasestorage.app",
  messagingSenderId: "501504184325",
  appId: "1:501504184325:web:5182649e1ed7c1fc4fcc6c",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register new user
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

        const user = userCredential.user;

        alert(`welcome ${user.displayName}`);
        localStorage.setItem("logginName", user.displayName);
      window.location.href = "../index.html"; // Redirect to the homepage after registration
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error during registration:", error);
    }
  });
