<template>
  <div class="row">
    <div class="setup col-3">
      <form @submit.prevent="handleBoardSizeChange">
        <label for="rows">Rows:</label>
        <input
          type="number"
          id="rows"
          name="rows"
          :min="3"
          :max="20"
          v-model="boardSize.rows"
          style="width: 50px"
        />
        &nbsp; &nbsp;
        <label for="cols">Cols:</label>
        <input
          type="number"
          id="cols"
          name="cols"
          :min="3"
          :max="20"
          v-model="boardSize.cols"
          style="width: 50px"
        />
        <br />
        <button type="submit" class="btn-submit">Start</button>
      </form>
    </div>
    <div class="col-6">
      <div class="board-container">
        <div>{{ status }}</div>
        <div>
          <div
            v-for="(row, rowIndex) in board"
            :key="rowIndex"
            style="display: flex"
          >
            <div
              v-for="(col, colIndex) in row"
              :key="colIndex"
              @click="handleClick(rowIndex, colIndex)"
              :class="[
                'square',
                isWinningSquare(rowIndex, colIndex) ? 'winning' : '',
              ]"
            >
              {{ current.squares[rowIndex * boardSize.cols + colIndex] }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="history-container">
        <ul style="padding: 0">
          <li v-for="{ move, desc } in moves" :key="move">
            <button
              class="history-button"
              @click="jumpTo(move)"
              :style="{ fontWeight: move === stepNumber ? 'bold' : 'normal' }"
            >
              {{ desc }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boardSize: { rows: 3, cols: 3 },
      board: [],
      history: [{ squares: Array(9).fill(null), position: null }],
      stepNumber: 0,
      xIsNext: true,
      gameOver: false,
      winningSquares: [],
    };
  },
  computed: {
    current() {
      return this.history[this.stepNumber];
    },
    moves() {
      return this.history.map((step, move) => {
        const desc = move
          ? `Go to move #${move} ${step.position}`
          : "Go to game start";
        return { move, desc };
      });
    },
    status() {
      const winner = this.calculateWinner(this.current.squares);
      return winner
        ? `Winner: ${winner.player}`
        : `Next player: ${this.xIsNext ? "X" : "O"}`;
    },
  },
  methods: {
    handleBoardSizeChange(event) {
      const newBoardSize = {
        rows: parseInt(event.target.elements.rows.value),
        cols: parseInt(event.target.elements.cols.value),
      };
      this.boardSize = newBoardSize;
      this.board = Array(newBoardSize.rows)
        .fill(null)
        .map(() => Array(newBoardSize.cols).fill(null));
      this.history = [
        { squares: Array(newBoardSize.rows * newBoardSize.cols).fill(null) },
      ];
      this.stepNumber = 0;
      this.xIsNext = true;
      this.gameOver = false;
      this.winningSquares = [];
    },
    calculateWinner(squares) {
      const lines = [];
      let winLength = 3;
      if (this.boardSize.rows >= 6 && this.boardSize.cols >= 6) {
        winLength = 5;
      } else if (
        this.boardSize.rows <= 5 &&
        this.boardSize.cols <= 5 &&
        this.boardSize.rows > 3 &&
        this.boardSize.cols > 3
      ) {
        winLength = 4;
      }
      for (let i = 0; i < this.boardSize.rows; i++) {
        for (let j = 0; j < this.boardSize.cols; j++) {
          if (i + winLength - 1 < this.boardSize.rows) {
            lines.push(
              new Array(winLength)
                .fill()
                .map((_, index) => (i + index) * this.boardSize.cols + j)
            );
          }
          if (j + winLength - 1 < this.boardSize.cols) {
            lines.push(
              new Array(winLength)
                .fill()
                .map((_, index) => i * this.boardSize.cols + j + index)
            );
          }
          if (
            i + winLength - 1 < this.boardSize.rows &&
            j + winLength - 1 < this.boardSize.cols
          ) {
            lines.push(
              new Array(winLength)
                .fill()
                .map(
                  (_, index) => (i + index) * this.boardSize.cols + j + index
                )
            );
          }
          if (
            i + winLength - 1 < this.boardSize.rows &&
            j - winLength + 1 >= 0
          ) {
            lines.push(
              new Array(winLength)
                .fill()
                .map(
                  (_, index) => (i + index) * this.boardSize.cols + j - index
                )
            );
          }
        }
      }

      console.log(lines);
      if (this.boardSize.rows >= 6 && this.boardSize.cols >= 6) {
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c, d, e] = lines[i];
          if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c] &&
            squares[a] === squares[d] &&
            squares[a] === squares[e]
          ) {
            return { player: squares[a], line: [a, b, c, d, e] };
          }
        }
      } else if (
        this.boardSize.rows <= 5 &&
        this.boardSize.cols <= 5 &&
        this.boardSize.rows > 3 &&
        this.boardSize.cols > 3
      ) {
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c, d] = lines[i];
          if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c] &&
            squares[a] === squares[d]
          ) {
            return { player: squares[a], line: [a, b, c, d] };
          }
        }
      } else {
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
          ) {
            return { player: squares[a], line: [a, b, c] };
          }
        }
      }
    },
    handleClick(row, col) {
      const newHistory = this.history.slice(0, this.stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = [...current.squares];
      if (this.gameOver || squares[row * this.boardSize.cols + col]) {
        return;
      }
      squares[row * this.boardSize.cols + col] = this.xIsNext ? "X" : "O";
      const winner = this.calculateWinner(squares);
      if (winner) {
        this.gameOver = true;
        this.winningSquares = winner.line;
      }
      this.history = newHistory.concat([
        { squares, position: `(${row},${col})` },
      ]);
      this.stepNumber = newHistory.length;
      this.xIsNext = !this.xIsNext;
    },
    jumpTo(step) {
      this.stepNumber = step;
      this.xIsNext = step % 2 === 0;
      this.gameOver = false;
      this.winningSquares = [];
    },
    isWinningSquare(row, col) {
      return this.winningSquares.includes(row * this.boardSize.cols + col);
    },
  },
};
</script>

<style scoped>
.square {
  font-size: 30px;
  font-weight: bold;
  line-height: 50px;
  height: 50px;
  width: 50px;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.square:focus {
  outline: none;
}

.square:hover {
  background-color: aliceblue;
}

.winning {
  background-color: yellow;
}

.btn-submit {
  width: 100%;
  margin-top: 5px;
}

.board-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.history-container {
  margin-top: 20px;
}

.history-button {
  font-size: 16px;
}

li {
  list-style: none;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.setup {
  margin-top: 20px;
}

.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.form-label {
  font-weight: bold;
}

.setup {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>