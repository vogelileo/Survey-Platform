module.exports = (count) => {
  const LENGTH = 6;
  let charArr = [
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const randomChar = () => {
    return charArr[Math.floor(Math.random() * charArr.length)];
  };
  let hex = count.toString(16);
  if (hex.length < LENGTH) {
    let str = '';

    for (let i = 0; i < LENGTH; i++) {
      str = str + randomChar();
    }
    hex = randomChar() + hex + str.substring(0, LENGTH - hex.length);
  }
  return hex;
};
