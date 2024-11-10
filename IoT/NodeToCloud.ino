#include <ESP8266WiFi.h>
#include <ThingSpeak.h>

// Network Credentials
const char* ssid = "DemoSsid";       ///////////// Add Wi-Fi SSID
const char* password = "DemoPass";  //////////// Add your Wi-Fi Password

// ThingSpeak settings
unsigned long channelID = 0000000;   //////////// Demo ThingSpeak channel ID
const char * writeAPIKey = "DEMO1234DEMO5678"; //////////// Demo ThingSpeak Write API Key

WiFiClient client;

// Pin for capacitive soil moisture sensor
const int moisturePin = 34;  // Connect to any analog pin
// Variable to store sensor reading
int moistureValue = 0;

void setup() {
  // Start serial communication for monitoring values
  Serial.begin(9600);
  
  pinMode(moisturePin, INPUT);
  delay(10);

  // Connecting to Wi-Fi
  Serial.println();
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);

  // Wait for the Wi-Fi connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }

  // Successfully connected
  Serial.println("Connected to Wi-Fi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize ThingSpeak
  ThingSpeak.begin(client);
}

void loop() {
  // Read the analog value from the moisture sensor
  moistureValue = analogRead(moisturePin);
  
  // Print the moisture value to the Serial Monitor
  Serial.print("Moisture Value: ");
  Serial.println(moistureValue);
  
  // Convert the value to a moisture percentage (optional)
  int moisturePercentage = map(moistureValue, 1023, 0, 0, 100);  // Map the value to a percentage (dry -> wet)
  Serial.print("Moisture Percentage: ");
  Serial.print(moisturePercentage);
  Serial.println("%");

  // Wait for a bit before taking the next reading
  delay(1000);  // Update every 1 second  // Send random number to ThingSpeak
  ThingSpeak.setField(1, moisturePercentage);  // Field 1 is for the random number

  // Write the data to ThingSpeak
  int statusCode = ThingSpeak.writeFields(channelID, writeAPIKey);

  // Check if the data was successfully written to ThingSpeak
  if (statusCode == 200) {
    Serial.println("Data sent to ThingSpeak successfully.");
  } else {
    Serial.println("Error sending data to ThingSpeak.");
  }

  // Wait 20 seconds before sending the next update
  delay(20000);  // Update every 20 seconds
}
