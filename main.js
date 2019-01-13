const LEFT_ARROW = "ArrowLeft";
const RIGHT_ARROW = "ArrowRight";

const drawPaddle = function(paddle, paddleDiv) {
  paddleDiv.style.bottom = addPrefix(paddle.bottom, "vh");
  paddleDiv.style.left = addPrefix(paddle.left, "vw");
  paddleDiv.style.width = addPrefix(paddle.width, "vw");
  paddleDiv.style.height = addPrefix(paddle.height, "vh");
};

const getScreen = document => document.getElementById("screen");

const addPrefix = function(value, prefix = "px") {
  return value + prefix;
};

const handleEvents = function(paddle, paddleDiv) {
  if (event.key == LEFT_ARROW) {
    paddle.moveLeft();
  }

  if (event.key == RIGHT_ARROW) {
    paddle.moveRight();
  }
  drawPaddle(paddle, paddleDiv);
};

const drawWall = function(wall, wallDiv) {
  console.log(wall);

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
  drawWall(wall, wallDiv);
  return wallDiv;
};

const createPaddle = function(document, paddle) {
  let screen = getScreen(document);
  let paddleDiv = document.createElement("div");
  paddleDiv.id = "paddle_1";
  paddleDiv.className = "paddle";
  screen.appendChild(paddleDiv);
  drawPaddle(paddle, paddleDiv);
  return paddleDiv;
};

const drawBall = function(ball, ballDiv) {
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
  drawBall(ball, ballDiv);
  return ballDiv;
};

const createGameComponents = function(document) {
  let paddle = new Paddle(3, 30, 12, 3);
  let paddleDiv = createPaddle(document, paddle);
  let ball = new Ball(7, 10, 3.5);
  let ballDiv = createBall(document, ball);
  let screen = getScreen(document);
  let wall = new Wall(0, 0, 97, 1);
  let wallDiv = createWall(document, wall, "left_wall");
  let game = new Game(30, 0.08);
  return { paddle, paddleDiv, ball, ballDiv, game };
};

const intialize = function() {
  let { paddle, paddleDiv, ball, ballDiv, game } = createGameComponents(
    document
  );
  game.pointToDirection(ball, drawBall.bind(null, ball, ballDiv));
  let screen = getScreen(document);
  screen.focus();
  screen.onkeydown = handleEvents.bind(null, paddle, paddleDiv);
};

window.onload = intialize;
