const App = require('../../src/App');
const MissionUtils = require('@woowacourse/mission-utils');

const mockQuestions = answers => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
      callback(input);
    });
  }, MissionUtils.Console.readLine);
};

const mockRandoms = numbers => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

test('5등 테스트', () => {
  mockRandoms([[1, 2, 3, 4, 5, 6]]);
  mockQuestions(['1000', '1,2,3,10,9,8', '7']);
  const logs = [
    '1개를 구매했습니다.',
    '[1, 2, 3, 4, 5, 6]',
    '3개 일치 (5,000원) - 1개',
    '4개 일치 (50,000원) - 0개',
    '5개 일치 (1,500,000원) - 0개',
    '5개 일치, 보너스 볼 일치 (30,000,000원) - 0개',
    '6개 일치 (2,000,000,000원) - 0개',
    '총 수익률은 500.0%입니다.',
  ];
  const logSpy = getLogSpy();
  const app = new App();
  app.play();
  logs.forEach(log => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
});
