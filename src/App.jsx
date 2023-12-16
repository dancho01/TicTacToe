import './App.css';
import React from 'react';

function App() {

  const initialBoard = [['','',''], ['','',''], ['','','']];
  const[board, setBoard] = React.useState(initialBoard);
  const[winner, setWinner] = React.useState('');
  const[winningTiles, setWinningTiles] = React.useState([]);
  const[turn, setTurn] = React.useState('X');

  function changeTurns(y, x) {

    if (winner === '' && board[y][x] === '') {
      let newBoard = board;
      newBoard[y][x] = turn;
      setTurn(turn === 'X' ? 'O' : 'X');
      setBoard(newBoard);
      checkWin();
    }
  }

  function checkWin () {
    if (board[0][0] !== '' && board[1][1] === board[0][0] && board[1][1] === board[2][2]) {
      setWinner(board[0][0]);
      setWinningTiles([[0,0], [1,1], [2,2]]);
      return;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      setWinner(board[0][2]);
      setWinningTiles([[0,2], [1,1], [2,0]]);
      return;
    }
    for (let i = 0; i < 3; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        setWinner(board[i][0]);
        setWinningTiles([[i,0], [i,1], [i,2]]);
        return;
      }
      if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        setWinner(board[0][i]);
        setWinningTiles([[0,i], [1,i], [2,i]]);
        return;
      }
    }
  }

  function checkTile(y, x) {
    let win = false;
    winningTiles.forEach(tile => {
      if (tile[0] === y && tile[1] === x) {
        win = true;
      }
    })
    return win ? 'winner' : ''
  }

  function resetGame() {
    setWinner('');
    setBoard(initialBoard);
    setWinningTiles([]);
    setTurn('X');
  }

  return (
    <div className='parent'>
    <h1 className='header1'>TicTacToe</h1>  
      <div className="game">
        {board.map((row, y) => {
          return (
            <div className='row'>
              {row.map((val, x) => {
                return <button style={{height: 120, width: 120, fontSize: 25}} onClick={() => changeTurns(y,x)} className={checkTile(y,x)} >{val}</button>
              })}
            </div>
          )
        })} <br />

        {winner && <div style={{fontSize: 25, color: '#61dafb', font: 'bold'}} >The winner is: {winner}</div>} <br />

        <button style={{width: 75}} onClick={() => resetGame()}>Reset</button>
      </div>
    </div>
  );
}
export default App;
