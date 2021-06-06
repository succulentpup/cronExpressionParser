const { parser } = require('./helpers/parser.js');
const { formattedDisplay: displayHumanReadableExpressions } = require('./helpers/display');

const cronJobParameters = (process.argv)[2].split(' ');

if (cronJobParameters.length !== 6) {
  console.error(`Invalid number of arguments`);
  process.exit();
}

const parsedExpression = parser(cronJobParameters);
displayHumanReadableExpressions(parsedExpression);

module.exports = {
  parser,
}
