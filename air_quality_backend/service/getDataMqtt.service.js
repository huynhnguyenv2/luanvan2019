import mqtt from 'mqtt';
import NodeRuntime from '../models/nodeRuntime.model'
function getDataFromMqtt() {
// ===============Setup MQTT Broker==============
  const client = mqtt.connect("mqtt://m11.cloudmqtt.com", {
    username: "ikkwucnu",
    password: "UN9O6syezakc",
    port: 16524,
    clientId: "WebUI"
  })
  client.on("connect", () => {
    client.subscribe("nodes")
  })
  client.on("error", (e) => {
    console.log(e)
  })
  client.on("close", (e) => {
    client.reconnect()
  })
  client.on("message", (topic, message) => {
    const dt = message.toString().split(',')
    console.log(dt)
    const node = new NodeRuntime({
      code_id: Number,
      datatime: Date,
      so2: Number,
      no2: Number,
      o2: Number,
      co: Number
    });
  })
}

export default getDataFromMqtt;