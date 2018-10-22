$(document).ready(()=> {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});


/* ------------ favorite (Popular) movies ------------ */

function favoriteMovies() {
  let baseURL = 'https://api.themoviedb.org/3/';
  let url = ''.concat(baseURL, 'movie/popular?api_key=', APIKEY);
  axios.get(url)
    .then((result) => {
      let popular = result.data.results;
      let output = '<div class="col-md-12 col-lg-12 text-center" id="popularTitle"><h3>Popular Movies</h3></div>';
      $.each(popular, (index, movie) => {
        output += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 movies">
                    <div class="well text-center">
                        <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}">
                        <p>${movie.title}</p>
                        <p>${movie.release_date}</p>
                        <button onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie deatils</button>
                    </div>
                </div>

              `;
          });
          $('#movies').html(output);
      })
    .catch((error) => {
      console.log(error);
    });
}

/* --------------- Search for a movie name ---------------- */

function getMovies(searchText) {
  let baseURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
  let url = ''.concat(baseURL , APIKEY, '&query=', searchText);
  axios.get(url)
    .then((result) => {
      console.log(result);
      let movies = result.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12 movies">
                    <div class="well text-center">
                        <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}">
                        <p id="title">${movie.title}</p>
                        <p>${movie.release_date}</p>
                        <button onclick="movieSelected('${movie.id}')" class="btn btn-primary">Movie deatils</button>
                    </div>
                </div>
              `;
      });
      $('#movies').html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}

/* --------------- Selected movie (id) ---------------- */

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location.href = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  let baseURL = 'https://api.themoviedb.org/3/movie/';
  let url = ''.concat(baseURL, movieId, '?api_key=', APIKEY, '&language=en-US');
  axios.get(url)
    .then((result) => {
      let movie = result.data;

/* ------- genres loop  ------------ */
      let genres = movie.genres;
      let genr = [];
      $.each(genres, (index, genre) => {
        genr.push(" " + genre.name);

 });

 /* ------- company loop  ------------ */
       let companies = movie.production_companies;
       let comp = [];
       $.each(companies, (index, company) => {
         comp.push(" " + company.name);
  });

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="http://image.tmdb.org/t/p/w500${movie.poster_path}">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong>${genr}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Number of voting:</strong> ${movie.vote_count}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Director:</strong> ${comp}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="plot">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((error) => {
      console.log(error);
    });

}
