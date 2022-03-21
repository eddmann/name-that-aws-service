const { readFileSync } = require('fs');

const LEVELS = 10;
const OPTIONS = 4;

const services = JSON.parse(readFileSync(process.argv[2]));
const name = process.argv[3];

const shuffle = arr => {
  const shuffled = [...arr];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const chunk = (arr, size) =>
  Array.from({ length: arr.length / size }, () => arr.splice(0, size));

const quiz = {
  name,
  levels: chunk(shuffle(services).slice(0, LEVELS * OPTIONS), OPTIONS).map(
    ([answer, ...others]) => ({
      icon: answer.icon,
      answer: answer.name,
      hint: answer.category,
      options: shuffle([answer.name, ...others.map(service => service.name)]),
    })
  ),
};

console.log(JSON.stringify(quiz));
