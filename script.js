const tmdbKey = 'cdbf27e78a9513e5211915cb0e756f35';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async  () => {
  const genreRequestEndpoint = "/genre/movie/list";
  var requestParams = `?api_key=${tmdbKey}`;
  var urlToFetch = tmdbBaseUrl + genreRequestEndpoint +requestParams; 
  try {
   const response = await fetch(urlToFetch);
   if(response.ok) {
    var jsonResponse = await response.json();
    var genres = jsonResponse.genres;
    return genres;
   }
  }catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  
  try {
    var response = await fetch(urlToFetch);
    if(response.ok)  {
        const jsonResponse = await response.json();
        const movies = jsonResponse.results;
        return movies;
    }
  }catch(error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
    var movieId = movie.id;
    var movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    var urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }
    }catch (error) {
        console.log(error);
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie =  async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
   const movies = await getMovies();
   const randomMovie = getRandomMovie(movies);
   const info = await getMovieInfo(randomMovie);
   displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;