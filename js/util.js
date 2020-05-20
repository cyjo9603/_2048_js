// eslint-disable-next-line no-unused-vars
const color = [
  ['#D4CDC5', 'none'],
  ['#ECE3DA', '#685F58'],
  ['#EADFC9', '#685F58'],
  ['#E7B383', '#FFF5DE'],
  ['#E7996B', '#FFF5DE'],
  ['#E58366', '#FFF5DE'],
  ['#E46747', '#FFF5DE'],
  ['#E9D07E', '#FFF5DE'],
  ['#E7C07E', '#FFF5DE'],
  ['#E7CA66', '#FFF5DE'],
  ['#ff685d', '#333333'],
  ['#ff685d', 'red'],
];

const util = {
  /**
   * checkNull
   * 배열의 값중 null인 값의 count가 배열 전체크기보다
   * 작으면 1, 크면 2를 반환
   */
  checkNull: (table, mode) => {
    const flatTable = table.flat();
    const count = flatTable.reduce((nullCount, v) => (v !== null ? ++nullCount : nullCount), 0);

    return count < mode ** 2 ? 1 : 2;
  },

  /**
   * checkData
   * 두 배열의 원소들을 비교해 같은 값의 count를 반환
   */
  checkData: () => {
    let check = 0;
    for (let i = 0; i < gameData.mode; i++) {
      for (let j = 0; j < gameData.mode; j++) {
        if (gameData.table.before[i][j] === gameData.table.current[i][j]) check++;
      }
    }
    return check;
  },

  /**
   * getRandomNumber
   * 0~number범위에서 랜덤한 정수값을 반환
   */
  getRandomNumber: (number) => Math.floor(Math.random() * number),

  /**
   * getIndex
   * 테이블 전체 크기값 범위의 숫자를 입력하면
   * row와 column의 index를 배열로 반환
   */
  getIndex: (inputNumber, mode) => {
    const index = [0, inputNumber];

    if (index[1] > mode - 1) {
      while (index[1] > mode - 1) {
        index[1] -= mode;
        index[0]++;
      }
    }

    return index;
  },

  /**
   * getColor
   * 테이블의 값을 전달해주면 값에 맞는 배경색과 글자색을 반환
   */
  getColor: (space, num) => {
    const value = num > 2048 ? 2048 : num || 1;
    const [bgColor, numColor] = color.find((v, i) => 2 ** i === value);

    return { space, bgColor, numColor };
  },
};
