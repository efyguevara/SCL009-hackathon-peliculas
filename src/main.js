const home = document.getElementById("home");
home.addEventListener("click", () => {
    location.reload(true);
})

const clickSearch = document.getElementById("clickSearcher");

clickSearch.addEventListener("click", () => {
    const inputSearch = document.getElementById("searcher").value;
    const params = { apikey: "376741b9", s: inputSearch, plot: "full" };
    const urlParams = new URLSearchParams(Object.entries(params));

    const list = document.getElementById('movies');
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
            //const showData = dataGender();   
        })
});


// dejar la constante "params" con el search en vez del titulo, y que una vez 
// que se cliquee en la pelicula, se haga una nueva peticion que tome el title
// ya seleccionado y no el search para que me mande toda la informacion