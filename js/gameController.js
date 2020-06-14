class GameController {
  constructor(model) {
    this.model = model;
  }

  /** onPressLeft
   * 왼쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 왼쪽 정렬
   */
  onPressLeft() {
    for (let i = 0; i < this.model.mode; i++) {
      for (let j = 1; j < this.model.mode; j++) {
        let nullCount = 0;
        for (let p = 0; p < j; p++) {
          nullCount += this.model.table.current[i][p] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.model.table.current[i][j - nullCount] = this.model.table.current[i][j];
          this.model.table.current[i][j] = null;
        }
        if (this.model.table.current[i][j - nullCount - 1] === this.model.table.current[i][j - nullCount]) {
          this.model.table.current[i][j - nullCount - 1] *= 2;
          this.model.table.current[i][j - nullCount] = null;
          this.model.updateScore(this.model.table.current[i][j - nullCount - 1]);
        }
      }
    }
    this.model.updateTableAfter();
  }

  /** onPressUp
   * 위쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 위쪽 정렬
   */
  onPressUp() {
    for (let j = 0; j < this.model.mode; j++) {
      for (let i = 1; i < this.model.mode; i++) {
        let nullCount = 0;
        for (let p = 0; p < i; p++) {
          nullCount += this.model.table.current[p][j] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.model.table.current[i - nullCount][j] = this.model.table.current[i][j];
          this.model.table.current[i][j] = null;
        }
        if (
          i - nullCount - 1 > -1 &&
          this.model.table.current[i - nullCount][j] === this.model.table.current[i - nullCount - 1][j]
        ) {
          this.model.table.current[i - nullCount - 1][j] *= 2;
          this.model.table.current[i - nullCount][j] = null;
          this.model.updateScore(this.model.table.current[i - nullCount - 1][j]);
        }
      }
    }
    this.model.updateTableAfter();
  }

  /** onPressRight
   * 오른쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 오른쪽 정렬
   */
  onPressRight() {
    for (let i = 0; i < this.model.mode; i++) {
      for (let j = this.model.mode - 2; j > -1; j--) {
        let nullCount = 0;
        for (let p = this.model.mode - 1; p > j; p--) {
          nullCount += this.model.table.current[i][p] == null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.model.table.current[i][j + nullCount] = this.model.table.current[i][j];
          this.model.table.current[i][j] = null;
        }
        if (this.model.table.current[i][j + nullCount] === this.model.table.current[i][j + nullCount + 1]) {
          this.model.table.current[i][j + nullCount + 1] *= 2;
          this.model.table.current[i][j + nullCount] = null;
          this.model.updateScore(this.model.table.current[i][j + nullCount + 1]);
        }
      }
    }
    this.model.updateTableAfter();
  }

  /** onPressDown
   * 아랫쪽 화살표키를 눌렀을 때 실행
   * 삭제될 블록이 있는지 탐색 후, 있다면
   * 블록을 삭제한 뒤 다른 블록의 값을 2배 증가시키고,
   * 블록을 아랫쪽 정렬
   */
  onPressDown() {
    for (let j = 0; j < this.model.mode; j++) {
      for (let i = this.model.mode - 2; i > -1; i--) {
        let nullCount = 0;
        for (let p = this.model.mode - 1; p > i; p--) {
          nullCount += this.model.table.current[p][j] === null ? 1 : 0;
        }
        if (nullCount !== 0) {
          this.model.table.current[i + nullCount][j] = this.model.table.current[i][j];
          this.model.table.current[i][j] = null;
        }
        if (
          i + nullCount + 1 < 4 &&
          this.model.table.current[i + nullCount][j] === this.model.table.current[i + nullCount + 1][j]
        ) {
          this.model.table.current[i + nullCount + 1][j] *= 2;
          this.model.table.current[i + nullCount][j] = null;
          this.model.updateScore(this.model.table.current[i + nullCount + 1][j]);
        }
      }
    }
    this.model.updateTableAfter();
  }
}
