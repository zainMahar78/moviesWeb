const url = 
      'https://api.themoviedb.org/3/search/movie?api_key=8ee2e0565d4c1fc23a59aadbfbcf2278&query=Tom+Cruise';
fetch(url).then((res)=>{
   return res.json();
}).then((data)=>{
    console.log(data);
    console.log(data.results[0]);
    for(let i=0; i<data.results.length; i++){

        console.log(data.results[i].original_title);
        console.log(data.results[i].overview);
        console.log(data.results[i].release_date);
    }
})