export const shuffle = (array) => {
  let randomIndex,
    currentIndex = array.length;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    // prettier-ignore
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const formatDateTime = (date) => {
  if (!date) return "";
  const m = new Date(date);
  const dateString =
    days[m.getUTCDay()] +
    ", " +
    m.getUTCDate() +
    "/" +
    m.getUTCMonth() +
    "/" +
    m.getUTCFullYear();
  return dateString;
};

 export const calculateGrade = (selectedAnswers , questions) => {
  console.log(selectedAnswers);
  let grade = 0;
  const scorePerQuestion = 100 / questions.length;
  selectedAnswers.forEach((q) => {
    if (q.question.type === "singleChoice") {
      if (q.answer.isCorrect) {
        grade += scorePerQuestion;
      }
    } else {
      let scorePerAnswer = scorePerQuestion;
      let amountOfCorrectAnswers = 0;
      q.question.answers.forEach((a) => {
        if (a.isCorrect) amountOfCorrectAnswers += 1;
      });
      scorePerAnswer = scorePerAnswer / amountOfCorrectAnswers;
      let addToGrade = 0;

      if (q.answer.isCorrect) {
        addToGrade += scorePerAnswer;
      } else {
        addToGrade -= scorePerAnswer;
      }

      if (addToGrade > 0) {
        grade += addToGrade;
      }
    }
  });
  console.log(grade);
  return grade;
};
