const accessKey= "TDrJ9R6Uq96HY42kZsc-wluUzHF8gaKPq2z5T-BAVr8";
const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResultsEl = document.querySelector(".search-results")
const showMoreButtonEl = document.getElementById("show-more-button")

let inputData = "";
let page = 1;
async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();    
  

    if(page === 1){
        searchResultsEl.innerHTML = "";
    }

    const results = data.results;
    results.map((result)=>{
        const imageWapper = document.createElement("div")
        imageWapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src =  result.urls.small
        image.alt = result.alt_description;
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;
    
      imageWapper.appendChild(image);
      imageWapper.appendChild(imageLink);
      searchResultsEl.appendChild(imageWapper)
    
    })
  
    page++;
    if(page>1){
        showMoreButtonEl.style.display = "block";
    }
    
}

formEl.addEventListener("submit", (event)=>{
event.preventDefault();
page = 1;
searchImages();
})

showMoreButtonEl.addEventListener("click",(e)=>{
searchImages();
})