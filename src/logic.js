/*Filtro por género*/
const filterMovie = document.getElementById("genre-movie");
filterMovie.addEventListener("change", () => {
    const filterMovie = document.getElementById("genre-movie").value;
    //console.log(filterMovie)
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&with_genres=" + filterMovie + "&sort_by=popularity.desc&language=es-ES")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)

            const list = document.getElementById('movies'); // se declara de nuevo, si no undefined.
            list.innerHTML = "";
            data.results.forEach((element) => {
                console.log(data)
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="row text-center">
                        <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
        });
})

/*Filtro por año*/
const yearMovie = document.getElementById("year-movie");
yearMovie.addEventListener("change", () => {
    const yearMovie = document.getElementById("year-movie").value;
    //console.log(filterMovie)
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&primary_release_year=" + yearMovie)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            const list = document.getElementById('movies'); // se declara de nuevo, si no undefined.
            list.innerHTML = "";
            data.results.forEach((element) => {
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        </div> 
                        <div class="row text-center">
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
        });
})

/*Filtro por Top Rated*/
const ratedMovie = document.getElementById("rated-movie");
ratedMovie.addEventListener("change", () => {
    const ratedMovie = document.getElementById("rated-movie").value;
    //console.log(filterMovie)
    fetch("https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&with_genres=16,12,10751,35&sort_by=vote_average."+ratedMovie)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            const list = document.getElementById('movies'); 
            list.innerHTML = "";
            data.results.forEach((element) => {
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        </div> 
                        <div class="row text-center">
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
        });
})
