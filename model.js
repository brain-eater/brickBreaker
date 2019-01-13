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

const convertToDeg = function(radians) {
  return (Math.PI / 180) * radians;
};

const getCordinatesDiff = function(displacement, direction) {
  let quadrant = Math.floor(direction / 90);
  let directionFromQuadrant = direction % 90;
  directionFromQuadrant = convertToDeg(directionFromQuadrant);

  let opp = Math.sin(directionFromQuadrant) * displacement;
  let adj = Math.cos(directionFromQuadrant) * displacement;

  const quadrants = {
    0: {
      xChange: adj,
      yChange: opp
    },
    1: {
      xChange: -opp,
      yChange: adj
    },
    2: {
      xChange: -adj,
      yChange: -opp
    },
    3: {
      xChange: opp,
      yChange: -adj
    }
  };
  return quadrants[quadrant];
};

class Game {
  constructor(ballDirection, ballSpeed) {
    this.ballDirection = ballDirection;
    this.ballSpeed = ballSpeed;
  }

  moveBall(ball) {
    let coordinatesChange = getCordinatesDiff(
      this.ballSpeed,
      this.ballDirection
    );
    ball.left += coordinatesChange.xChange;
    ball.top += coordinatesChange.yChange;
  }

  pointToDirection(ball, callback) {
    setInterval(
      function() {
        this.moveBall(ball);
        callback();
      }.bind(this),
      10
    );
  }
}

class Wall {
  constructor(top, left, length, breadth) {
    this.top = top;
    this.left = left;
    this.length = length;
    this.breadth = breadth;
  }
}
