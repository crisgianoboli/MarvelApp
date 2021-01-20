const privateKey = `27b7ee81eff2a9b1f85b749b43cdbaa9be0a584d`,
    publicKey = `521c0ce457257224690c04d28567d4eb`,
    content = document.getElementById(`content`);
    detail = document.getElementById(`detail`);
    search = document.getElementById(`search`);

const getData = () => {
    const id = localStorage.getItem('heroId')
    const ts = Date.now(),
        hash = MD5(ts + privateKey + publicKey),
        URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            response.data.results.forEach(e => {
                drawHeroDetail(e);
            });
        })
        .catch(e => console.log(e));
};

getData();

const drawHeroDetail = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
    <div class="content-hero-detail">
        <h3>${e.name}</h3>
        <div class="hero-img-detail" onclick="showDetails(${e.id})">
           <img class="thumbnail-detail" src="${image}">
           <div class="text-detail-content">
                <p class="description-detail">${e.description}</p>
                <p class="id-detail">El Id del personaje es: <span> ${e.id} </span></p>
           </div>
        </div>
    </div>
    `;
    detail.insertAdjacentHTML(`beforeEnd`, hero);

};
