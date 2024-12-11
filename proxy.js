const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const url = `https://api.vk.com/method/audio.search?q=${query}&access_token=YOUR_ACCESS_TOKEN&v=5.131`;

    axios.get(url)
        .then(response => {
            if (response.data.response && response.data.response.length > 0) {
                res.json(response.data.response);
            } else {
                res.status(404).send('Музыка не найдена');
            }
        })
        .catch(error => {
            console.error("Ошибка при запросе к VK:", error);
            res.status(500).send('Ошибка сервера');
        });
});

app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});