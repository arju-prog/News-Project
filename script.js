const API_KEY = "02adacb49c4849fe9b6e7845b3ae54e5";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', ()=> fetchNews("Youtubers"));

async function fetchNews(query){
     const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
     const data = await res.json();
     console.log(data);
     bindData(data.articles);
}

function reload(){
     window.location.reload();
}
function bindData(articles){
     const cardsContainer = document.getElementById('cards-container');
     const templateCard = document.getElementById('template-news-card');

     cardsContainer.innerHTML = '';

     articles.forEach(article => {
          if(!article.urlToImage) return;
          const cardClone = templateCard.content.cloneNode(true);
          fillDataInCard(cardClone, article);
          cardsContainer.appendChild(cardClone);
     });

}

function fillDataInCard(cardClone, article){
     const newsImg = cardClone.getElementById('news-img');
     const newsTitle = cardClone.getElementById('news-title');
     const newsSource = cardClone.getElementById('news-source');
     const newsDesc = cardClone.getElementById('news-desc');

     
     if (!newsImg || !newsTitle || !newsSource || !newsDesc) {
          console.error("One or more elements not found in the template.");
          return;
     }

     newsImg.src = article.urlToImage;
     newsTitle.innerHTML = article.title;
     newsDesc.innerHTML = article.description;

     const date = new Date(article.publishedAt).toLocaleString('en-US', {
          timeZone: 'Asia/Jakarta'
     });

     newsSource.innerHTML = `${article.source.name} - ${date}`;

     cardClone.firstElementChild.addEventListener('click', () => {
          window.open(article.url, "_blank");
     })
}

let curSelectedNav = null;
function onNavItemClick(id){
       fetchNews(id);
       const item = document.getElementById(id);
       curSelectedNav?.classList.remove('active');
       item.classList.add('active');
       curSelectedNav = item;
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchButton.addEventListener('click', () => {
     const query = searchInput.value;
     if(!query) return;
     fetchNews(query);
     curSelectedNav?.classList.remove('active');
})