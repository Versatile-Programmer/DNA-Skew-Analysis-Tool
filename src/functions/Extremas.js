export const findMaxAndMinSegments = (cumulativeArray) => {
    let maxIndex = 0;
    let minIndex = 0;
    let maxValue = cumulativeArray[0];
    let minValue = cumulativeArray[0];
  
    for (let i = 1; i < cumulativeArray.length; i++) {
      if (cumulativeArray[i] > maxValue) {
        maxValue = cumulativeArray[i];
        maxIndex = i;
      }
      if (cumulativeArray[i] < minValue) {
        minValue = cumulativeArray[i];
        minIndex = i;
      }
    }
  
    return {
      maxSegment: maxIndex + 1, // Segment numbers start from 1
      maxValue,
      minSegment: minIndex + 1,
      minValue,
    };
  };
  // This is the function to find extremas of any graph as it takes the result of calculateCumulativeData and tells the maximum and minimum cumulative sum and it's corresponding segment number.
  