const PADDING_LENGTH = 14;
const formattedDisplay = (jsonObj) => {
  const entries = Object.entries(jsonObj);
  entries.forEach((entry) => {
    console.log(`${entry[0].padEnd(PADDING_LENGTH)} ${entry[1]}`);
  });
}

module.exports = {
  formattedDisplay,
}
