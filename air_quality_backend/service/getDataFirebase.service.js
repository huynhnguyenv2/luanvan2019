import getFireBase from '../config/firebase.config';
let nodes = []
getFireBase.once(
  "value", 
  (db) => {
    db.forEach((item) => {
      var childData = item.val(); 
      nodes.push({
        id: childData.id,
        datetime: childData.date_time,
        so2: parseFloat(childData.so2).toFixed(2),
        o2: parseFloat(childData.o2).toFixed(2),
        no2: parseFloat(childData.no2).toFixed(2),
        pm10: parseFloat(childData.pm10).toFixed(2),
        co: parseFloat(childData.co).toFixed(2),
      });      
    });
    return nodes
  },
  (err) => {
    return err;
  }
);

export default nodes;