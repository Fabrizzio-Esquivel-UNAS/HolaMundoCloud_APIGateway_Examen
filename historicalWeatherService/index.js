const express = require('express');
const historicalWeatherService = require('./historicalWeatherService');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/historical', async (req, res) => {
    const start = Date.now(); // Start timing
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'Date is required.' });

    try {
        // Fetch the selected coordinates from the Current Weather Service
        const coordinatesResponse = await axios.get('http://18.220.239.93:3001/selected-coordinates');
        const { lat, long } = coordinatesResponse.data;

        // Fetch the historical weather data
        const elapsed = Date.now() - start; // Calculate elapsed time
        const data = await historicalWeatherService(lat, long, date);
        res.json({ data, elapsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Historical Weather Service running on http://localhost:${PORT}`);
});