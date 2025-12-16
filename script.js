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
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      divForResult.innerHTML = "";
      backBtn.classList.remove("hidden");
      console.log(data);
      console.log(data.results[0]);
      console.log();
      divForResult.classList.remove("hidden");
      const poster_path = data.results[0].poster_path;
      const backdrop_path = data.results[0].backdrop_path;
      const divForCadsToDisplayResult = document.createElement("div");
      divForCadsToDisplayResult.classList.add(
        "card",
        "d-flex",
        "flex-row",
        "cardDiv"
      );
      divForCadsToDisplayResult.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top movie_img">
        <div class="card-body">
        <h5 class="card-title"><strong>${data.results[0].original_title}</strong></h5>
        <p id="colorForReleaseDate">${data.results[0].release_date}</p>
        <p class="card-text overView">${data.results[0].overview}</p> 
        </div>`;

      divForResult.appendChild(divForCadsToDisplayResult);
      const img = document.querySelector(".movie_img");
      img.addEventListener("click", () => {
        fullInfo(backdrop_path);
      });
    });
}
backBtn.addEventListener("click", () => {
  divForPoster.classList.remove("hidden");
  divForResult.classList.add("hidden");
  backBtn.classList.add("hidden");
});
function fullInfo(poster_path) {
  divForResult.classList.add("hidden");
  const divForFullInfo = document.createElement("div");
  divForFullInfo.id = "divForFullInfo";
  divForFullInfo.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${poster_path})`;
  document.body.appendChild(divForFullInfo);
}
