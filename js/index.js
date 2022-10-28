const searchInput = document.getElementById("search-input");
const result = document.getElementById("result");

let search = "";
let movies = [];

const fetchMovies = async () => {
  movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=482db997200580b06f282d0f81452cbd&query=${search}`
  ).then((res) => res.json());
};

const moviesDisplay = async () => {
  await fetchMovies();

  if(movies.results.length === 0) {
    return result.innerHTML = `<h2>No results found</h2>`;
  }

  result.innerHTML = movies.results
    .map(
      (movie) =>
        `
      <div class="movie">
        <div class="movie__container">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}" />
          <h2>${movie.original_title}</h2>
        </div>
      </div>
    `
    )
    .join("");
};

searchInput.addEventListener("input", (e) => {
  search = e.target.value;

  if (search === "") {
    return result.innerHTML = `<h2>Search for a movie... ↗️</h2>`;
  }

  moviesDisplay();
});
