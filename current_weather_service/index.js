const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let selectedLatitude = null
let selectedLongitude = null; 

async function getCurrentWeather(lat, long) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m`;
    const response = await axios.get(url);
    return response.data;
};

// Endpoint to fetch current weather and save city
app.get('/current-weather', async (req, res) => {
    const { long, lat } = req.query;
    if (!long || !lat) return res.status(400).json({ error: 'Latitude and Longitude are required.' });
    
    selectedLatitude = lat
    selectedLongitude = long; // Save the longitude
    const data = await getCurrentWeather(lat, long);
    res.json(data);
});

// Endpoint to get the selected city
app.get('/selected-coordinates', (req, res) => {
    if (!selectedLatitude || !selectedLongitude) return res.status(404).json({ error: 'No city selected.' });
    res.json({ lat: selectedLatitude, long: selectedLongitude });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Current Weather Service running on http://localhost:${PORT}`);
});
