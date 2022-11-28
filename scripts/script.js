"use strict";

movies.splice(50);

// --------------- NORMALIZE ALL MOVIES --------------- //

const AllMovies = movies.map((movies) => {
  return {
    title: movies.title,
    year: movies.year,
    category: movies.categories,
    lang: movies.language,
    id: movies.imdbId,
    time: `${Math.floor(movies.runtime / 60)}h ${movies.runtime % 60}m`,
    summary: movies.summary,
    link: `https://www.youtube.com/embed/${movies.youtubeId}`,
    maxImg: movies.bigThumbnail,
    minImg: movies.smallThumbnail,
    rating: movies.imdbRating,
  };
});

// ----------------------- RENDER ALL MOVIES function -----------------------//

function renderAllMovies() {
  AllMovies.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                    
                                     <li><strong>Language: ${el.lang} </strong></li> 
                                      <li><strong>Category: ${el.category} </strong></li>
                                        <li><strong>Year: ${el.year} </strong></li>
                                      
                                      
                                        <li><strong>Rating: ${el.rating} </strong></li>
                                        <li><strong>Runtime: ${el.time} </strong></li> 
                                        <li><strong><a href="${el.link}">Youtube</a></strong></li>
                                       
                                    </ul>
                                    <div class="social d-flex">
                                        <button class="btn btn-danger m-2">
                                            Trailer
                                        </button>
                                        <button class="btn btn-primary m-2">
                                            Read more . . .
                                        </button>
                                        <button class="btn btn-warning m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `
    );

    $(".wrapper").appendChild(card);
  });
}
renderAllMovies();

// ----------------- FIND FILM FUNCTIONS START ----------------- //

const findFilm = (regexp, rating) => {
  return AllMovies.filter((film) => {
    return film.title.match(regexp) && film.rating >= rating;
  });
};

// ----------------- FIND FILM FUNCTIONS END ----------------- //

// ----------------- FIND FILM LISTENER ----------------- //

$("#submitForm").addEventListener("submit", (e) => {
  $(".wrapper").innerHTML = ` <div class="lds-roller"><div></div><div></div><div></div><div></div>`;

  const searchValue = $("#filmName").value;

  const filmRating = $("#filmRating").value;

  const regexp = new RegExp(searchValue, "gi");

  const searchResult = findFilm(regexp, filmRating);

  setTimeout(() => {
    if (searchResult.length > 0) {
      searchResultsRender(searchResult);

      $(".card-res").classList.remove("d-none");

      $(
        "#res"
      ).innerHTML = `<strong>${searchResult.length}</strong> ta ma'lumot topildi`;

      if (searchValue.length === 0) {
        $(".card-res").classList.add("d-none");
      }
    } else {
      $(".card-res").classList.add("d-none");
      $(
        ".wrapper"
      ).innerHTML = `<span class="h1_span"><h1 class="text-center text-danger">malumot topilmadi</h1></span>`;
    }
  }, 2000);
});

function searchResultsRender(data = []) {
  $(".wrapper").innerHTML = "";
  data.forEach((el) => {
    const card = createElement(
      "div",
      "card shadow-lg",
      `
        
        <img src="${el.minImg}" alt="img" class="card-img">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        ${el.title}
                                    </h3>
                                    <ul class="list-unstyled">
                                    <li><strong>Language: ${el.lang} </strong></li> 
                                    <li><strong>Category: ${el.category} </strong></li>
                                      <li><strong>Year: ${el.year} </strong></li>
                                    
                                    
                                      <li><strong>Rating: ${el.rating} </strong></li>
                                      <li><strong>Runtime: ${el.time} </strong></li> 
                                      <li><strong><a href="${el.link}">Youtube</a></strong></li>
                                     
                                    </ul>
                                    <div class="social d-flex">
                                        <button class="btn btn-danger m-2">
                                            Trailer
                                        </button>
                                        <button class="btn btn-primary m-2">
                                            Read more . . .
                                        </button>
                                        <button class="btn btn-warning m-2">
                                            Add bookmark
                                        </button>
                                    </div>
                                </div>
        
        `
    );

    $(".wrapper").appendChild(card);
  });
}
