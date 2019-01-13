const isInVerticalRange = function(block1, block2) {
  let isLeft = block1.rightEdge <= block2.left;
  let isRight = block1.left <= block2.rightEdge;
  return isLeft && isRight;
};

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

  isTouching(ball) {
    return;
  }
}

class Ball {
  constructor(top, left, diameter) {
    this.top = top;
    this.left = left;
    this.diameter = diameter;
  }

  get dimensions() {
    let { top, left, diameter } = this;
    let rightEdge = left + diameter;
    let bottomEdge = top + diameter;
    return { top, left, rightEdge, bottomEdge };
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
  constructor(ballDirection, ballSpeed, paddle, ball, walls) {
    this.ballDirection = ballDirection;
    this.ballSpeed = ballSpeed;
    this.paddle = paddle;
    this.ball = ball;
    this.walls = walls;
  }

  moveBall() {
    let coordinatesChange = getCordinatesDiff(
      this.ballSpeed,
      this.ballDirection
    );

    this.ball.left += coordinatesChange.xChange;
    this.ball.top += coordinatesChange.yChange;
  }

  bounceBall() {
    this.ballDirection = this.ballDirection + 90;
    this.ballDirection %= 360;
  }

  shoot(callback) {
    let lastTimeTouched = false;

    setInterval(
      function() {
        console.log(this.paddle.isTouching(this.ball));
        let isTouchingWall = wall => wall.isTouching(this.ball);
        let touchingWall = this.walls.filter(isTouchingWall)[0];
        if (touchingWall && !lastTimeTouched) {
          this.bounceBall();
          lastTimeTouched = true;
        }
        if (!touchingWall) {
          lastTimeTouched = false;
        }
        this.moveBall(this.ball);
        callback();
      }.bind(this),
      7
    );
  }
}

class Wall {
  constructor(top, left, height, breadth, screenSide) {
    this.top = top;
    this.left = left;
    this.height = height;
    this.breadth = breadth;
    this.screenSide = screenSide;
    this.rightEdge = left + breadth;
    this.bottomEdge = top + height;
  }
  isTouching(ball) {
    let ballDimensions = ball.dimensions;
    let touchingSides = {
      right: this.left <= ballDimensions.rightEdge,
      left: this.rightEdge >= ballDimensions.left,
      top: this.bottomEdge >= ballDimensions.top,
      bottom: this.top <= ballDimensions.bottomEdge
    };

    return touchingSides[this.screenSide];
  }
}
