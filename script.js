const searchForm = document.querySelector('#search-form');
const movies = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=a802c33d5a893ec7d238c885f829bee7&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {

    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);
        console.log(output);
        let inner = '';

        output.results.forEach(function (item) {
            let itemName = item.name || item.title;
            let dateReleased = item.release_date || item.first_air_date;
            let mediaType = item.media_type;
            inner += `<div class="col-12">
            ${itemName} </br>`;
            if (mediaType == 'tv') inner += `Первая серия: `;
            if (mediaType == 'movie') inner += 'Дата выпуска: ';
            inner += `${dateReleased} </br> </br>
            </div >`;
        });

        movies.innerHTML = inner;

    });

}