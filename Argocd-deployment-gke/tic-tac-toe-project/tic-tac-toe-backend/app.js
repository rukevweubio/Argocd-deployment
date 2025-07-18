// app.js (Node.js Express Backend)
const express = require('express');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing
const { v4: uuidv4 } = require('uuid'); // For generating unique game IDs

const app = express();
const PORT = process.env.PORT || 8080;

// In-memory storage for game states
// In a real application, this would be a database (PostgreSQL, MongoDB, etc.)
const games = new Map(); // Map<gameId, { board: [], currentPlayer: 'X'|'O', winner: null|'X'|'O'|'Draw' }>

// Middleware
app.use(cors()); // Allow requests from any origin for development
app.use(express.json()); // Parse JSON request bodies

// Health check or welcome route
app.get('/', (req, res) => {
  res.send('Tic-Tac-Toe Backend API is running');
});

// Helper function to check for a winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Returns 'X' or 'O'
    }
  }
  // Check for a draw
  if (board.every(square => square !== null)) {
    return 'Draw';
  }
  return null; // No winner yet
};

// API Endpoints

// POST /api/games - Create a new game
app.post('/api/games', (req, res) => {
  const gameId = uuidv4();
  const newGame = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  };
  games.set(gameId, newGame);
  console.log(`New game created: ${gameId}`);
  res.status(201).json({ gameId, ...newGame });
});

// GET /api/games/:id - Get current game state
app.get('/api/games/:id', (req, res) => {
  const { id } = req.params;
  const game = games.get(id);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  res.json(game);
});

// POST /api/games/:id/move - Make a move
app.post('/api/games/:id/move', (req, res) => {
  const { id } = req.params;
  const { index, player } = req.body;

  const game = games.get(id);
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }

  if (game.winner) {
    return res.status(400).json({ message: `Game already over. Winner: ${game.winner}` });
  }

  if (game.currentPlayer !== player) {
    return res.status(400).json({ message: `It's not ${player}'s turn. Current player: ${game.currentPlayer}` });
  }

  if (index < 0 || index >= 9 || game.board[index] !== null) {
    return res.status(400).json({ message: 'Invalid move: square already taken or out of bounds' });
  }

  // Update board
  const newBoard = [...game.board];
  newBoard[index] = player;

  // Check for winner or draw
  const newWinner = calculateWinner(newBoard);

  // Update game state
  game.board = newBoard;
  game.winner = newWinner;
  if (!newWinner) {
    game.currentPlayer = player === 'X' ? 'O' : 'X'; // Switch player if no winner
  }

  console.log(`Game ${id}: Player ${player} moved at ${index}. Current state:`, game);
  res.json(game);
});

// Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Backend API listening on port ${PORT}`);
});
