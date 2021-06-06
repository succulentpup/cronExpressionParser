const { getParser } = require('./parserRegex');

const getHumanReadableExpression = (cronJobParamAndRangeLimiters) => {
  const parser = getParser(cronJobParamAndRangeLimiters.paramValue);
  return parser(
    cronJobParamAndRangeLimiters.paramValue,
    cronJobParamAndRangeLimiters.range.lower,
    cronJobParamAndRangeLimiters.range.max,
  ).parse(cronJobParamAndRangeLimiters.paramValue);
};
module.exports = {
  getHumanReadableExpression,
}
