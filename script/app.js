// States of the nav // 

let nav = document.getElementById('nav'),
    menu = document.getElementById('links'),
    open = document.getElementById('open'),
    botones = document.getElementsByClassName('btn-link'),
    cerrado = true;


function apertura() {
    if (cerrado) {
        menu.style.width = '100%';
        cerrado = false;
    } else {
        menu.style.width = '0%';
        menu.style.overflow = 'hidden';
        cerrado = true;
    }
};

// Listeners

window.addEventListener('load', function () {
    document.getElementById('onload').classList.toggle('onload-two');    
});


window.addEventListener('resize', function () {
    if (screen.width >= 700) {
        cerrado = true;
        menu.style.removeProperty('overflow');
        menu.style.removeProperty('width');
    }
});


open.addEventListener('click', function () {
    apertura();
});

window.addEventListener('click', function (e) {
    if (cerrado == false) {
        let span = document.querySelector('span')
        if (e.target !== span & e.target !== open) {
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            cerrado = true;
        }
    }
});


function backTohome() {
    location.reload();
}

// Keys //

const privateKey = `27b7ee81eff2a9b1f85b749b43cdbaa9be0a584d`,
    publicKey = `521c0ce457257224690c04d28567d4eb`,
    content = document.getElementById('content'),
    search = document.getElementById('search'),
    lupa = document.getElementById('lupa'),
    ts = Date.now(),
    hash = MD5(ts + privateKey + publicKey);


/* Get endpoint  */

let pagination = 0,
    pageCount,
    btnPages = document.getElementById('btnPages');


const getConnection = (pagination) => {
    let offset = pagination * 20;
    const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let elementTotal = response.data.total;
            pageCount = (elementTotal / 20);
            let pages = '';
                        
            for (let i = 0; i < pageCount; i++) {
                
                pages += `
                <button class="btn-page" onclick="getConnection(${i})">${i+1}</button>`;
            }
            let pageNumber = document.getElementById('pageNumber');           
            content.innerHTML = '';
            pageNumber.innerHTML = pages;
                                  

            response.data.results.forEach(e => {
                drawHero(e);
                
            });

        })
        .catch(e => console.log(e));
        

};


/* Draw the cards  */

const drawHero = e => {
    const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
    const hero = `
    <div class="content-hero">
            <h3>${e.name}</h3>
        <div class="hero-img" onclick="showDetails(${e.id})">           
           <img class="thumbnail" src="${image}">
           <p class="description">${e.description}</p>
        </div>
    </div>
    `;
    content.insertAdjacentHTML(`beforeEnd`, hero);
}


/*  Search endpoint */
const searchHero = name => {
    const hero = encodeURIComponent(name),
        URL = `https://gateway.marvel.com/v1/public/characters?name=${hero}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    fetch(URL)
        .then(response => response.json())
        .then(response => {
            response.data.results.forEach(e => {
                drawHero(e);
            });
        })
        .catch(e => console.log(e));
};


search.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        content.innerHTML = '';
        searchHero(e.target.value.trim());
    }
});

lupa.addEventListener('click', function () {
    content.innerHTML = '';
    searchHero(search.value);
});


getConnection();


/*   Redirection   */  

const showDetails = (id) => {
    localStorage.setItem('heroId', id);
    window.location.assign("./details.html");

}


