//Recarga la pagina
const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

//Click del boton "buscar"
const clickSearch = document.getElementById("clickSearcher");

//Cuando escuche el click va a llamar a la data para buscar lo que el usurio ingreso en el input seach
clickSearch.addEventListener("click", () => {
    //texto ingresado por el usuario (titulo de pelicula)
    const inputSearch = document.getElementById("searcher").value;
    //parametros para armar la url
    const params = { api_key: "879f4d45aca2ee6235c83898a8eb220c", query: inputSearch, language: 'es-ES' };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById('movies');
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/search/movie?${urlParams}`)
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
                            <button id="e-${element.id}" data-id="${element.id}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
                        </div>
                    </div>`;
            });
            const buttons = document.querySelectorAll('.btn-details');
            for (const button of buttons) {
                button.addEventListener('click', movieDetails);
            }
        })
});

//esta funcion muestra el detalle de la pelicula seleccionada
function movieDetails(event) {
    console.log('entre!');
    
    //parametros para armar la url
    const movieId = event.target.getAttribute("data-id");//este atributo me da el valor del ID y lo toma como parametro para la url
    const params = { api_key: "879f4d45aca2ee6235c83898a8eb220c", language: 'es-ES' };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById("movies");
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            //una vez que hago click en el boton para ver los detalles me muestra la data en consola
            console.log(data);
        })
}