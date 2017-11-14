function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateSteps = (length) => {
  return Array.from(Array(length), () => randNum(1,4));
}

export { generateSteps };