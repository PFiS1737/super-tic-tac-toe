export class Cell {
  constructor(index, node) {
    this.index = index
    this.$node = node
  }

  owner = null
  setOwner(player) {
    if (this._disabled === true || !player) return false

    this.owner = player
    this._disabled = true

    this.$node.style.backgroundColor = player === "X" ? "red" : "blue"
    this.$node.innerText = player

    return true
  }

  _disabled = false
  set isDisabled(value) {
    this._disabled = value

    if (value === true) this.$node.classList.add("disabled")
    else if (value === false) this.$node.classList.remove("disabled")
  }
  get isDisabled() {
    return this._disabled
  }
}
