const LEFT_ARROW = "ArrowLeft";
const RIGHT_ARROW = "ArrowRight";

const drawPaddle = function(paddle, paddleDiv) {
  paddleDiv.style.bottom = addViewPortPrefix(paddle.bottom);
  paddleDiv.style.left = addViewPortPrefix(paddle.left, "vw");
  paddleDiv.style.width = addViewPortPrefix(paddle.width, "vw");
  paddleDiv.style.height = addViewPortPrefix(paddle.height);
};

const getScreen = document => document.getElementById("screen");

const addViewPortPrefix = function(vhValue, prefix = "vh") {
  return vhValue + prefix;
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
  ballDiv.style.bottom = addViewPortPrefix(ball.bottom);
  ballDiv.style.left = addViewPortPrefix(ball.left, "vw");
  ballDiv.style.width = addViewPortPrefix(ball.width, "vw");
  ballDiv.style.height = addViewPortPrefix(ball.height);
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

const intialize = function() {
  let paddle = new Paddle(3, 30, 12, 3);
  let paddleDiv = createPaddle(document, paddle);
  let ball = new Ball(7, 10, 4, 7);
  let ballDiv = createBall(document, ball);
  let screen = getScreen(document);
  screen.focus();
  screen.onkeydown = handleEvents.bind(null, paddle, paddleDiv);
};

window.onload = intialize;
