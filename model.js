class Paddle {
  constructor(bottom, left, width, height) {
    this.bottom = bottom;
    this.left = left;
    this.width = width;
    this.height = height;
  }
  moveLeft() {
    this.left = this.left - 10;
  }

  moveRight() {
    this.left = this.left + 10;
  }
}

class Ball {
  constructor(top, left, radius) {
    this.top = top;
    this.left = left;
    this.radius = radius;
  }
}

class Game {
  constructor(xChange, yChange) {
    this.xChange = xChange;
    this.yChange = yChange;
  }

  moveBall(ball) {
    ball.left += this.xChange;
    ball.top += this.yChange;
  }
}
