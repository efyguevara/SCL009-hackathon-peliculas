let inputSearch = document.getElementById("searcher").value;
const params = {apikey: "376741b9", s: inputSearch};
const urlParams = new URLSearchParams(Object.entries(params));
fetch(`https://www.omdbapi.com?${urlParams}`)
  .then((response) => {
        return response.json();
    })
    .then((data) => {
        
        const clickSearch = document.getElementById("clickSearcher");
        clickSearch.addEventListener("click", () => {
            let list = document.getElementById('movie');
            data.Search.forEach((element) => {
                list.innerHTML += inputSe
                `
                <li>
                <img src=${element.Poster}>
                <span>${element.Title}</span>
                </li>
            `;
            });
            console.log(data);

        })

    });