const gameModel = new GameModel('gameboard1');
const controller = new GameController(gameModel);

/** onkeyup
 * browser에서 키를 눌렀을 때 실행
 */
window.onkeyup = (e) => {
  // 게임이 실행중인 상태에서만 유효
  if (gameModel.state === 1) {
    gameModel.table.before = util.copyData(gameModel.table.current);
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
  }
};
