const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('combined')); // Log HTTP requests

app.post('/api/watering-info', async (req, res) => {
    const { cropType, city, landArea } = req.body;

    // Validate the inputs
    if (!city || landArea <= 0 || !cropType) {
        return res.status(400).send('Invalid city name, land area, or crop type.');
    }

    // Check if cropType is valid
    const waterRequirements = {
        wheat: 500,  // Liters per hectare per day
        corn: 600,
        rice: 700
    };
    if (!waterRequirements[cropType]) {
        return res.status(400).send('Invalid crop type.');
    }

    try {
        // Static weather data for the next 7 days (manually set)
        const weatherData = getMockWeatherData();

        // Example ET data (you can replace this with actual ET data if you have it)
        const etData = Array(7).fill({ value: 5 });  // Static ET values for testing

        // Calculate watering usage dynamically based on precipitation and ET data
        const waterUsage = calculateWaterUsage(cropType, landArea, weatherData, etData);

        res.json({ weather: weatherData, waterUsage });

    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to fetch data. Please try again later.');
    }
});

// Static weather data for the next 7 days
function getMockWeatherData() {
    const currentDate = new Date();
    const mockWeather = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);  // Increment the date by 1 for each day

        mockWeather.push({
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,  // Format as DD/MM/YYYY
            temperature: 25 + Math.random() * 5,  // Random temperature between 25°C and 30°C
            humidity: Math.round(50 + Math.random() * 50),  // Random humidity between 50% and 100%
            precipitation: Math.random() * 10,  // Random precipitation (0 to 10 mm)
            condition: ['Clear', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]  // Random condition
        });
    }

    return mockWeather;
}

function calculateWaterUsage(cropType, landArea, weatherData, etData) {
    const waterRequirements = {
        wheat: 500,  // Base water requirements for each crop type (liters per hectare)
        corn: 600,
        rice: 700
    };

    // Calculate water usage for each day based on precipitation and ET data
    const waterUsage = weatherData.map((day, index) => {
        let liters = waterRequirements[cropType] * landArea; // Base water requirement

        // If it rained, reduce the water need
        if (day.precipitation > 0) {
            liters -= day.precipitation * 100;  // Assuming 1mm of rain reduces the need by 100 liters per hectare
        }

        // Adjust based on ET data (if available)
        if (etData[index] && etData[index].value) {
            // Add ET value (more evapotranspiration means more water needed)
            liters += etData[index].value * landArea; // ET data is typically in mm per day
        }

        // Ensure no negative water usage
        liters = Math.max(liters, 0);

        // Decide watering time based on temperature
        const suggestedTime = day.temperature > 30 ? 'evening' : 'morning';

        return {
            liters: liters,
            suggestedTime: suggestedTime
        };
    });

    return waterUsage;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
