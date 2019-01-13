const LEFT_ARROW = "ArrowLeft";
const RIGHT_ARROW = "ArrowRight";

const getBall = document => document.getElementById("ball_1");
const getScreen = document => document.getElementById("screen");
const getPaddle = document => document.getElementById("paddle_1");

const addPrefix = function(value, prefix = "px") {
  return value + prefix;
};

const drawPaddle = function(document, paddle) {
  let paddleDiv = getPaddle(document);
  paddleDiv.style.bottom = addPrefix(paddle.bottom, "vh");
  paddleDiv.style.left = addPrefix(paddle.left, "vw");
  paddleDiv.style.width = addPrefix(paddle.width, "vw");
  paddleDiv.style.height = addPrefix(paddle.height, "vh");
};

const handleEvents = function(document, paddle) {
  if (event.key == LEFT_ARROW) {
    paddle.moveLeft();
  }

  if (event.key == RIGHT_ARROW) {
    paddle.moveRight();
  }
  drawPaddle(document, paddle);
};

const drawWall = function(document, wall) {
  let wallDiv = document.getElementById("left_wall");
  wallDiv.style.top = addPrefix(wall.top, "vw");
  wallDiv.style.left = addPrefix(wall.left, "vw");
  wallDiv.style.width = addPrefix(wall.breadth, "vw");
  wallDiv.style.height = addPrefix(wall.length, "vh");
};

const createWall = function(document, wall, id) {
  let screen = getScreen(document);
  let wallDiv = document.createElement("div");
  wallDiv.id = id;
  wallDiv.className = "wall";
  screen.appendChild(wallDiv);
  drawWall(document, wall);
  return wallDiv;
};

const createPaddle = function(document, paddle) {
  let screen = getScreen(document);
  let paddleDiv = document.createElement("div");
  paddleDiv.id = "paddle_1";
  paddleDiv.className = "paddle";
  screen.appendChild(paddleDiv);
  drawPaddle(document, paddle);
  return paddleDiv;
};

const drawBall = function(document, ball) {
  let ballDiv = getBall(document);
  ballDiv.style.top = addPrefix(ball.top, "vw");
  ballDiv.style.left = addPrefix(ball.left, "vw");
  ballDiv.style.width = addPrefix(ball.radius, "vw");
  ballDiv.style.height = addPrefix(ball.radius, "vw");
};

const createBall = function(document, ball) {
  let screen = getScreen(document);
  let ballDiv = document.createElement("div");
  ballDiv.id = "ball_1";
  ballDiv.className = "ball";
  screen.appendChild(ballDiv);
  drawBall(document, ball);
};

const createGameComponents = function(document) {
  let paddle = new Paddle(3, 30, 12, 3);
  createPaddle(document, paddle);
  let ball = new Ball(7, 10, 3.5);
  createBall(document, ball);
  let leftWall = new Wall(0, 0, 97, 1);
  createWall(document, leftWall, "left_wall");
  let game = new Game(30, 0.08);
  return { paddle, ball, game, leftWall };
};

const intialize = function() {
  let { paddle, paddleDiv, ball, ballDiv, game } = createGameComponents(
    document
  );
  game.pointToDirection(ball, drawBall.bind(null, document, ball));
  let screen = getScreen(document);
  screen.focus();
  screen.onkeydown = handleEvents.bind(null, document, paddle);
};

window.onload = intialize;
