export function freqCalculate(segment)
{
    let actg={
        aCnt:0,
        tCnt:0,
        cCnt:0,
        gCnt:0
    }

    for (let index = 0; index < segment.length; index++) {
            let temp=segment.charAt(index).toLowerCase()
        if(temp==='a')
            actg.aCnt++
        else if(temp==='t')
            actg.tCnt++
        else if(temp==='c')
            actg.cCnt++
        else if(temp==='g')
            actg.gCnt++
    }
    return actg;                                                                                                                                                                     

}
