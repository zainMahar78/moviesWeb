const input = document.getElementById("input");
const divForResult = document.getElementById("divForResult");
const divForPoster = document.getElementById("divForPoster");
const searchBtn = document.getElementById("searchBtn");
const backBtn = document.getElementById("backBtn");
searchBtn.addEventListener("click", toShowResult);
function toShowResult() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8ee2e0565d4c1fc23a59aadbfbcf2278&query=${input.value}`;
    if (input.value === "") {
        divForResult.innerText = "nothing";
        return;
    }
    divForPoster.classList.add("hidden");
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        divForResult.innerHTML = "";
        backBtn.classList.remove("hidden");
        console.log(data);
        console.log(data.results[0]);
        console.log();
        const poster_path = data.results[0].poster_path;
            const divForCadsToDisplayResult = document.createElement("div");
            divForCadsToDisplayResult.classList.add("card", "d-flex", "flex-row", "cardDiv");
           
            divForCadsToDisplayResult.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top movie_img" alt="...">
        <div class="card-body">
        <h5 class="card-title"><strong>${data.results[0].original_title}</strong></h5>
        <p id="colorForReleaseDate">${data.results[0].release_date}</p>
        <p class="card-text overView">${data.results[0].overview}</p>
        </div>`;
            divForResult.appendChild(divForCadsToDisplayResult);
            console.log();
            console.log(data.results[0].overview);
       
    })
}
