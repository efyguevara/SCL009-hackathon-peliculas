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

//Filter Movie
const arrayAnimation= ["tt5220122","tt3606756", "tt6182908", "tt3861390", "tt2709692", "tt7961060", "tt4633694", "tt5104604", "tt2296777", "tt5117670" ];
const arrayThriller= ["tt1396484","tt5814060", "tt6644200", "tt5690360", "tt6195094", "tt6081670", "tt7315484", "tt5726086", "tt4504044", "tt4761916" ];
const arrayComedy= ["tt2704998","tt5463162", "tt6791096", "tt5164214", "tt4701724", "tt2568862", "tt3874544", "tt4060006", "tt4843012", "tt2203939" ]
const arrayAction= ["tt4154756","tt4912910", "tt1477834", "tt3829266", "tt1270797", "tt8235660", "tt3778644", "tt5001754", "tt4154796", "tt0451279" ]

const btnAnimation = document.getElementById("Animation");
btnAnimation.addEventListener("click", () => {
   
    const list = document.getElementById('movies');
    //llamada a la data con los parametros que se establecieron en URLSearchParams
    let request = new Request("https://www.omdbapi.com/?apikey=376741b9&i="+arrayAnimation); //llamada a mi api por el valor que introduce el user.
 
	fetch(request).then((result)=>{
		return result.json();
	}).then((data)=>{
            list.innerHTML = "";
            for(let index = 0; index < data.length; index++) {
                list.innerHTML +=
                    `<div class="card col-sm-12 col-md-4 col-lg-2 text-center cards">
                        <img src="${data.imdbID[index].Poster}" class="card-img-top p-0" alt="${data.imdbID[index].Title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.imdbID[index].Genre}</h5>
                        <p class="card-text">${data.imdbID[index].Plot}</p>
                        </div>
                    </div>`;
console.log(data)
            }
            
        })
});


// dejar la constante "params" con el search en vez del titulo, y que una vez 
// que se cliquee en la pelicula, se haga una nueva peticion que tome el title
// ya seleccionado y no el search para que me mande toda la informacion