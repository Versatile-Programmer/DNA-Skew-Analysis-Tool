
//Funtion to find maxCumulativeSkew("TERMINUS OF REPLICATION")
//Function takes cumulativeValues Array exported from "cumulativeValues.js"
function findMaxSkew(cumulativeValues)
{
    let max=-Infinity
    cumulativeValues.forEach(element => {
        if(element>max)
            max=element
    });
    return max   
}