const { getHumanReadableExpression } = require('./expressionCreator');
const { timeRange, dayRange } = require('./rangeLimiters');

const parser = ([minute, hour, dayOfMonth, month, dayOfWeek, command]) =>
  ({
    'minute': getHumanReadableExpression(
      {
        paramValue: minute,
        range: timeRange.minute,
      }),
    'hour': getHumanReadableExpression(
      {
        paramValue: hour,
        range: timeRange.hour,
      }),
    'day of month': getHumanReadableExpression(
      {
        paramValue: dayOfMonth,
        range: dayRange.dayOfMonth,
      }),
    'month': getHumanReadableExpression(
      {
        paramValue: month,
        range: dayRange.month,
      }),
    'day of week': getHumanReadableExpression(
      {
        paramValue: dayOfWeek,
        range: dayRange.dayOfWeek,
      }),
    command,
  });

module.exports = {
  parser,
}
