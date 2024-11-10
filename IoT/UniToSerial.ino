// Pin for capacitive soil moisture sensor
const int moisturePin = A2;  // Analog pin A2 for moisture sensor

// Variable to store sensor reading
int moistureValue = 0;

void setup() {
  // Start serial communication for monitoring values
  Serial.begin(9600);
  pinMode(moisturePin, INPUT);
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
  delay(1000);  // Update every 1 second
}
