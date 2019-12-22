
import * as brain from 'brain.js';
function predictData(data ) {    
    var {dataTrain, xTest} =  createDataTrain(data);
    const net = new brain.recurrent.LSTMTimeStep();
    net.train(dataTrain, { log: true, iterations:200 });

    const output = net.run(xTest);
    console.log(output)
    
}
function createDataTrain(data){
    var xTrain = []
    data.forEach((element) => {
       let hour = parseInt(element['date_time'].split(" ")[1].split(":")[0])
        if (element['so2'] > 0) xTrain.push({hour: hour, factor: element['so2']})
    })
    var yTrain = []
    xTrain.forEach((element,index) => {
        if(index === 0) return
        yTrain.push({predictValue: element.factor})
    })
    var xTest = xTrain.pop();
    var dataTrain = [];
    yTrain.forEach((element, index) => {
        dataTrain.push({ input: xTrain[index], output: yTrain[index] })
    })
    return {dataTrain, xTest}
}

export default predictData;