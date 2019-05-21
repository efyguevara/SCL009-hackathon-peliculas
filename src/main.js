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
    const params = { apikey: "376741b9", s: inputSearch, plot: "full" };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById('movies');
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://www.omdbapi.com?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            data.Search.forEach((element) => {
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="${element.Poster}" class="card-img-top" " alt="${element.Title} Imágen no Disponible">
                        <div class="card-body">
                            <h5 class="card-title">${element.Title}</h5>
                        </div>
                        <div class="row text-center">
                            <button id="e-${element.imdbID}" data-imdbID="${element.imdbID}" class="btn btn-lg btn-block btns btn-details">Ver más</button>
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
    const imdbID = event.target.getAttribute("data-imdbID");//este atributo me da el valor del ID y lo toma como parametro para la url
    const params = { apikey: "376741b9", i: `${imdbID}`, Plot: "full" };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById("movies");
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    fetch(`https://www.omdbapi.com?${urlParams}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            list.innerHTML = "";
            //una vez que hago click en el boton para ver los detalles me muestra la data en consola
            console.log(data);
        })
}