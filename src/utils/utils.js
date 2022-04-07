import { words } from './words';

/** Получить пять случайных слов */
export function getWords() {
  const wordsNum = 5;

  let randomNumArr = [];

  let i = 0;
  while (i < wordsNum) {
    let generatedNum = randomNumber(0, words.length);
    if (!randomNumArr.some(num => num === generatedNum )) {
      randomNumArr.push(generatedNum);
      i++;
    }
  };

  let randomWords = [];
  randomNumArr.map(num => randomWords.push(words[num]));

  return randomWords;
};

/** Получить случайное числа */
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** */
export function formatDate(date) {
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ru', options);
};
