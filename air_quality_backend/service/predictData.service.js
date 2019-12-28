
import * as brain from 'brain.js';
import NodeRunTimePrediction from '../models/nodeRuntimePrediction.model'
import NodeRunTime from '../models/nodeRuntime.model'
import moment from 'moment'
function predictData() {    
    NodeRunTime.find({station_code: 28079008}, function(err, node) {
		if (err){
            console.log(err)
		}			
		else {
            let updateTime = node[1].date_time;
            console.log(updateTime)
            let station_code = 28079008
            const outputPredict1 = predictNode(node.slice(0,2), 'so2')
            const outputPredict2 = predictNode(node.slice(0,2), 'no2')
            const outputPredict3 = predictNode(node.slice(0,2), 'co')
            console.log(outputPredict2)
            let  prediction = []
            for (let i = 0; i <= outputPredict1.length; i++) {
                updateTime = moment(updateTime).add(1, 'hour').format("YYYY-MM-DD HH:mm:ss")
                //console.log(i)
                prediction.push({
                    date_time: updateTime,
                    so2: outputPredict1[i],
                    no2: outputPredict2[i],
                    o2: 0,
                    co: outputPredict3[i]
                })       
            }
            let nrp = {
                station_code: station_code,
                prediction: prediction
            }
            
            NodeRunTimePrediction.findOneAndUpdate({station_code: 28079008}, nrp, {new: false}, (err, node) => {
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
    const net = new brain.recurrent.LSTMTimeStep();
    net.train(dataTrain, { log: true, iterations: 100 });
    const output = net.forecast(xTest, 3);
    return output
}
function createDataTrain(data, factor){
    var xTrain = []
    data.forEach((element) => {
    //    let hour = parseInt(element['date_time'].split(" ")[1].split(":")[0])
    //     if (element[factor] > 0) xTrain.push({hour: hour, factor: element[factor]})
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
    //console.log(dataTrain)
    return {dataTrain, xTest}
}

export default predictData;