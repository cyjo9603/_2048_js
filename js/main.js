class Game {
  constructor(gameBoardId) {
    this.gameBoard = document.getElementById(gameBoardId);
    this.score = 0;
    this.state = 0;
    this.mode = 4;
    this.table = {
      current: [],
      before: [],
    };
  }

  /**
   * initSetGameBoard
   * gameBoard 초기화 및 table 초기화
   */
  initSetGameBoard() {
    this.gameBoard.innerHTML = '';
    this.table.current = [];
    this.table.before = [];
    for (let i = 0; i < this.mode; i++) {
      this.table.current.push([]);
      this.table.before.push([]);
      for (let j = 0; j < this.mode; j++) {
        const div = document.createElement('div');
        div.className = `block_${this.mode}`;
        div.id = `tb_${i}${j}`;
        this.gameBoard.appendChild(div);
        this.table.current[i].push(null);
        this.table.before[i].push(null);
      }
    }
    this.gameBoard.className = `gameboard_${this.mode}`;
  }

  /**
   * createNum
   * 비어있는 임의의 table에 2 또는 4의 값을 삽입
   */
  createNum() {
    if (util.checkNull(this.table.current, this.mode) === 1) {
      while (true) {
        const num = util.getRandomNumber(this.mode ** 2);
        if (this.table.current[util.getIndex(num, this.mode)[0]][util.getIndex(num, this.mode)[1]] === null) {
          this.table.current[util.getIndex(num, this.mode)[0]][util.getIndex(num, this.mode)[1]] =
            util.getRandomNumber(10) < 2 ? 4 : 2;
          break;
        }
      }
    }
  }

  /**
   * setColor
   * space(table index)와 배경색, 글자색을 매개변수로 받아
   * 해당 색상으로 block color를 변경
   */
  setColor({ space, bgColor, numColor }) {
    const blockColor = document.querySelectorAll(`div.block_${this.mode}`);
    blockColor[space].style.background = bgColor;
    blockColor[space].style.color = numColor;
  }

  /**
   * paintTable
   * table의 모든 요소에 setColor메소드를 적용시켜
   * 각각 값에 맞는 색상으로 변경
   */
  paintTable() {
    for (let i = 0; i < this.mode; i++) {
      for (let j = 0; j < this.mode; j++) {
        document.getElementById(`tb_${i}${j}`).innerText = this.table.current[i][j];
        this.setColor(util.getColor(i * this.mode + j, this.table.current[i][j]));
      }
    }
  }

  /**
   * updateScore
   * 블록을 제거하면 해당 블록의 값만큼
   * socore변수 증가 및 화면에 출력
   */
  updateScore(num) {
    if (!isNaN(num)) {
      this.score += num;
      document.getElementById('score').innerText = this.score;
    }
  }

  /**
   * checkData
   * 두 배열의 원소들을 비교해 같은 값의 count를 반환
   */
  checkData() {
    let check = 0;
    for (let i = 0; i < this.mode; i++) {
      for (let j = 0; j < this.mode; j++) {
        if (this.table.before[i][j] === this.table.current[i][j]) check++;
      }
    }
    return check;
  }

  /** checkFail
   * 모든 테이블의 요소를 검사해서 빈블록이 있는지 확인,
   * 더이상 제거할 수 있는 블록이 있는지 확인한 후,
   * 모두 해당되는 값의 count를 반환
   */
  checkFail() {
    if (util.checkData() === this.mode * this.mode && util.checkNull() === 2) {
      let cnt = 0;
      for (let i = 0; i < this.mode - 1; i++) {
        for (let j = 0; j < this.mode - 1; j++) {
          if (
            this.table.current[i][j] !== null &&
            (this.table.current[i][j] === this.table.current[i][j + 1] ||
              this.table.current[i][j] === this.table.current[i + 1][j])
          )
            cnt++;
        }
      }
      return cnt;
    }
  }

  /** changeMode
   * 모드를 변경하고 화면에 해당 모드 레벨을 출력
   */
  changeMode(num) {
    const nowMode = Number(document.getElementById('status_mode').innerText) + Number(num);

    if (nowMode > 3 && nowMode < 9) {
      document.getElementById('status_mode').innerText = nowMode;
      this.mode = nowMode;
    }
  }

  /** onUndo
   * 뒤로하기 버튼으로 한번에 한하여
   * 전의 블록상태로 돌아간다.
   */
  onUndo() {
    if (this.state === 1) {
      for (let i = 0; i < this.mode; i++) {
        for (let j = 0; j < this.mode; j++) {
          document.getElementById(`tb_${i}${j}`).innerText = this.table.before[i][j];
          this.setColor(util.getColor(i * this.mode + j, this.table.before[i][j]));
        }
      }
    }
  }

  /** onStart
   * 시작버튼을 누르면 테이블 및 변수 초기화 후,
   * 숫자를 임의로 생성한 뒤 화면에 그려주며 게임 시작
   */
  onStart() {
    this.initSetGameBoard();
    this.score = 0;
    this.state = 1;
    document.getElementById('score').innerText = this.score;
    this.createNum();
    this.paintTable();
  }
}

const game = new Game('gameboard1');

window.onkeyup = (e) => {
  if (game.state === 1) {
    game.table.before = util.copyData(game.table.current);
    switch (e.keyCode) {
      case 37:
        for (let i = 0; i < game.mode; i++) {
          for (let j = 1; j < game.mode; j++) {
            let nullCount = 0;
            for (let p = 0; p < j; p++) {
              nullCount += game.table.current[i][p] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              game.table.current[i][j - nullCount] = game.table.current[i][j];
              game.table.current[i][j] = null;
            }
            if (game.table.current[i][j - nullCount - 1] === game.table.current[i][j - nullCount]) {
              game.table.current[i][j - nullCount - 1] *= 2;
              game.table.current[i][j - nullCount] = null;
              game.updateScore(game.table.current[i][j - nullCount - 1]);
            }
          }
        }
        break;
      case 38:
        for (let j = 0; j < game.mode; j++) {
          for (let i = 1; i < game.mode; i++) {
            let nullCount = 0;
            for (let p = 0; p < i; p++) {
              nullCount += game.table.current[p][j] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              game.table.current[i - nullCount][j] = game.table.current[i][j];
              game.table.current[i][j] = null;
            }
            if (
              i - nullCount - 1 > -1 &&
              game.table.current[i - nullCount][j] === game.table.current[i - nullCount - 1][j]
            ) {
              game.table.current[i - nullCount - 1][j] *= 2;
              game.table.current[i - nullCount][j] = null;
              game.updateScore(game.table.current[i - nullCount - 1][j]);
            }
          }
        }
        break;
      case 39:
        for (let i = 0; i < game.mode; i++) {
          for (let j = game.mode - 2; j > -1; j--) {
            let nullCount = 0;
            for (let p = game.mode - 1; p > j; p--) {
              nullCount += game.table.current[i][p] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              game.table.current[i][j + nullCount] = game.table.current[i][j];
              game.table.current[i][j] = null;
            }
            if (game.table.current[i][j + nullCount] === game.table.current[i][j + nullCount + 1]) {
              game.table.current[i][j + nullCount + 1] *= 2;
              game.table.current[i][j + nullCount] = null;
              game.updateScore(game.table.current[i][j + nullCount + 1]);
            }
          }
        }
        break;
      case 40:
        for (let j = 0; j < game.mode; j++) {
          for (let i = game.mode - 2; i > -1; i--) {
            let nullCount = 0;
            for (let p = game.mode - 1; p > i; p--) {
              nullCount += game.table.current[p][j] === null ? 1 : 0;
            }
            if (nullCount !== 0) {
              game.table.current[i + nullCount][j] = game.table.current[i][j];
              game.table.current[i][j] = null;
            }
            if (
              i + nullCount + 1 < 4 &&
              game.table.current[i + nullCount][j] === game.table.current[i + nullCount + 1][j]
            ) {
              game.table.current[i + nullCount + 1][j] *= 2;
              game.table.current[i + nullCount][j] = null;
              game.updateScore(game.table.current[i + nullCount + 1][j]);
            }
          }
        }
        break;
      default:
        break;
    }

    if (game.checkData() !== game.mode * game.mode) {
      game.createNum();
    } else if (checkFail() === 0) {
      const bestScoreEl = document.getElementById('bestScore');
      game.state = 0;
      if (bestScoreEl.innerText === ' ' || bestScoreEl.innerText < game.score) {
        bestScoreEl.innerText = game.score;
      }
    }
    game.paintTable();
  }
};
