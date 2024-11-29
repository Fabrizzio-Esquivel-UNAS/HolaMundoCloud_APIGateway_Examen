const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

async function getHistoricalWeather(lat, long, date) {
    const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${lat}&longitude=${long}&start_date=${date}&end_date=${date}&hourly=temperature_2m`;
    const response = await axios.get(url);
    return response.data;
};

app.get('/historical', async (req, res) => {
    const start = Date.now(); // Start timing
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date is required.' });

    try {
        // Fetch the selected coordinates from the Current Weather Service
        const coordinatesResponse = await axios.get('http://3.143.5.186:3001/selected-coordinates');
        const { lat, long } = coordinatesResponse.data;

        // Fetch the historical weather data
        const elapsed = Date.now() - start; // Calculate elapsed time
        const data = await getHistoricalWeather(lat, long, date);
        // const data = {}
        res.json({ data, elapsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Historical Weather Service running on http://localhost:${PORT}`);
});
