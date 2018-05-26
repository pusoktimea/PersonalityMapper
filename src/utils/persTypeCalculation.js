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

export const getPersType = persTypeResult => {
  switch (persTypeResult) {
    case 'ENFJ':
      persTypeResult = 'ENFJ - The Giver ';
      break;
    case 'ENTJ':
      persTypeResult = 'ENTJ - The Executive';
      break;
    case 'ENFP':
      persTypeResult = 'ENFP - The Inspirer';
      break;
    case 'ENTP':
      persTypeResult = 'ENTP - The Visionary';
      break;
    case 'ESFJ':
      persTypeResult = 'ESFJ - The Caregiver';
      break;
    case 'ESFP':
      persTypeResult = 'ESFP - The Performer';
      break;
    case 'ESTJ':
      persTypeResult = 'ESTJ - The Guardian';
      break;
    case 'ESTP':
      persTypeResult = 'ESTP - The Doer';
      break;
    case 'INFJ':
      persTypeResult = 'INFJ - The Protector';
      break;
    case 'INFP':
      persTypeResult = 'INFP - The Idealist';
      break;
    case 'INTJ':
      persTypeResult = 'INTJ - The Scientist';
      break;
    case 'INTP':
      persTypeResult = 'INTP - The Thinker';
      break;
    case 'ISFJ':
      persTypeResult = 'ISFJ - The Nurturer';
      break;
    case 'ISFP':
      persTypeResult = 'ISFP - The Artist';
      break;
    case 'ISTJ':
      persTypeResult = 'ISTJ - The Duty Fulfiller';
      break;
    case 'ISTP':
      persTypeResult = 'ISTP - The Mechanic';
      break;
    default: return 'Please Complete Personality Test';
  }
  return persTypeResult;
};
