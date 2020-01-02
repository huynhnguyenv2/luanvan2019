import mqtt from 'mqtt';
import RatingIndex from '../models/ratingIndex.model'
import NodeRuntime from '../models/nodeRuntime.model'
import NodeInfo from '../models/nodeInfo.model'
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
    const dt = JSON.parse(message.toString().split(','));
    const node = new NodeRuntime({...dt});
    node.save((err) => {
      if (err) return console.log(err);
      console.log("success")
      checkStatus(dt)
    });
  })
}

function checkStatus(input) {
  let indexObj = [];
  RatingIndex.find({}, function(err, data) {
    if (err){
      console.log(err)
    }
    else {
      let comment = [];
      indexObj = data;
      for (let prop of indexObj) {
        if (Object.prototype.hasOwnProperty.call(input, prop.index_name)) {
          if(input[prop.index_name] > prop.max) {
            comment.push(prop.index_name + " index too high.")
          } else if (input[prop.index_name] < prop.min && input[prop.index_name] > 0) {
            comment.push(prop.index_name + " index too low.")
          }
        }
      }
      if (comment.length === 0){
        comment.push("Good")
      }

      let resultUpdate = updateNodeInfo(input.station_code, comment);
      return resultUpdate;
    }
  });
  
}

async function updateNodeInfo(id, comment) {
  //console.log("id: ", id," comment", comment)
  const filter = { code : id };
  const update = { status: comment };
  let doc = await NodeInfo.findOneAndUpdate(filter, update, {
    new: true
  });
}
export default getDataFromMqtt;