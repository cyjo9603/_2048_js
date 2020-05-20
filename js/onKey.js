class GameController {
  constructor(game) {
    this.game = game;
  }

  /** onPressLeft
   * 왼쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 왼쪽 정렬
   */
  onPressLeft() {
    for (let i = 0; i < this.game.mode; i++) {
      for (let j = 1; j < this.game.mode; j++) {
        let nullCount = 0;
        for (let p = 0; p < j; p++) {
          nullCount += this.game.table.current[i][p] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.game.table.current[i][j - nullCount] = this.game.table.current[i][j];
          this.game.table.current[i][j] = null;
        }
        if (this.game.table.current[i][j - nullCount - 1] === this.game.table.current[i][j - nullCount]) {
          this.game.table.current[i][j - nullCount - 1] *= 2;
          this.game.table.current[i][j - nullCount] = null;
          this.game.updateScore(this.game.table.current[i][j - nullCount - 1]);
        }
      }
    }
  }

  /** onPressUp
   * 위쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 위쪽 정렬
   */
  onPressUp() {
    for (let j = 0; j < this.game.mode; j++) {
      for (let i = 1; i < this.game.mode; i++) {
        let nullCount = 0;
        for (let p = 0; p < i; p++) {
          nullCount += this.game.table.current[p][j] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.game.table.current[i - nullCount][j] = this.game.table.current[i][j];
          this.game.table.current[i][j] = null;
        }
        if (
          i - nullCount - 1 > -1 &&
          this.game.table.current[i - nullCount][j] === this.game.table.current[i - nullCount - 1][j]
        ) {
          this.game.table.current[i - nullCount - 1][j] *= 2;
          this.game.table.current[i - nullCount][j] = null;
          this.game.updateScore(this.game.table.current[i - nullCount - 1][j]);
        }
      }
    }
  }

  /** onPressRight
   * 오른쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 오른쪽 정렬
   */
  onPressRight() {
    for (let i = 0; i < this.game.mode; i++) {
      for (let j = this.game.mode - 2; j > -1; j--) {
        let nullCount = 0;
        for (let p = this.game.mode - 1; p > j; p--) {
          nullCount += this.game.table.current[i][p] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.game.table.current[i][j + nullCount] = this.game.table.current[i][j];
          this.game.table.current[i][j] = null;
        }
        if (this.game.table.current[i][j + nullCount] === this.game.table.current[i][j + nullCount + 1]) {
          this.game.table.current[i][j + nullCount + 1] *= 2;
          this.game.table.current[i][j + nullCount] = null;
          this.game.updateScore(this.game.table.current[i][j + nullCount + 1]);
        }
      }
    }
  }

  /** onPressDown
   * 아랫쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 아랫쪽 정렬
   */
  onPressDown() {
    for (let j = 0; j < this.game.mode; j++) {
      for (let i = this.game.mode - 2; i > -1; i--) {
        let nullCount = 0;
        for (let p = this.game.mode - 1; p > i; p--) {
          nullCount += this.game.table.current[p][j] === null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.game.table.current[i + nullCount][j] = this.game.table.current[i][j];
          this.game.table.current[i][j] = null;
        }
        if (
          i + nullCount + 1 < 4 &&
          this.game.table.current[i + nullCount][j] === this.game.table.current[i + nullCount + 1][j]
        ) {
          this.game.table.current[i + nullCount + 1][j] *= 2;
          this.game.table.current[i + nullCount][j] = null;
          this.game.updateScore(this.game.table.current[i + nullCount + 1][j]);
        }
      }
    }
  }
}

const controller = new GameController(game);

/** onkeyup
 * browser에서 키를 눌렀을 때 실행
 */
window.onkeyup = (e) => {
  // 게임이 실행중인 상태에서만 유효
  if (game.state === 1) {
    game.table.before = util.copyData(game.table.current);
    switch (e.keyCode) {
      case 37:
        controller.onPressLeft();
        break;
      case 38:
        controller.onPressUp();
        break;
      case 39:
        controller.onPressRight();
        break;
      case 40:
        controller.onPressDown();
        break;
      default:
        break;
    }

    // 블록을 정렬시킨 후 블록 생성 및 게임 패배조건 확인
    if (controller.game.checkData() !== controller.game.mode * controller.game.mode) {
      controller.game.createNum();
    } else if (checkFail() === 0) {
      const bestScoreEl = document.getElementById('bestScore');
      controller.game.state = 0;
      if (bestScoreEl.innerText === ' ' || bestScoreEl.innerText < controller.game.score) {
        bestScoreEl.innerText = controller.game.score;
      }
    }

    // 정렬시킨 block값들을 화면에 표시
    controller.game.paintTable();
  }
};
