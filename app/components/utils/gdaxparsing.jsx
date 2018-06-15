import { timeParse } from "d3-time-format";

var Utils = {

};


Utils.ParseGDaxHistoricalRate = function (data){
    //[ time, low, high, open, close, volume ]
    var dataSet = [];
    data.forEach(d => {
        dataSet[dataSet.length] = {
            date : new Date(d[0] * 1000),
            low : d[1],
            high : d[2],
            open : d[3],
            close : d[4],
            volume : d[5]
        };
    });

    dataSet.sort((a,b) => {
        return new Date(a.date) - new Date(b.date);
    });

    return dataSet;
};


export default Utils;



