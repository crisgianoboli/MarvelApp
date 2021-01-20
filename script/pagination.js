//   Paginacion   //   

let arrowBack = document.getElementById('arrowBack'),
    arrowNext = document.getElementById('arrowNext');


arrowNext.addEventListener('click', function () {
    nextPage();
});

function nextPage() {
    arrowBack.classList.remove('disabled');
    content.innerHTML = '';
    getConnection(pagination + 1);

}

arrowBack.addEventListener('click', function () {
    previousPage();
})

function previousPage() {
    if (pagination == 0) {
        arrowBack.classList.add('disabled');
    } else {
        arrowBack.classList.remove('disabled');
        content.innerHTML = '';
        getConnection(pagination - 1);
    }
};

