const express = require('express');
const forecastService = require('./forecastService');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/forecast', async (req, res) => {
    const start = Date.now(); // Start timing
    try {
        // Fetch the selected city from the Current Weather Service
        const coordinatesResponse = await axios.get('http://3.143.5.186:3001/selected-coordinates');
        const { lat, long } = coordinatesResponse.data;
        
        // Fetch the forecast data
        const elapsed = Date.now() - start; // Calculate elapsed time
        const data = await forecastService(lat, long);
        res.json({ data, elapsed });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Forecast Service running on http://localhost:${PORT}`);
});
