import { Cell } from "./Cell.js"
import { SmallBoard } from "./SmallBoard.js"

export class Board {
  constructor() {
    this.$node = document.querySelector(".board")

    this.smallBoards = []
    for (let i = 0; i < 9; i++) {
      const smallBoard = document.createElement("div")
      smallBoard.classList.add("small-board")

      this.$node.appendChild(smallBoard)
      this.smallBoards[i] = new SmallBoard(this, i, smallBoard)
    }

    this.hint = new Cell(null, document.querySelector(".player-hint .cell"))
  }

  currentPlayer = null
  targetIndex = null

  prepareMove() {
    this.claerDisabled()

    if (this.targetIndex === null) {
      for (const smallBoard of this.smallBoards) {
        for (const cell of smallBoard.cells) {
          if (smallBoard.index === cell.index) cell.isDisabled = true
        }
      }
    } else {
      if (this.smallBoards[this.targetIndex].isFull()) {
        this.targetIndex = null
        return this.prepareMove()
      }
      for (const smallBoard of this.smallBoards) {
        if (smallBoard.index !== this.targetIndex) smallBoard.isDisabled = true
      }
    }
  }

  updateHint() {
    this.hint.setOwner(this.currentPlayer)
    this.hint.isDisabled = false
  }

  winner = null
  checkWinner() {
    const result = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
      .map((line) => new Set(line.map((i) => this.smallBoards[i].owner)))
      .filter((line) => line.size === 1 && !line.has(null))[0]

    if (result) {
      this.winner = [...result][0]
      for (const smallBoard of this.smallBoards) {
        smallBoard.isDisabled = true
      }
      setTimeout(() => alert(`${this.winner} win the game!`), 10)
    }
  }

  claerDisabled() {
    for (const smallBoard of this.smallBoards) {
      smallBoard.isDisabled = false
    }
  }

  setupClickListener(game) {
    for (const smallBoard of this.smallBoards) {
      for (const cell of smallBoard.cells) {
        if (cell._listener)
          cell.$node.removeEventListener("click", cell._listener)
      }

      if (smallBoard.isDisabled) continue

      smallBoard.setupClickListener(this.currentPlayer, game)
    }
  }
}
