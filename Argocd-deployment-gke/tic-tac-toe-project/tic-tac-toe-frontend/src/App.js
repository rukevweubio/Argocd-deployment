import React, { useState, useEffect } from 'react';

// Main App component for the Tic-Tac-Toe game
function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Represents the 3x3 board
  const [currentPlayer, setCurrentPlayer] = useState('X'); // 'X' or 'O'
  const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw', or null
  const [gameId, setGameId] = useState(null); // Unique ID for the current game
  const [message, setMessage] = useState('Starting a new game...'); // User messages

  // Determine the backend URL.
  // In a browser environment, 'process.env' is not available.
  // For local development or direct browser execution, we hardcode the URL.
  // In a Kubernetes deployment, this value would be dynamically injected via the Deployment manifest.
  const BACKEND_URL = 'http://localhost:8080'; // Hardcoded for direct browser execution

  // Function to start a new game on the backend
  const startNewGame = async () => {
    try {
      setMessage('Creating new game...');
      const response = await fetch(`${BACKEND_URL}/api/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGameId(data.gameId);
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);
      setMessage(`Game ${data.gameId} started! It's ${data.currentPlayer}'s turn.`);
    } catch (error) {
      console.error('Error starting new game:', error);
      setMessage(`Error starting game: ${error.message}. Is backend running at ${BACKEND_URL}?`);
    }
  };

  // Function to fetch the current game state from the backend
  const fetchGameState = async () => {
    if (!gameId) return; // Only fetch if a game ID exists
    try {
      const response = await fetch(`${BACKEND_URL}/api/games/${gameId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);
      if (data.winner) {
        setMessage(data.winner === 'Draw' ? 'It\'s a Draw!' : `Player ${data.winner} Wins!`);
      } else {
        setMessage(`Game ${gameId}. It's ${data.currentPlayer}'s turn.`);
      }
    } catch (error) {
      console.error('Error fetching game state:', error);
      setMessage(`Error fetching game state: ${error.message}.`);
    }
  };

  // Function to handle a square click and send the move to the backend
  const handleSquareClick = async (index) => {
    if (board[index] || winner) {
      return; // If square is already filled or game is over, do nothing
    }

    try {
      setMessage(`Making move for ${currentPlayer}...`);
      const response = await fetch(`${BACKEND_URL}/api/games/${gameId}/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index, player: currentPlayer }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBoard(data.board);
      setCurrentPlayer(data.currentPlayer);
      setWinner(data.winner);

      if (data.winner) {
        setMessage(data.winner === 'Draw' ? 'It\'s a Draw!' : `Player ${data.winner} Wins!`);
      } else {
        setMessage(`Game ${gameId}. It's ${data.currentPlayer}'s turn.`);
      }
    } catch (error) {
      console.error('Error making move:', error);
      setMessage(`Error making move: ${error.message}`);
    }
  };

  // Effect to start a new game when the component mounts
  useEffect(() => {
    startNewGame();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to fetch game state periodically or after a move (optional, but good for sync)
  // For simplicity, we're relying on the POST response for updates, but a GET poll could be added.
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (gameId && !winner) {
  //       fetchGameState();
  //     }
  //   }, 3000); // Poll every 3 seconds
  //   return () => clearInterval(interval);
  // }, [gameId, winner]);


  // Square component for rendering individual cells
  const Square = ({ value, onClick }) => (
    <button
      className="w-24 h-24 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-5xl font-bold text-gray-800 shadow-md hover:bg-gray-100 transition-colors duration-200 ease-in-out"
      onClick={onClick}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4 font-inter">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
          body { font-family: 'Inter', sans-serif; }
        `}
      </style>
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Tic-Tac-Toe</h1>
        <p className="text-lg text-gray-600 mb-4">{message}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {board.map((value, i) => (
            <Square key={i} value={value} onClick={() => handleSquareClick(i)} />
          ))}
        </div>

        {winner && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-230 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            onClick={startNewGame}
          >
            Play Again!
          </button>
        )}
        {!winner && gameId && (
            <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-230 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={startNewGame}
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
