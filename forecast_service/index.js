const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

async function getForecast(lat, long) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&past_days=7&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    const response = await axios.get(url);
    return response.data;
};

app.get('/forecast', async (req, res) => {
    const start = Date.now(); // Start timing
    try {
        // Fetch the selected city from the Current Weather Service
        const coordinatesResponse = await axios.get('http://3.133.123.214:443/selected-coordinates');
        const { lat, long } = coordinatesResponse.data;
        
        // Fetch the forecast data
        const elapsed = Date.now() - start; // Calculate elapsed time
        const data = await getForecast(lat, long);
        // const data = {};
        res.json({ data, elapsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Forecast Service running on http://localhost:${PORT}`);
});
