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
