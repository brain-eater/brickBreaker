const SCREEN_HEIGHT = 97;
const SCREEN_WIDTH = 70;

const getBall = document => document.getElementById("ball_1");
const getScreen = document => document.getElementById("screen");
const getPaddle = document => document.getElementById("paddle_1");

const addPrefix = function(value, prefix = "px") {
  return value + prefix;
};

const handleEvents = function(document, game) {
  let keys = {
    ArrowLeft: "left",
    ArrowRight: "right"
  };
  game.movePaddle(keys[event.key]);
  drawPaddle(document, game.components.paddle);
};

const drawPaddle = function(document, paddle) {
  let paddleDiv = getPaddle(document);
  paddleDiv.style.top = addPrefix(paddle.top, "vh");
  paddleDiv.style.left = addPrefix(paddle.left, "vw");
  paddleDiv.style.width = addPrefix(paddle.width, "vw");
  paddleDiv.style.height = addPrefix(paddle.height, "vh");
};

const drawWall = function(document, wall, wallId) {
  let wallDiv = document.getElementById(wallId);
  wallDiv.style.top = addPrefix(wall.top, "vh");
  wallDiv.style.left = addPrefix(wall.left, "vw");
  wallDiv.style.width = addPrefix(wall.breadth, "vw ");
  wallDiv.style.height = addPrefix(wall.height, "vh");
};
const drawBall = function(document, ball) {
  let ballDiv = getBall(document);
  ballDiv.style.top = addPrefix(ball.top, "vh");
  ballDiv.style.left = addPrefix(ball.left, "vw");
  ballDiv.style.width = addPrefix(ball.height, "vw");
  ballDiv.style.height = addPrefix(ball.width, "vh");
};

const createWall = function(document, wall, id) {
  let screen = getScreen(document);
  let wallDiv = document.createElement("div");
  wallDiv.id = id;
  wallDiv.className = "wall";
  screen.appendChild(wallDiv);
  drawWall(document, wall, id);
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

const createBall = function(document, ball) {
  let screen = getScreen(document);
  let ballDiv = document.createElement("div");
  ballDiv.id = "ball_1";
  ballDiv.className = "ball";
  screen.appendChild(ballDiv);
  drawBall(document, ball);
};

const createDivs = function(document, components) {
  let { paddle, ball, walls } = components;
  let [leftWall, rightWall, topWall, bottomWall] = walls;
  createPaddle(document, paddle);
  createBall(document, ball);
  createWall(document, leftWall, "left_wall");
  createWall(document, rightWall, "right_wall");
  createWall(document, topWall, "top_wall");
  createWall(document, bottomWall, "bottom_wall");
};

function createComponents() {
  let paddle = new Paddle(93, 30, 12, 3);
  let ball = new Ball(7, 10, 3, 4.85);
  let leftWall = new Wall(0, 0, SCREEN_HEIGHT, 1, "left");
  let rightWall = new Wall(0, SCREEN_WIDTH, SCREEN_HEIGHT, 1, "right");
  let topWall = new Wall(0, 0, 1, SCREEN_WIDTH + 1, "top");
  let bottomWall = new Wall(SCREEN_HEIGHT, 0, 1, SCREEN_WIDTH + 1, "bottom");
  let walls = [leftWall, rightWall, topWall, bottomWall];
  return { paddle, ball, walls };
}

const createGameComponents = function(document) {
  let components = createComponents();
  createDivs(document, components);
  let ballConfig = { ballSpeed: 0.2, ballDirection: 30 };
  let screenDimensions = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  };
  let game = new Game(ballConfig, components, screenDimensions);

  return game;
};

const intialize = function() {
  let game = createGameComponents(document);
  game.shoot(drawBall.bind(null, document, game.components.ball));
  let screen = getScreen(document);
  screen.focus();
  screen.onkeydown = handleEvents.bind(null, document, game);
};

window.onload = intialize;
