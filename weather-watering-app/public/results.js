document.addEventListener('DOMContentLoaded', function() {
    const results = JSON.parse(localStorage.getItem('results'));
    const resultsDiv = document.getElementById('results');

    if (results) {
        let html = `<h2>Weather Forecast (Next 7 Days)</h2><ul>`;

        // Loop through each day of the weather data
        results.weather.forEach(day => {
            html += `<li><strong>${day.date}:</strong> 
                        Temperature: ${day.temperature.toFixed(1)}°C, 
                        Humidity: ${day.humidity}%, 
                        Precipitation: ${day.precipitation.toFixed(1)}mm, 
                        Condition: ${day.condition}</li>`;
        });

        html += `</ul><h2>Watering Recommendations</h2><ul>`;

        // Loop through each day's watering data
        results.waterUsage.forEach((usage, index) => {
            html += `<li>Day ${index + 1}: 
                        ${usage.liters.toFixed(1)} liters - Suggested time: ${usage.suggestedTime}</li>`;
        });

        html += `</ul>`;
        resultsDiv.innerHTML = html;
    } else {
        resultsDiv.innerHTML = '<p>No results found. Please go back and try again.</p>';
    }
});
