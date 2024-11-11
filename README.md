# skyhack
# Weather Watering App

A simple Node.js application that provides watering information for crops based on weather data. This application calculates the amount of water needed for different crop types based on land area, weather conditions, and evapotranspiration data.

## Features

- Accepts crop type, city, and land area as input.
- Validates user input.
- Gets weather data for the next 7 days.
- Calculates daily water usage based on weather conditions and crop requirements.
- Suggests optimal watering times based on temperature.

## Technologies Used

- Node.js
- Express.js
- Body-Parser
- dotenv
- Morgan

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/oz456/skyhack

2. Start The Server
   ```bash
   node server.js
   
3. Enter "localhost:3000" in your browser


Additional Developments- 
Used esp32,capcitive soil moisture sensor to check the moisture level in the soil and sent it to the cloud.
