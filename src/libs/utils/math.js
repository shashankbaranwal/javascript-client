const getRandomNumber = (max) => (Math.floor(Math.random() * Math.floor(max - 1)));
const getNextRoundRobin = (current, total) => (current === total - 1 ? 0 : current + 1);
export { getRandomNumber, getNextRoundRobin };
