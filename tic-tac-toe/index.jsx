const { useState } = React;

export function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [btnArr, setBtnArr] = useState([null, null, null, null, null, null, null, null, null]);

  const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

  function determineWinner(btnArr) {
  const winner = winningCombos.find(([a,b,c]) =>
    btnArr[a] !== null && btnArr[a] === btnArr[b] && btnArr[b] === btnArr[c]
  );

  const fullBoard = btnArr.every(item => item !== null);
  
  if(winner) {
    return `Winner: ${btnArr[winner[0]]}`;
  } else if (!winner && fullBoard) {
    return `It's a draw!`;
  };
}


  function handleClick(index) {
    if(btnArr[index] !== null || determineWinner(btnArr)) {
      return;
      } else if(xIsNext) {
      const newBtn = [...btnArr];
      newBtn[index] = 'X';
      setBtnArr(newBtn);
      setXIsNext(!xIsNext);
    } else {
      const newBtn = [...btnArr];
      newBtn[index] = 'O';
      setBtnArr(newBtn);
      setXIsNext(!xIsNext);
    }

  };

  function resetGame() {
    setXIsNext(true);
    setBtnArr([null, null, null, null, null, null, null, null, null]);
  }
  

  const buttons = btnArr.map(
          (item, index) => 
            <button key={index} className="square" onClick={() => handleClick(index)}>{item}</button>
          );

  return (
    <div id="ttc-board">
      <h2>Tic-Tac-Toe</h2>
      <p id="game-msg">{determineWinner(btnArr)}</p>
      <div id="btn-grid">
        {buttons}
      </div>
      <button id="reset" onClick={resetGame}>Reset Game</button>
    </div>
  )

}