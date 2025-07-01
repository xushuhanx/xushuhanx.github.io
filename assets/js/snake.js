// ====== 贪吃蛇小游戏 ======
(function() {
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    let snake = [{x: 8, y: 10}];
    let direction = {x: 1, y: 0};
    let food = {x: 15, y: 10};
    let growing = false;
    let gameOver = false;
    let score = 0;

    function drawBoard() {
        ctx.fillStyle = '#181c24';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? '#b6cdfc' : '#3a4a7a';
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize-2, gridSize-2);
        }
    }

    function drawFood() {
        ctx.fillStyle = '#f3f6fa';
        ctx.beginPath();
        ctx.arc((food.x + 0.5) * gridSize, (food.y + 0.5) * gridSize, gridSize/2.5, 0, Math.PI*2);
        ctx.fill();
    }

    function drawScore() {
        ctx.fillStyle = '#b6cdfc';
        ctx.font = '16px Arial';
        ctx.fillText('分数: ' + score, 10, 24);
    }

    function moveSnake() {
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        // 撞墙
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            gameOver = true;
            return;
        }
        // 撞自己
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver = true;
                return;
            }
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            placeFood();
        } else {
            snake.pop();
        }
    }

    function placeFood() {
        let newFood;
        do {
            newFood = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
        food = newFood;
    }

    function drawGameOver() {
        ctx.fillStyle = '#f3f6fa';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('游戏结束', canvas.width/2, canvas.height/2);
        ctx.font = '20px Arial';
        ctx.fillText('分数: ' + score, canvas.width/2, canvas.height/2 + 36);
    }

    function gameLoop() {
        if (gameOver) {
            drawGameOver();
            return;
        }
        drawBoard();
        drawSnake();
        drawFood();
        drawScore();
        moveSnake();
        setTimeout(gameLoop, 120);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowUp' && direction.y !== 1) direction = {x: 0, y: -1};
        else if (e.key === 'ArrowDown' && direction.y !== -1) direction = {x: 0, y: 1};
        else if (e.key === 'ArrowLeft' && direction.x !== 1) direction = {x: -1, y: 0};
        else if (e.key === 'ArrowRight' && direction.x !== -1) direction = {x: 1, y: 0};
    });

    gameLoop();
})(); 