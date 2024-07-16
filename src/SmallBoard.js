import { Cell } from "./Cell.js"

export class SmallBoard {
  constructor(board, index, node) {
    this.board = board
    this.index = index
    this.$node = node

    this.cells = []
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div")
      cell.classList.add("cell")

      this.$node.appendChild(cell)
      this.cells[i] = new Cell(i, cell)
    }
  }

  owner = null
  setOwner(player) {
    if (this._disabled === true || !player) return false

    this.owner = player

    this.$node.style.backgroundColor = player === "X" ? "red" : "blue"

    return true
  }

  _disabled = false
  set isDisabled(value) {
    this._disabled = value

    if (value === true) {
      for (const cell of this.cells) {
        cell.isDisabled = true
      }
    } else if (value === false) {
      for (const cell of this.cells) {
        cell.isDisabled = false
      }
    }
  }
  get isDisabled() {
    return this._disabled
  }

  move(player, index) {
    const owner = this.owner

    this.cells[index].setOwner(player)
    this.setOwner(this.checkOwner(player, index))

    this.board.targetIndex = this.owner !== owner ? null : index
  }

  checkOwner(player, index) {
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
      .filter((line) => line.includes(index))
      .map((line) => new Set(line.map((i) => this.cells[i].owner)))
      .filter((line) => line.size === 1 && line.has(player))[0]

    if (result) return [...result][0]
  }

  setupClickListener(player, game) {
    for (const cell of this.cells) {
      if (cell.isDisabled) continue

      cell._listener = () => {
        this.move(player, cell.index)
        game.loop()
      }

      cell.$node.addEventListener("click", cell._listener)
    }
  }
  isFull() {
    return this.cells.every((cell) => cell.owner)
  }
}
