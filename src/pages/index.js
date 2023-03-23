import { useEffect, useState } from "react";

export default function Home() {

  const [xTurn, setXTurn] = useState(true);
  const [boardData, setBoardData] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  })
  const [won, setWon] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [wonCombo, setWonCombo] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(()=>{
    checkWinner();
    checkDraw();
  }, [boardData]);


  const updateBoardData = (idx) => {
    if (!boardData[idx]) {
      let value = xTurn === true ? "X" : "O";
      setBoardData({...boardData, [idx]: value});
      setXTurn(!xTurn);
    }
  };

  const WINNING_COMBO = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a,b,c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ){
        setWon(true);
        setWonCombo([a,b,c]);
        setModalTitle(`${!xTurn ? 'X' : 'O'} Wins!`);
      }
    });
  };

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v)=> boardData[v]);
    setIsDraw(check);
    if (check) setModalTitle('It\'s a Draw!');
  };

  const handleReset = () => {
    setBoardData({
      0: "",1: "",2: "",3: "",4: "",5: "",6: "",7: "",8: "",
    });
    setXTurn(true);
    setWon(false);
    setWonCombo([]);
    setIsDraw(false);
    setModalTitle("");
  };

  const gameBoard = [...Array(9)].map((v, idx) => {
    return (
      <div
        key={idx}
        className={wonCombo.includes(idx) ? 'square highlight' : 'square'}
        onClick={won ? null : ()=>{updateBoardData(idx)}}
      >
        {boardData[idx]}
      </div>
    );
  })

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className='game'>
        <div className='game_menu'>
          <p>{won ? 'Game Over' : (xTurn === true ? "X Turn" : "O Turn")}</p>
        </div>
        <div className='game_board'>
          {gameBoard}
        </div>
        <div className={`modal ${modalTitle ? "show" : ""}`}>
          <div className="modal_title">
            {modalTitle}
          </div>
          <button onClick={handleReset}>New Game</button>
        </div>
      </div>
    </div>
  );
}
