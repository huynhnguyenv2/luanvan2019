#include <ESP8266WiFi.h>        // Include the Wi-Fi library
#include <PubSubClient.h>
#include "DHT.h"        // including the library of DHT11 temperature and humidity sensor
#include <Wire.h>
#include <BH1750.h>

const char* ssid     = "Phong 7";         // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "Phong19123456";     // The password of the Wi-Fi network
const char* mqttServer = "m11.cloudmqtt.com";
const int mqttPort = 16524;
const char* mqttUser = "ikkwucnu";
const char* mqttPassword = "UN9O6syezakc";
const String device_name = "sensor1";
WiFiClient espClient;
PubSubClient client(espClient);
BH1750 lightMeter(0x23);

#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 0
DHT dht(dht_dpin, DHTTYPE); 
void setup(void)
{ 
  dht.begin();
  Serial.begin(115200);
  delay(10);
  
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer  
  
  client.setServer(mqttServer, mqttPort);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP8266Client", mqttUser, mqttPassword )) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }

  Wire.begin(D2,D1);
  if (lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println(F("BH1750 Advanced begin"));
  }
  else {
    Serial.println(F("Error initialising BH1750"));
  }
  
  Serial.println("Humidity,temperature and lux \n\n");
  
  delay(700);

}
void loop() {
    float h = dht.readHumidity();
    float t = dht.readTemperature();  
    float lux = lightMeter.readLightLevel();  
         
    Serial.print("Current humidity = ");
    Serial.print(h);
    Serial.print("%  ");
    Serial.print("temperature = ");
    Serial.print(t); 
    Serial.print("C  ");
    Serial.print("light = ");
    Serial.print(lux);
    Serial.println(" lx");

    client.loop();
    String temperature = String(t);
    String humidity = String(h);
    String light = String(lux);
    String payload = device_name + "," + temperature + "," + humidity + "," + light;
    char attributes[100];
    payload.toCharArray( attributes, 100 );
    client.connect("ESP8266Client", mqttUser, mqttPassword );
    client.publish( "test", attributes );
    delay(5000);
}
