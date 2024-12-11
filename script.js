const input = document.getElementById('song-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');
const audio = document.getElementById('myAudio');

searchButton.addEventListener('click', handleSearch);

async function handleSearch() {
    const query = input.value.trim();
    if (!query) return;

    const url = `http://localhost:3000/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.response && data.response.length > 0) {
            displayResults(data.response);
        } else {
            alert('Музыка не найдена');
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

function displayResults(tracks) {
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'block';

    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track');
        trackElement.innerHTML = `
            <span>${track.artist} - ${track.title}</span>
            <button class="play-track" data-url="${track.url}">Слушать</button>
        `;

        trackElement.querySelector('.play-track').addEventListener('click', () => {
            audio.src = track.url;
            audio.play();
            document.getElementById('playerStatus').textContent = 'Статус: Воспроизводится';
        });

        resultsDiv.appendChild(trackElement);
    });
}

   
