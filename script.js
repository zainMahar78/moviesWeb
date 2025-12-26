const input = document.getElementById("input");
const divForResult = document.getElementById("divForResult");
const divForPoster = document.getElementById("divForPoster");
const searchBtn = document.getElementById("searchBtn");
const backBtn = document.getElementById("backBtn");
const divForFullInfo = document.getElementById("divForFullInfo");
let currentView;
searchBtn.addEventListener("click", toShowResult);
function toShowResult() {
  currentView = "result";
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
      console.log(data.results[0].genre_ids);
      divForResult.innerHTML = "";
      backBtn.classList.remove("hidden");
      divForResult.classList.remove("hidden");
      data.results.forEach((movie, index) => {
        const poster_path = movie.poster_path;
        const backdrop_path = movie.backdrop_path;
        const divForCadsToDisplayResult = document.createElement("div");

        divForCadsToDisplayResult.classList.add(
          "card",
          "d-flex",
          "flex-row",
          "cardDiv"
        );
        divForCadsToDisplayResult.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${poster_path}" class="card-img-top movie_img" id=movie_img${index}>
        <div class="card-body">
        <h5 class="card-title"><strong>${movie.original_title}</strong></h5>
        <p id="colorForReleaseDate">${movie.release_date}</p>
        <p class="card-text overView">${movie.overview}</p> 
        </div>`;
        
        divForResult.appendChild(divForCadsToDisplayResult);
        const img = document.querySelector(`#movie_img${index}`);
        const langCode = movie.original_language;
        const langName = new Intl.DisplayNames(["en"], { type: "language" }).of(
          langCode
        );
        img.addEventListener("click", () => {
          fullInfo(
            poster_path,
            backdrop_path,
            movie.original_title,
            movie.release_date,
            movie.overview,
            langName
          );
        });
      });
    });
}
function fullInfo(
  poster_path,
  backdrop_path,
  data,
  release_date,
  overView,
  langName
) {
  currentView = "fullInfo";
  divForResult.classList.add("hidden");
  divForFullInfo.classList.remove("hidden");
  divForFullInfo.innerHTML = "";
  divForFullInfo.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${backdrop_path})`;
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("imgWrapper");
  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  imgWrapper.appendChild(img);
  divForFullInfo.appendChild(imgWrapper);
  const divText = document.createElement("div");
  divText.classList.add("divText");
  const h1 = document.createElement("h1");
  h1.innerText = data + "(" + release_date.split("-")[0] + ")";
  divText.appendChild(h1);
  const p = document.createElement("p");
  p.innerHTML = `<p>${release_date}</br><strong>Original Language: </strong>${langName}</p><h5>Overview</h5>${overView}`;

  divText.appendChild(p);
  divForFullInfo.appendChild(divText);
}
backBtn.addEventListener("click", () => {
  if (currentView === "result") {
    divForResult.classList.add("hidden");
    divForPoster.classList.remove("hidden");
    backBtn.classList.add("hidden");
  } else if (currentView === "fullInfo") {
    divForFullInfo.classList.add("hidden");
    divForResult.classList.remove("hidden");
    currentView = "result";
  }
});
