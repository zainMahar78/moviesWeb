const input = document.getElementById("input");
const divForResult = document.getElementById("divForResult");

const searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", toShowResult);
function toShowResult() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8ee2e0565d4c1fc23a59aadbfbcf2278&query=${input.value}`;
    if (input.value === "") {
        divForResult.innerText = "nothing";
        return;
    }
    fetch(url).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        console.log(data.results[0]);
        console.log();
        const poster_path = data.results[0].poster_path;
            const divForCadsToDisplayResult = document.createElement("div");
            divForCadsToDisplayResult.classList.add("card", "d-flex", "flex-row");
            // divForCadsToDisplayResult.style= "width: 18rem";
            divForCadsToDisplayResult.innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top movie_img" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>`;
            divForResult.appendChild(divForCadsToDisplayResult);
            console.log(data.results[0].original_title);
            console.log(data.results[0].overview);
            console.log(data.results[0].release_date);
       
    })
}
{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */}