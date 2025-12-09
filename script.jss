
const API_URL = 'http://localhost:3000/movies';
const movieListDiv = document.getElementById('movie-list');
const searchInput = document.getElementById('search-input');
const form = document.getElementById('add-movie-form');
let allMovies = []; // Stores the full, unfiltered list of movies
// Function to dynamically render movies to the HTML
function renderMovies(moviesToDisplay) {
movieListDiv.innerHTML = '';
if (moviesToDisplay.length === 0) {
movieListDiv.innerHTML = '<p>No movies found matching your criteria.</p>';
return;
}
moviesToDisplay.forEach(movie => {
const movieElement = document.createElement('div');
movieElement.classList.add('movie-item');
movieElement.innerHTML = `
<p><strong>${movie.title}</strong> (${movie.year}) - ${movie.genre}</p>
<button onclick="editMoviePrompt(${movie.id}, '${movie.title}', ${movie.year},
'${movie.genre}')">Edit</button>
<button onclick="deleteMovie(${movie.id})">Delete</button>
`;
movieListDiv.appendChild(movieElement);
});
}
// Function to fetch all movies and store them (READ)
function fetchMovies() {
fetch(API_URL)
.then(response => response.json())
.then(movies => {
allMovies = movies; // Store the full list
renderMovies(allMovies); // Display the full list
})
.catch(error => console.error('Error fetching movies:', error));
}
fetchMovies(); // Initial load