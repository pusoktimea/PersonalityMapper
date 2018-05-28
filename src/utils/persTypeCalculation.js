import range from 'lodash.range';

export const calculateAnswers = (start, answers) => {
  // const answer is the array of answers submitted ex:["A", "B", "B", "A"...]
  // const keys is the array of answer numbers ex:[0, 7, 14, 21, 28, 35, 42, 49, 56, 63]
  // <- this will represent the nr. of the question
  const keys = range(start, answers.length, 7);
  // with the JS reduce function we all the "A" and "B" answers in the given range ^
  return keys.reduce((acc, key) => {
    if (answers[key]) {
      acc[answers[key]] ? acc[answers[key]] += 1 : acc[answers[key]] = 1;
    }
    return acc;
    // we return the number of the answers -> ex: {A: 3, B: 7}
    // this will be the answerGroupX
  }, {});
};

export const sumAnswers = (group1, group2) => {
  const values = [ 'A', 'B' ];
  return values.reduce(function(obj, k) {
    obj[k] = (group1[k] || 0) + (group2[k] || 0);
    return obj;
  }, {});
};

let persType;

export const compareTypes = (typeSum1, typeSum2, type1, type2) => {
  switch (typeSum1 > typeSum2) {
    case true:
      persType = type1;
      break;

    case false:
      persType = type2;
      break;
  }
  return persType;
};
