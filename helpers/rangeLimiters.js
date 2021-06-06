const timeRange = {
  minute: {
    lower: 0,
    max: 59,
  },
  hour: {
    lower: 0,
    max: 24,
  },
};
const dayRange = {
  dayOfMonth: {
    lower: 0,
    max: 31,
  },
  month: {
    lower: 0,
    max: 12,
  },
  dayOfWeek: {
    lower: 0,
    max: 7,
  },
};

const createSequentialRange = (start, end) => {
  let values = '';
  for (let range = start; range <= end; range++) {
    values += ` ${range}`;
  }
  return values;
}

module.exports = { timeRange, dayRange, createSequentialRange };
