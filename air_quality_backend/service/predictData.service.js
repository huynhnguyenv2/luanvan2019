
import * as brain from 'brain.js';
import NodeRunTimePrediction from '../models/nodeRuntimePrediction.model'
import NodeRunTime from '../models/nodeRuntime.model'
import moment from 'moment'
function predictData(station_code ) {    
    
    NodeRunTime.find({station_code: station_code}, function(err, node) {
		if (err){
            console.log(err)
		}			
		else {
            
            //console.log(updateTime)
            let  prediction = []
            if (station_code === 111111) {
                let updateTime = node[node.length -1].date_time;
                const outputPredict1 = predictNode(node, 'temp')
                //console.log(outputPredict1)
                const outputPredict2 = predictNode(node, 'humi')
                //const outputPredict3 = predictNode(node, 'light')
                //console.log(outputPredict2)
                
                for (let i = 0; i <= outputPredict1.length; i++) {
                    updateTime = moment(updateTime).add(1, 'minutes').format("YYYY-MM-DD HH:mm:ss")
                    //console.log(i)
                    prediction.push({
                        date_time: updateTime,
                        temp: outputPredict1[i],
                        humi: outputPredict2[i],
                        //light: outputPredict3[i]
                    })       
                }
            } else {
                if (node.length === 0 ) return;
                let updateTime = node[node.length - 12].date_time;
                const outputPredict1 = predictNode(node, 'so2')
                //console.log(outputPredict1)
                const outputPredict2 = predictNode(node, 'no2')
                const outputPredict3 = predictNode(node, 'pm10')
                //console.log(outputPredict2)
                
                for (let i = 0; i <= outputPredict1.length; i++) {
                    updateTime = moment(updateTime).add(1, 'hour').format("YYYY-MM-DD HH:mm:ss")
                    //console.log(i)
                    prediction.push({
                        date_time: updateTime,
                        so2: outputPredict1[i],
                        no2: outputPredict2[i],
                        pm10: outputPredict3[i]
                    })       
                }
            }
            
            let nrp = {
                station_code: station_code,
                prediction: prediction
            }
            
            NodeRunTimePrediction.findOneAndUpdate({station_code: station_code}, nrp, {new: false}, (err, node) => {
                if (err) {
                    console.log(err)    
                }
                else {
                    
                    if (!node) {
                        NodeRunTimePrediction.insertMany([nrp])
                            .then((docs) =>{
                                console.log('save node run time prediction success')
                            })
                            .catch((err) => {
                                console.log("can't save data", err)
                            });
                    } else 
                        console.log('update success')
                }
            })       
        }		
	});
}
function predictNode(data, factor) {
    var {dataTrain, xTest} =  createDataTrain(data, factor);
    const net = new brain.recurrent.LSTMTimeStep({
        inputSize: 1,
        hiddenLayers: [3],
        outputSize: 1
    });
    net.train(dataTrain, { log: true, iterations: 600 });
    const output = net.forecast(xTest, 3);
    return output
}

function createDataTrain(data, factor){
    var xTrain = []
    data.forEach((element) => {
        if (element[factor] > 0) xTrain.push([element[factor]])
    })

    var yTrain = []
    xTrain.forEach((element,index) => {
        if(index === 0) return
        yTrain.push(element)
    })
    var xTest = xTrain.pop();
    var dataTrain = [];
    yTrain.forEach((element, index) => {
        dataTrain.push({ input: xTrain[index], output: yTrain[index] })
    })
 
    return {dataTrain, xTest}
}

export default predictData;