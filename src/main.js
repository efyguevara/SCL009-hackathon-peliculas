//Recarga la pagina
const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

//Modal y Botones (que habren y cierran el modal)
const modal = document.getElementById("myModal");
const btn = document.getElementById("btn-modal")
const span = document.getElementsByClassName("close")[0];

//Click del Boton ¿Que es PopCorn Family y que habra el modal?
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
                        <img src="${element.Poster}" class="card-img-top p-0" alt="${element.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${element.Title}</h5>
                        <p class="card-text">${element.Year}</p>
                        </div>
                    </div>`;
            });
            ;
        })
});


// dejar la constante "params" con el search en vez del titulo, y que una vez 
// que se cliquee en la pelicula, se haga una nueva peticion que tome el title
// ya seleccionado y no el search para que me mande toda la informacion