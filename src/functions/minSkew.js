
//Funtion to find minCumulativeSkew("ORIGIN OF REPLICATION")
//Function takes cumulativeValues Array exported from "cumulativeValues.js"
function findMinSkew(cumulativeValues)
{
    let min=Infinity
    cumulativeValues.forEach(element => {
        if(element<min)
            min=element
    });
    return min   
}
