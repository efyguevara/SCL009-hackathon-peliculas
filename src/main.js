//aqui se imprimen las cards
const list = document.getElementById('movies');
//Recarga la pagina
const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

//Modal y Botones (que habren y cierran el modal)
const modal = document.getElementById("myModal");
const btn = document.getElementById("btn-modal")
const span = document.getElementsByClassName("close")[0];

//Click del Boton ¿Que es PopCorn Family? y que habra el modal
btn.addEventListener("click", () => {
modal.style.display = "block";
})

//Click del Boton para cerrar el Modal
span.addEventListener("click", () => {
modal.style.display = "none";
})

//Cuando el usuario haga click en cualquier lugar fuera del modal y se cierre
window.addEventListener("click", (event) => {
if (event.target == modal) {
modal.style.display = "none";
}
})

//Click del boton "buscar"
const clickSearch = document.getElementById("clickSearcher");
function addListenerButtonDetails() {
    const buttons = document.querySelectorAll('.btn-details');//con este querysSelector se hace el evento click del boton
    for (const button of buttons) { //recorre cada boton 
        button.addEventListener('click', movieDetails);
    }
}

//esta funcion muestra el detalle de la pelicula seleccionada
function movieDetails(event) {
    //parametros para armar la url
    const movieId = event.target.getAttribute("data-id");//este atributo me da el valor del ID y lo toma como parametro para la url
    const params = { api_key: "879f4d45aca2ee6235c83898a8eb220c", language: 'es-ES', external_source: "imdb_id" };
    const urlParams = new URLSearchParams(Object.entries(params));
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/find/${movieId}?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.results.forEach((element) => {
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" class="card-img-top" " alt="${element.original_title} Imágen no Disponible">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                        </div>
                        <div class="row text-center">
                        <button type="button" class="btn btn-block btn-style" 
                        id="botonModal"  data-id="${element.id}" 
                        data-toggle="modal" data-target="#${element.id}"
                        > ${element.id}</button>
                        </div>
                    </div>`;
                let poster = element.poster_path
                let imageUrl = `https://image.tmdb.org/t/p/w500/${poster}`
                if (element.poster_path === null) {
                    //alert('holiii')
                    element.poster_path = imageUrl = 'img/no.png'
                }

                list.innerHTML +=
                    `<div class="col-12 col-sm-12 col-md-4 col-lg-2">
                <div class="card text-center cards">
                    <img src="${imageUrl}" class="card-img-top img-card"  alt="${element.original_title} Imágen no Disponible">
                    <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details">Ver más</button>
                </div>
            </div>`;
            });
            const buttons = document.querySelectorAll('.btn-details');
            for (const button of buttons) {
                button.addEventListener('click', movieDetails);
            }
        })
}
window.onload = () => {

    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=879f4d45aca2ee6235c83898a8eb220c&sort_by=popularity.desc`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.results.forEach((element) => {
                let poster = element.poster_path
                let imageUrl = `https://image.tmdb.org/t/p/w500/${poster}`
                if (element.poster_path === null) {
                    //alert('holiii')
                    element.poster_path = imageUrl = 'img/no.png'
                }

                list.innerHTML +=
                    `<div class="col-sm-12 col-md-4 col-lg-2">
                <div class="card text-center cards">
                    <img src="${imageUrl}" class="card-img-top img-card"  alt="${element.original_title} Imágen no Disponible">
                    <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details">Ver más</button>
                </div>
            </div>`;
            });
            addListenerButtonDetails();
        })

    //Click del boton "buscar"
    const clickSearch = document.getElementById("clickSearcher");
    //Cuando escuche el click va a llamar a la data para buscar lo que el usurio ingreso en el input seach
    clickSearch.addEventListener("click", () => {
        //texto ingresado por el usuario (titulo de pelicula)
        const inputSearch = document.getElementById("searcher").value;
        //parametros para armar la url
        const params = { apikey: "376741b9", s: inputSearch, plot: "full" };
        const urlParams = new URLSearchParams(Object.entries(params));
        //llamada a la data con los parametros que se establecieron en URLSearchParams
        fetch(`https://www.omdbapi.com?${urlParams}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                list.innerHTML = "";
                data.Search.forEach((element) => {
                    if (element.Poster === 'N/A') {
                        element.Poster = 'img/no.png'
                    }
                    list.innerHTML +=
                        `<div class="col-sm-12 col-md-4 col-lg-2">
                    <div class="card text-center cards">
                        <img src="${element.Poster}" class="card-img-top img-card"  alt="${element.Title} Imágen no Disponible">
                        
                        <button id="e-${element.imdbID}" data-id="${element.imdbID}" class="btn btns btn-lg btn-block btn-details   ">Ver más</button>
                    </div>
                </div>`;
                });
                addListenerButtonDetails();
            })
    });

    /*Filtro por género*/
    const filterMovie = document.getElementById("genre-movie");
    filterMovie.addEventListener("change", () => {
        filterMovies();
    })

    /*Filtro por año*/
    const yearMovie = document.getElementById("year-movie");
    yearMovie.addEventListener("change", () => {
        filterMovies();
    })

    /*Filtro por Top Rated*/
    const ratedMovie = document.getElementById("rated-movie");
    ratedMovie.addEventListener("change", () => {
        filterMovies();
    })

    function filterMovies() {
        const ratedMovie = document.getElementById("rated-movie").value;
        const yearMovie = document.getElementById("year-movie").value;
        const filterMovie = document.getElementById("genre-movie").value;

        const params = {
            api_key: "879f4d45aca2ee6235c83898a8eb220c", with_genres: filterMovie,
            sort_by: 'vote_average.' + ratedMovie, primary_release_year: yearMovie, language: 'es-ES'
        };
        const urlParams = new URLSearchParams(Object.entries(params));
        fetch(`https://api.themoviedb.org/3/discover/movie?${urlParams}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                list.innerHTML = "";
                data.results.forEach((element) => {
                    let poster = element.poster_path
                    let imageUrl = `https://image.tmdb.org/t/p/w500/${poster}`
                    if (element.poster_path === null) {
                        //alert('holiii')
                        element.poster_path = imageUrl = 'img/no.png'
                    }

                    list.innerHTML +=
                        `<div class="col-sm-12 col-md-4 col-lg-2">
                    <div class="card text-center cards">
                        <img src="${imageUrl}" class="card-img-top img-card"  alt="${element.original_title} Imágen no Disponible">
                        <button id="e-${element.id}" data-id="${element.id}" class="btn btns btn-lg btn-block btn-details">Ver más</button>
                    </div>
                </div>`;
                });
                addListenerButtonDetails();
            });
    }
}


