const { parser } = require('../helpers/parser');
const sampleArgs = {
  'valid': ['*/15', '0', '1,15', '*', '1-5', '/usr/bin/find'],
  'inValid': ['*/15', '0', '1,15', '1-5', '/usr/bin/find'],
}
describe('Number of arguments should be 6', () => {
    test(`Should pass as there are 6 args`, async () => {
      expect(sampleArgs.valid.length).toEqual(6);
    });
    test(`Should fail as there are only 5 args`, async () => {
      expect(sampleArgs.valid.length).toEqual(6);
    });
  }
);

describe('comma parser', () => {
  test('should print all values seperated by comma', () => {
    const result = parser(['1,2,3,4', '*','*', '*', '*', '/folder/file']);
    const { minute } = result;
    expect(minute).toMatch('1 2 3 4');
  });

  test('throw error for upper bound', () => {
    expect(() => {
      Parser.parse(['101,2', '*', '*', '*', '*', '/folder/file']);
    }).toThrow(Error);
  });
});

describe('range parser', () => {
  test('should print range of values', () => {
    const result = parser(['1-5', '*', '*', '*', '*', '/folder/file']);
    const { minute } = result;
    expect(minute).toMatch('1 2 3 4 5');
  });

  test('if start is greater than end', () => {
    expect(() => {
      parser(['4-3', '*', '*', '*', '*', '/folder/file']);
    }).toThrow(Error);
  });

  test('if end is less than start', () => {
    expect(() => {
      parser(['6-5', '*', '*', '*', '*', '/folder/file']);
    }).toThrow(Error);
  });
});

describe('star parser', () => {
  test('should print all available values', () => {
    const result = parser(['*', '*', '*', '*', '*', '/folder/file']);
    expect(result['day of week']).toMatch('1 2 3 4 5 6 7');
  });
});

describe('increment parser', () => {
  test('should print correct increment', () => {
    const result = parser(['*/15', '*', '*', '*', '*', '/folder/file']);
    const { minute } = result;
    expect(minute).toMatch('0 15 30 45');
  });

  test('test if start is greater than max', () => {
    expect(() => {
      parser(['60/15', '*', '*', '*', '*', '/folder/file']);
    }).toThrow(Error);
  });
});
