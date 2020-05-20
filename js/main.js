const gameData = {
  score: 0,
  state: 0,
  mode: 4,
  table: {
    current: [],
    before: [],
  },
};

function setGame() {
  let htmlText = '';
  for (let i = 0; i < gameData.mode; i++) {
    gameData.table.current[i] = [];
    gameData.table.before[i] = [];
    for (let j = 0; j < gameData.mode; j++) {
      htmlText += `<div class="block_${gameData.mode}" id="tb_${i}${j}"></div>`;
      gameData.table.current[i][j] = null;
      gameData.table.before[i][j] = null;
    }
  }
  document.getElementById('gameboard1').className = `gameboard_${gameData.mode}`;
  document.getElementById('gameboard1').innerHTML = htmlText;
}

function setColor(space, bg, num) {
  const blockColor = document.querySelectorAll(`div.block_${gameData.mode}`);
  blockColor[space].style.background = bg;
  blockColor[space].style.color = num;
}

function paintBlock(space, num) {
  const value = num > 2048 ? 2048 : num;

  switch (value) {
    case null:
      setColor(space, '#D4CDC5', 'none');
      break;
    case 2:
      setColor(space, '#ECE3DA', '#685F58');
      break;
    case 4:
      setColor(space, '#EADFC9', '#685F58');
      break;
    case 8:
      setColor(space, '#E7B383', '#FFF5DE');
      break;
    case 16:
      setColor(space, '#E7996B', '#FFF5DE');
      break;
    case 32:
      setColor(space, '#E58366', '#FFF5DE');
      break;
    case 64:
      setColor(space, '#E46747', '#FFF5DE');
      break;
    case 128:
      setColor(space, '#E9D07E', '#FFF5DE');
      break;
    case 256:
      setColor(space, '#E7C07E', '#FFF5DE');
      break;
    case 512:
      setColor(space, '#E7CA66', '#FFF5DE');
      break;
    case 1024:
      setColor(space, '#ff685d', '#333333');
      break;
    case 2048:
      setColor(space, '#ff685d', 'red');
      break;
    default:
      break;
  }
}

// eslint-disable-next-line no-unused-vars
function onClickUndo() {
  if (gameData.state === 1) {
    for (let i = 0; i < gameData.mode; i++) {
      for (let j = 0; j < gameData.mode; j++) {
        document.getElementById(`tb_${i}${j}`).innerText = gameData.table.before[i][j];
        paintBlock(i * gameData.mode + j, gameData.table.before[i][j]);
      }
    }
  }
}

function copyData() {
  for (let i = 0; i < gameData.mode; i++) {
    for (let j = 0; j < gameData.mode; j++) {
      gameData.table.before[i][j] = gameData.table.current[i][j];
    }
  }
}

function checkFail() {
  if (util.checkData() === gameData.mode * gameData.mode && util.checkNull() === 2) {
    let cnt = 0;
    for (let i = 0; i < gameData.mode - 1; i++) {
      for (let j = 0; j < gameData.mode - 1; j++) {
        if (
          gameData.table.current[i][j] !== null &&
          (gameData.table.current[i][j] === gameData.table.current[i][j + 1] ||
            gameData.table.current[i][j] === gameData.table.current[i + 1][j])
        )
          cnt++;
      }
    }
    return cnt;
  }
}

function paintTable() {
  for (let i = 0; i < gameData.mode; i++) {
    for (let j = 0; j < gameData.mode; j++) {
      document.getElementById(`tb_${i}${j}`).innerText = gameData.table.current[i][j];
      paintBlock(i * gameData.mode + j, gameData.table.current[i][j]);
    }
  }
}

function updateScore(num) {
  if (!isNaN(num)) {
    gameData.score += num;
    document.getElementById('score').innerText = gameData.score;
  }
}

function getIndex(num) {
  const rtnum = [0, num];

  if (rtnum[1] > gameData.mode - 1) {
    while (rtnum[1] > gameData.mode - 1) {
      rtnum[1] -= gameData.mode;
      rtnum[0]++;
    }
  }

  return rtnum;
}

// eslint-disable-next-line no-unused-vars
function changeMode(num) {
  const nowMode = Number(document.getElementById('status_mode').innerText) + Number(num);

  if (nowMode > 3 && nowMode < 9) {
    document.getElementById('status_mode').innerText = nowMode;
    gameData.mode = nowMode;
  }
}

function createNum() {
  if (util.checkNull() === 1) {
    while (true) {
      const num = util.getRandomNumber(gameData.mode * gameData.mode);
      if (gameData.table.current[getIndex(num)[0]][getIndex(num)[1]] === null) {
        gameData.table.current[getIndex(num)[0]][getIndex(num)[1]] = util.getRandomNumber(10) < 2 ? 4 : 2;
        break;
      }
    }
  }
}

// eslint-disable-next-line no-unused-vars
function onClickStart() {
  setGame();
  for (let i = 0; i < gameData.mode; i++) {
    for (let j = 0; j < gameData.mode; j++) {
      gameData.table.current[i][j] = null;
    }
  }
  gameData.score = 0;
  gameData.state = 1;
  document.getElementById('score').innerText = gameData.score;
  createNum();
  paintTable();
}

window.onkeyup = (e) => {
  if (gameData.state === 1) {
    copyData();
    switch (e.keyCode) {
      case 37:
        for (let i = 0; i < gameData.mode; i++) {
          for (let j = 1; j < gameData.mode; j++) {
            let nullCount = 0;
            for (let p = 0; p < j; p++) {
              nullCount += gameData.table.current[i][p] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              gameData.table.current[i][j - nullCount] = gameData.table.current[i][j];
              gameData.table.current[i][j] = null;
            }
            if (gameData.table.current[i][j - nullCount - 1] === gameData.table.current[i][j - nullCount]) {
              gameData.table.current[i][j - nullCount - 1] *= 2;
              gameData.table.current[i][j - nullCount] = null;
              updateScore(gameData.table.current[i][j - nullCount - 1]);
            }
          }
        }
        break;
      case 38:
        for (let j = 0; j < gameData.mode; j++) {
          for (let i = 1; i < gameData.mode; i++) {
            let nullCount = 0;
            for (let p = 0; p < i; p++) {
              nullCount += gameData.table.current[p][j] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              gameData.table.current[i - nullCount][j] = gameData.table.current[i][j];
              gameData.table.current[i][j] = null;
            }
            if (
              i - nullCount - 1 > -1 &&
              gameData.table.current[i - nullCount][j] === gameData.table.current[i - nullCount - 1][j]
            ) {
              gameData.table.current[i - nullCount - 1][j] *= 2;
              gameData.table.current[i - nullCount][j] = null;
              updateScore(gameData.table.current[i - nullCount - 1][j]);
            }
          }
        }
        break;
      case 39:
        for (let i = 0; i < gameData.mode; i++) {
          for (let j = gameData.mode - 2; j > -1; j--) {
            let nullCount = 0;
            for (let p = gameData.mode - 1; p > j; p--) {
              nullCount += gameData.table.current[i][p] == null ? 1 : 0;
            }
            if (nullCount !== 0) {
              gameData.table.current[i][j + nullCount] = gameData.table.current[i][j];
              gameData.table.current[i][j] = null;
            }
            if (gameData.table.current[i][j + nullCount] === gameData.table.current[i][j + nullCount + 1]) {
              gameData.table.current[i][j + nullCount + 1] *= 2;
              gameData.table.current[i][j + nullCount] = null;
              updateScore(gameData.table.current[i][j + nullCount + 1]);
            }
          }
        }
        break;
      case 40:
        for (let j = 0; j < gameData.mode; j++) {
          for (let i = gameData.mode - 2; i > -1; i--) {
            let nullCount = 0;
            for (let p = gameData.mode - 1; p > i; p--) {
              nullCount += gameData.table.current[p][j] === null ? 1 : 0;
            }
            if (nullCount !== 0) {
              gameData.table.current[i + nullCount][j] = gameData.table.current[i][j];
              gameData.table.current[i][j] = null;
            }
            if (
              i + nullCount + 1 < 4 &&
              gameData.table.current[i + nullCount][j] === gameData.table.current[i + nullCount + 1][j]
            ) {
              gameData.table.current[i + nullCount + 1][j] *= 2;
              gameData.table.current[i + nullCount][j] = null;
              updateScore(gameData.table.current[i + nullCount + 1][j]);
            }
          }
        }
        break;
      default:
        break;
    }

    if (util.checkData() !== gameData.mode * gameData.mode) createNum();
    else if (checkFail() === 0) {
      gameData.state = 0;
      if (
        document.getElementById('bestScore').innerText === ' ' ||
        document.getElementById('bestScore').innerText < gameData.score
      )
        document.getElementById('bestScore').innerText = gameData.score;
    }
    paintTable();
  }
};
