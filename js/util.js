// eslint-disable-next-line no-unused-vars
const util = {
  /**
   * checkNull
   * 배열의 값중 null인 값의 count가 배열 전체크기보다
   * 작으면 1, 크면 2를 반환
   */
  checkNull: () => {
    const flatTable = gameData.table.current.flat();
    const count = flatTable.reduce((nullCount, v) => (v !== null ? ++nullCount : nullCount), 0);

    return count < gameData.mode ** 2 ? 1 : 2;
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
};
