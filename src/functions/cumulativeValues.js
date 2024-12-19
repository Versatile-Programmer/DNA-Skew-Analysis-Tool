export function CalculateSkew(g, c) {
    let x = 0;
    x = (g - c) / (g + c);
    return x;
}



export function calculateCumulative(result1) {

    let cum_val = 0;
    let Cumlative_value = [] //to store cumlative val
    for (let i = 0; i < result1.length; i++) {
        cum_val = cum_val + result1[i];
        Cumlative_value.push(cum_val);

    }

    console.log(Cumlative_value)
    return Cumlative_value;
}

