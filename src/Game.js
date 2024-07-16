import { Board } from "./Board.js"

export class Game {
  constructor() {
    this.board = new Board()
  }
  loop() {
    if (this.board.winner) return

    this.board.currentPlayer = this.board.currentPlayer === "X" ? "O" : "X"

    this.board.updateHint()

    this.board.prepareMove()

    this.board.checkWinner()

    this.board.setupClickListener(this)
  }
}
