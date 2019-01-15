const isInVerticalRange = function(block1, block2) {
  let isLeft = block1.rightEdge >= block2.left;
  let isRight = block1.left <= block2.rightEdge;
  return isLeft && isRight;
};

const isInHorizantalRange = function(block1, block2) {
  let isTop = block1.bottomEdge >= block2.top;
  let isBottom = block1.top <= block2.bottomEdge;
  return isTop && isBottom;
};

const isTouchingTop = function(component1, component2) {
  return component1.bottomEdge.toFixed() == component2.top.toFixed();
};

const isTouchingBottom = function(component1, component2) {
  return component1.top.toFixed() == component2.bottomEdge.toFixed();
};

const isTouchingLeft = function(component1, component2) {
  return component1.left.toFixed() == component2.rightEdge.toFixed();
};

const isTouchingRight = function(component1, component2) {
  return component1.rightEdge.toFixed() == component2.left.toFixed();
};

class Paddle {
  constructor(top, left, width, height) {
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
  }
  moveLeft(maxLeft) {
    this.left = Math.max(this.left - 2, maxLeft);
  }

  moveRight(maxRight) {
    this.left = Math.min(this.left + 2, maxRight - this.width);
  }

  get dimensions() {
    let { top, left, height, width } = this;
    let rightEdge = left + width;
    let bottomEdge = top + height;
    return { top, left, rightEdge, bottomEdge };
  }

  isTouching(ballDimensions) {
    return (
      isInVerticalRange(this.dimensions, ballDimensions) &&
      this.top == Math.ceil(ballDimensions.bottomEdge)
    );
  }
}

class Ball {
  constructor(top, left, height, width) {
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = width;
  }

  get dimensions() {
    let { top, left, height, width } = this;
    let rightEdge = left + height;
    let bottomEdge = top + width;
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
  constructor(ballConfig, components, screenDimensions) {
    this.ballConfig = ballConfig;
    this.components = components;
    this.screenDimensions = screenDimensions;
  }

  movePaddle(direction) {
    let directions = {
      left: this.components.paddle.moveLeft.bind(this.components.paddle, 1),
      right: this.components.paddle.moveRight.bind(this.components.paddle, 70)
    };
    directions[direction] && directions[direction]();
  }

  moveBall() {
    let { ballSpeed, ballDirection } = this.ballConfig;
    let { ball } = this.components;
    let coordinatesChange = getCordinatesDiff(ballSpeed, ballDirection);

    ball.left += coordinatesChange.xChange;
    ball.top += coordinatesChange.yChange;
  }

  bounceBall() {
    let { ballDirection } = this.ballConfig;
    ballDirection = ballDirection + 90;
    ballDirection %= 360;
    this.ballConfig.ballDirection = ballDirection;
  }

  isTouching(component1, component2) {
    let insideHorizantalRange = isInHorizantalRange(component1, component2);
    let insideVerticalRange = isInVerticalRange(component1, component2);
    let touchingTop = isTouchingTop(component1, component2);
    let touchingBottom = isTouchingBottom(component1, component2);
    let touchingLeft = isTouchingLeft(component1, component2);
    let touchingRight = isTouchingRight(component1, component2);
    if (insideHorizantalRange && (touchingLeft || touchingRight)) {
      return true;
    }
    if (insideVerticalRange && (touchingTop || touchingBottom)) {
      return true;
    }
    return false;
  }

  shoot(callback) {
    let lastTimeTouched = false;
    let { ball, paddle, walls } = this.components;
    let isTouchingWall = wall =>
      this.isTouching(ball.dimensions, wall.dimensions);
    let self = this;
    setInterval(function() {
      let isBallTouchingPaddle = self.isTouching(
        ball.dimensions,
        paddle.dimensions
      );
      let touchingWall = walls.filter(isTouchingWall)[0];
      if (!lastTimeTouched) {
        if (isBallTouchingPaddle || touchingWall) {
          self.bounceBall();
          lastTimeTouched = true;
        }
      }
      if (!touchingWall && !isBallTouchingPaddle) {
        lastTimeTouched = false;
      }
      self.moveBall(ball);
      callback();
    }, 7);
  }
}

class Brick {
  constructor(top, left, height, breadth) {
    this.top = top;
    this.left = left;
    this.height = height;
    this.breadth = breadth;
  }
}

class Wall {
  constructor(top, left, height, breadth, screenSide) {
    this.top = top;
    this.left = left;
    this.height = height;
    this.breadth = breadth;
    this.screenSide = screenSide;
  }
  get dimensions() {
    let { top, left } = this;
    let rightEdge = left + this.breadth;
    let bottomEdge = top + this.height;
    return { top, left, rightEdge, bottomEdge };
  }
}
