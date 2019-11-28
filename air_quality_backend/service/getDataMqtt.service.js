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
    const dt = JSON.parse(message.toString().split(','))
    const node = new NodeRuntime({...dt});
    node.save((err) => {
      if (err) return console.log(err);
      console.log("success")
    });
  })
}

export default getDataFromMqtt;