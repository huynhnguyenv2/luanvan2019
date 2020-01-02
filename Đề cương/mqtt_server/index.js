let express = require('express')
let mqtt = require('mqtt')
let JsonDB = require('node-json-db')
let bodyParser = require('body-parser')

// ===============Setup MQTT Broker==============
const client = mqtt.connect("mqtt://m11.cloudmqtt.com", {
    username: "ikkwucnu",
    password: "UN9O6syezakc",
    port: 16524,
    clientId: "WebUI"
})
client.on("connect", () => {
    client.subscribe("test")
    client.subscribe("Status")
    console.log("connected!")
})
client.on("error", (e) => {
    console.log(e)
})
client.on("close", (e) => {
    client.reconnect()
})
client.on("message", (topic, message) => {
    addData(message)
})

// ===============Database================
const db  = new JsonDB("temps", true, true, true, true, true) // Create a database to save temperature, humidity, light data, included temp value and time

const addData = (data) => {
    try{
        let array = data.toString().split(",")
        let device = array[0]
        let temp= parseFloat(array[1]) 
        let humi = parseFloat(array[2])
        let light = parseFloat(array[3])// Get float data
        let now = new Date()
        let key = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
        db.push('/temp[]', {
            time: key,
            device: device,
            temperature: temp,
            humidity: humi,
            light: light
        })
    } catch (error) {
        console.log(error)
    }
}

const getData = () => {
    let key = []
    let temp = []
    let humi = []
    let light = []
    let values = db.getData("/temp")
    for (i = 0; i < values.length; i++) {
        let info = values[i]
        key.push(info.time)
        temp.push(info.temperature)
        humi.push(info.humidity)
        light.push(info.light)
    }
    return {
        key: key,
        temperature: temp,
        humidity: humi,
        light: light,
    }
}

// ==============Express================
const server = express();
server.use(express.static('static'))
server.use(express.json())
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

/*==Home==*/
server.get(['/', '/home'], (req, res) => {
    res.sendFile('static/home.html' , { root : __dirname})
});
/*==Remote==*/
server.get('/remote', (req, res) => {
    res.sendFile('static/remote.html' , { root : __dirname})
})
/*==Return temps data==*/
server.post('/getData', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(getData()))
})

server.listen(3000, () => {
    console.log("Server dang chay o cong 3000, nhan Ctrl + C de stop server")
})