// Taille du canvas
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var box = 20;
var canvasSize = 20;

// Le serpent
var snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
var direction;

// La pomme
var apple = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};

// Contrôles
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode == 37 && direction != "RIGHT") direction = "LEFT";
    else if (event.keyCode == 38 && direction != "DOWN") direction = "UP";
    else if (event.keyCode == 39 && direction != "LEFT") direction = "RIGHT";
    else if (event.keyCode == 40 && direction != "UP") direction = "DOWN";
}

// Vérification des collisions
function collision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

// Dessin du jeu
function draw() {
    // Dessin du canvas
    context.fillStyle = "#111";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dessin du serpent
    for (var i = 0; i < snake.length; i++) {
        context.fillStyle = "#00FF00";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Dessin de la pomme
    context.fillStyle = "#FF0000";
    context.fillRect(apple.x, apple.y, box, box);

    // Déplacement du serpent
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (direction == "LEFT") snakeX -= box;
    if (direction == "UP") snakeY -= box;
    if (direction == "RIGHT") snakeX += box;
    if (direction == "DOWN") snakeY += box;

    // Gestion de la croissance du serpent
    if (snakeX == apple.x && snakeY == apple.y) {
        apple = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop();
    }

    // Création de la nouvelle tête du serpent
    var newHead = {
        x: snakeX,
        y: snakeY
    };

    // Fin de jeu
    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvasSize * box ||
        snakeY >= canvasSize * box ||
        collision(newHead, snake)
    ) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

var game = setInterval(draw, 100);
