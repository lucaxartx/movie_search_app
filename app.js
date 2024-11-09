// Predefined list of movies
const movies = [
  {
    title: "Inception",
    year: "2010",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    imdbID: "tt1375666",
  },
  {
    title: "The Matrix",
    year: "1999",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    imdbID: "tt0133093", // IMDb ID for The Matrix
  },
  {
    title: "Interstellar",
    year: "2014",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    imdbID: "tt0816692", // IMDb ID for Interstella
  },
  {
    title: "The Shawshank Redemption",
    year: "1994",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg",
    imdbID: "tt0111161", // IMDb ID for The Shawshank Redemption
  },
  {
    title: "Pulp Fiction",
    year: "1994",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    imdbID: "tt0110912",
  },
];

// Function to display predefined movies on the homepage
function displayStaticMovies() {
  const latestMoviesContainer = document.getElementById("latest-movies");
  latestMoviesContainer.innerHTML = ""; // Clear previous results

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>Year: ${movie.year}</p>
      `;

    // Add a click event listener to show movie details
    movieCard.addEventListener("click", () => {
      showMovieDetails(movie);
    });

    latestMoviesContainer.appendChild(movieCard);
  });
}

// Fetch static movies when the homepage loads
window.onload = function () {
  displayStaticMovies(); // Automatically display the static movies on page load
};

// Function to show movie details in the modal
async function showMovieDetails(movie) {
  const modal = document.getElementById("movieModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalPoster = document.getElementById("modalPoster");
  const modalYear = document.getElementById("modalYear");
  const modalPlot = document.getElementById("modalPlot");

  // Log the IMDb ID for debugging
  console.log("Movie IMDb ID:", movie.imdbID);

  // If the movie has an IMDb ID, fetch full details
  if (movie.imdbID) {
    const apiKey = "6c1c88a7"; // Replace with your OMDB API key
    const url = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        modalTitle.textContent = data.Title;
        modalPoster.src =
          data.Poster !== "N/A" ? data.Poster : "placeholder.jpg";
        modalYear.textContent = `Year: ${data.Year}`;
        modalPlot.textContent = data.Plot || "No plot available."; // Fallback if Plot is not available
      } else {
        modalTitle.textContent = "Movie not found";
        modalPoster.src = "placeholder.jpg"; // Default image
        modalYear.textContent = "Year: N/A";
        modalPlot.textContent = "No details available.";
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
      modalTitle.textContent = "Error";
      modalPoster.src = "placeholder.jpg";
      modalYear.textContent = "Year: N/A";
      modalPlot.textContent = "Failed to fetch details. Please try again.";
    }
  } else {
    // Handle case for static movies
    modalTitle.textContent = movie.title;
    modalPoster.src = movie.poster; // Using predefined poster URL
    modalYear.textContent = `Year: ${movie.year}`;
    modalPlot.textContent = "Plot details not available."; // Static movies don't have plot info
  }

  modal.style.display = "block"; // Show the modal
}

// Function to hide the movie details modal
function hideMovieDetails() {
  const modal = document.getElementById("movieModal");
  modal.style.display = "none";
}

// Close modal when the close button is clicked
document.querySelector(".close-button").addEventListener("click", () => {
  hideMovieDetails();
});

// Function to search for movies
document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    showProgressBar(); // Show progress bar when search starts
    const delayTime = 5000; // Set delay time to 5 seconds

    incrementProgressBar(delayTime); // Start progress bar animation during delay
    await delay(delayTime); // Wait for the delay before making the API call
    await searchMovies(query); // Call the API to fetch movie data
    hideProgressBar(); // Hide progress bar after the search completes
  }
});

// Function to add a delay (timer) before making the API call
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to fetch movie data from the OMDB API
async function searchMovies(query) {
  const apiKey = "6c1c88a7"; // Replace with your OMDB API key
  const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
    query
  )}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      document.getElementById("results").innerHTML = `<p>${data.Error}</p>`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    document.getElementById(
      "results"
    ).innerHTML = `<p>Failed to fetch movies. Please try again later.</p>`;
  }
}

// Function to display searched movies
function displayMovies(movies) {
  const results = document.getElementById("results");
  results.innerHTML = ""; // Clear previous results

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    movieCard.innerHTML = `
          <img src="${
            movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"
          }" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
      `;

    // Add a click event listener to the movie card
    movieCard.addEventListener("click", () => {
      showMovieDetails(movie); // Show details in modal
    });
    movieCard.className = "movie-card";
    movieCard.dataset.imdbID = movie.imdbID;
    results.appendChild(movieCard);
  });
}

// Functions to manage the progress bar
function showProgressBar() {
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );
  progressBarContainer.style.display = "block";
  resetProgressBar(); // Reset progress bar before each load
}

function incrementProgressBar(duration) {
  const progressBar = document.getElementById("progressBar");
  const startTime = Date.now();
  const endTime = startTime + duration;

  function updateProgress() {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100); // Calculate progress

    progressBar.style.width = `${progress}%`;

    if (now < endTime) {
      requestAnimationFrame(updateProgress); // Continue updating until duration is reached
    }
  }

  updateProgress();
}

function resetProgressBar() {
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = "0%";
}

function hideProgressBar() {
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );
  progressBarContainer.style.display = "none";
}


document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const loggedInUser = localStorage.getItem("logginName");

  if (loggedInUser) {
    // Hide the navbar if the user is logged in
    navbar.style.display = "none";

    // Display a welcome message
    const greetingElement = document.createElement("h2");
    greetingElement.textContent = `Hello, ${loggedInUser}!`;
    document.body.prepend(greetingElement);
  

    const logoutButton = document.createElement("button");
    logoutButton.textContent = "Logout";
    logoutButton.style.position = "absolute";
    logoutButton.style.top = "20px";
    logoutButton.style.right = "20px";
    logoutButton.style.padding = "10px";
    logoutButton.style.backgroundColor = "#6200ea";
    logoutButton.style.color = "#fff";
    logoutButton.style.border = "none";
    logoutButton.style.borderRadius = "5px";
    logoutButton.style.cursor = "pointer";
  
    // Append the logout button to the body
    document.body.appendChild(logoutButton);
  
    // Add event listener for the logout button
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("logginName");
      alert("You have been logged out.");
      window.location.href = "./auth/login.html"; // Redirect to login page
    });
  }


});