export function CalculateSkew(g, c) {
    let x = 0;
    x = (g - c) / (g + c);
    return x;
}



export function calculateCumulative(result1) {

    let cum_val = 0;
    let Cumulative_value = [] //to store cumulative val
    for (let i = 0; i < result1.length; i++) {
        cum_val = cum_val + result1[i];
        Cumulative_value.push(cum_val);

    }

    console.log(Cumulative_value)
    return Cumulative_value;
}

