
function createBoard (rowCount, colCount) {
  const td = '<td></td>'
  const tr = '<tr>' + td.repeat(colCount) + '</tr>'
  const table = '<table>' + tr.repeat(rowCount) + '</table>'

  this.board.insertAdjacentHTML('afterbegin', table)
}

// TODO : dom 조작 줄이기
function changeAllBackgroundColor () {
  const tds = this.board.getElementsByTagName('td')
  for (let td of tds) {
    td.style.backgroundColor = 'lightgray'
  }
}

function changeBackgroundColor (x, y, color) {
  // tr == y
  // td == x
  const tr = this.board.getElementsByTagName('tr')[y]
  const td = tr.getElementsByTagName('td')[x]
  td.style.backgroundColor = color
}


class Snake {
  color = 'green'
  direction = 'east'
  locations = [{ x: 0, y: 0 }]

  // TODO : 배열 조작 효율성 확인 및 최적화하기
  crawl () {
    console.log('before crawl', this.locations.toString())
    switch (this.direction) {
      case 'east':
        this.locations.unshift({x: this.locations[0].x + 1, y: this.locations[0].y})
        break
      case 'west':
        this.locations.unshift({x: this.locations[0].x - 1, y: this.locations[0].y})
        break
      case 'north':
          this.locations.unshift({x: this.locations[0].x, y: this.locations[0].y - 1})
        break
      case 'south':
          this.locations.unshift({x: this.locations[0].x, y: this.locations[0].y + 1})
        break
    }
    this.locations.pop()
    console.log('after crawl', this.locations)
  }

  grow () {

    let x = this.locations[this.locations.length - 1].x
    let y = this.locations[this.locations.length - 1].y

    switch (this.direction) {
      case 'east': x = x + 1
        break
      case 'west': x = x - 1
        break
      case 'north': y = y - 1
        break
      case 'south': y = y + 1
        break
    }

    this.locations.push({x: x, y: y})
    console.log(this.locations);
  }

  display() {
    this.locations.forEach((location) => {
      changeBackgroundColor(location.x, location.y, this.color)
    })
  }

}


class Apple {

  color = 'red'
  location = { x: 0, y: 0 }

  create () {
    this.location.x = Math.floor(Math.random() * game.rowCount)
    this.location.y = Math.floor(Math.random() * game.colCount)
  }

  display() {
    changeBackgroundColor(this.location.x, this.location.y, this.color)
  }

}


class Game {

  board = document.getElementById('board')
  snake = new Snake()
  apple = new Apple()
  rowCount = 15
  colCount = 15

  init() {

    // TODO : 키조작 글자입력 안되는것 확인해보기
    document.addEventListener('keydown', (event) => {
      console.log(event)
      const keyName = event.key
      switch (keyName) {
        case 'ArrowUp':
          this.snake.direction = 'north'
          break
        case 'ArrowDown':
          this.snake.direction = 'south'
          break
        case 'ArrowLeft':
          this.snake.direction = 'west'
          break
        case 'ArrowRight':
          this.snake.direction = 'east'
          break
        case 'Escape':
          clearInterval(interval)
          break
        // TODO : 정지후 시작할 수 있게 변경하기
        // case 'Space':
      }
    })

    createBoard(this.rowCount, this.colCount)
    this.apple.create()

    // TODO : 흐름제어 함수를 별도로 제작하여 코드 정리하기
    const interval = setInterval(() => {

      changeAllBackgroundColor()
      this.apple.display()
      this.snake.display()
      this.snake.crawl()

      if (this.snake.locations[0].x == this.apple.location.x && this.snake.locations[0].y == this.apple.location.y) {
        this.snake.grow()
        this.apple.create()
      }

    }, 400)
  }

}


const game = new Game()
game.init()
