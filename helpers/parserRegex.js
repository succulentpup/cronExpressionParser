const { createSequentialRange } = require('./rangeLimiters');

const regExpressions = {
  'commaRegex' : `^[0-9]+(,[0-9]+)*$`,
  'starRegex' : '*',
  'incrementRegex' : `^\\*|[0-9]+\\/[0-9]+$`, // anything with / in between numbers
  'rangeRegex' : `^[0-9]+-[0-9]+$`, // anything with commas
};

const isMatched = (regex, input) => {
  // starRegex doesn't really need RegExp because it's as single '*'.
  if (regex === 'starRegex') return input === '*';

  const matcher = new RegExp(regExpressions[regex]);
  return matcher.test(input);
};

// Returns the values seperated by comma
// e.g. 1,5 = 1 5
const commaParser = (pattern, lower, max) => {
  const parse = () => {
    const parts = pattern.split(',');
    let range = '';
    parts.forEach((part) => {
      if (part < lower || part > max) throw new Error(`Invalid range for ${part} in ${pattern}`);
      range += ` ${part}`;
    });

    return range;
  }

  return { parse };
};

// Returns list of incremented values
// e.g. 1/15 0 15 30 ...
const incrementParser = (pattern, lower, max) => {
  const parse = () => {
    const parts = pattern.split('/');
    let start = parts[0];
    const increment = parts[1];

    // for * we set it to the allowed min
    if (start === '*') start = lower;
    if (start < lower || start > max) {
      throw new Error(`Check the start and end bounds of the pattern ${pattern}`);
    }
    let range = '';
    for (let i = start; i < max; i+=1) {
      if (i % increment === 0) range += ` ${i}`;
    }
    return range;
  }
  return { parse };
};

// Returns all the values that are allowed between the dash
// e.g. 1-5 = 1 2 3 4 5
const rangeParser = (pattern, lower, max) => {
  const parse = () => {
    const parts = pattern.split('-');
    const start = parts[0];
    const end = parts[1];

    // Some error checking
    if (!start || !end) {
      throw new Error(`Invalid range format ${pattern}`);
    }
    if (start > end) {
      throw new Error(`Range format is the wrong way round ${pattern}`);
    }
    if (start < lower || end > max) {
      throw new Error(`Check the start and end bounds of the pattern ${pattern}`);
    }

    return createSequentialRange(start, end);
  }
  return { parse };
};

// Returns all the possible values for the allowed range
// e.g. * of month = 1 2 3 4 5 6 7 8 9 10 11 12
const starParser = (pattern, lower, max) => {
  // create the range
  const parse = () => {
    return createSequentialRange(lower, max);
  }

  return { parse };
};

// don't change the order of this keys, starRegex should be prior to incrementRegex
const regExParserMap = {
  'starRegex': starParser,
  'commaRegex': commaParser,
  'incrementRegex': incrementParser,
  'rangeRegex': rangeParser,
};

const getParser = (cronJobParam) => {
  let parser = undefined;
  // find the tempParser and return
  const regExAndParserEntries = Object.entries(regExParserMap);
  for (const regExAndParserEntry of regExAndParserEntries) {
    if (isMatched(regExAndParserEntry[0] ,cronJobParam)) {
      parser = regExParserMap[regExAndParserEntry[0]];
      break;
    }
  }
  return parser;
};

module.exports = {
  getParser,
}
