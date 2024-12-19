export function freqCalculate(segment)
{
    let atcg={
        aCnt:0,
        tCnt:0,
        cCnt:0,
        gCnt:0
    }

    for (let index = 0; index < segment.length; index++) {
            let temp=segment.charAt(index).toLowerCase()
        if(temp==='a')
            atcg.aCnt++
        else if(temp==='t')
            atcg.tCnt++
        else if(temp==='c')
            atcg.cCnt++
        else if(temp==='g')
            atcg.gCnt++
    }
    return atcg;                                                                                                                                                                     

}
