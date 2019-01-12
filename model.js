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
  constructor(bottom, left, width, height) {
    this.bottom = bottom;
    this.left = left;
    this.width = width;
    this.height = height;
  }
}
