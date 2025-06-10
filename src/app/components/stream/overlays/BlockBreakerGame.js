import React, { useRef, useEffect } from 'react';

function BlockBreakerGame() {
    const canvasRef = useRef(null);
    let animationFrameId = null; // To store the request ID for canceling animation frame

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Game variables
        const paddleHeight = 10;
        const paddleWidth = 75;
        let paddleX = (canvas.width - paddleWidth) / 2;
        const paddleSpeed = 5;

        const ballRadius = 10;
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 2;
        let dy = -2;

        // Scoring
        let score = 0;

        // Game State
        let gameState = 'playing'; // 'playing', 'won', 'lost'

        // Keyboard control variables
        let rightPressed = false;
        let leftPressed = false;

        // Block variables
        const brickRowCount = 5;
        const brickColumnCount = 7;
        const brickWidth = 45;
        const brickHeight = 15;
        const brickPadding = 5;
        const brickOffsetTop = 30;
        const brickOffsetLeft = 30;

        // Create the blocks array
        const bricks = [];
        function createBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
        }
        createBricks(); // Initialize bricks


        // Event listeners for key presses
        function keyDownHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = true;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = true;
            } else if (e.key === "Enter" && gameState !== 'playing') { // Restart on Enter if game is over
                restartGame();
            }
        }

        function keyUpHandler(e) {
            if (e.key === "Right" || e.key === "ArrowRight") {
                rightPressed = false;
            } else if (e.key === "Left" || e.key === "ArrowLeft") {
                leftPressed = false;
            }
        }

        // Add event listeners to the document
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        // Function to draw the paddle
        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }

        // Function to draw the ball
        function drawBall() {
            ctx.beginPath();
            ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }

        // Function to draw the blocks
        function drawBricks() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    if (bricks[c][r].status === 1) {
                        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        // Create a linear gradient for the brick
                        const gradient = ctx.createLinearGradient(brickX, brickY, brickX + brickWidth, brickY);
                        gradient.addColorStop(0, '#05EBFB'); // Start color
                        gradient.addColorStop(1, '#DB19E5'); // End color
                        ctx.fillStyle = gradient; // Set the fill style to the gradient
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        // Function to draw the score
        function drawScore() {
            ctx.font = "16px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.fillText("Score: " + score, 8, 20);
        }

        // Function to display messages (Win/Loss/Restart)
        function displayMessage(msg1, msg2) {
            ctx.font = "24px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.textAlign = "center";
            ctx.fillText(msg1, canvas.width / 2, canvas.height / 2);
            if (msg2) {
                ctx.font = "18px Arial";
                ctx.fillText(msg2, canvas.width / 2, canvas.height / 2 + 30);
            }
            ctx.textAlign = "left"; // Reset text alignment
        }

        // Collision detection for blocks
        function collisionDetection() {
            for (let c = 0; c < brickColumnCount; c++) {
                for (let r = 0; r < brickRowCount; r++) {
                    const b = bricks[c][r];
                    if (b.status === 1) {
                        if (
                            x > b.x &&
                            x < b.x + brickWidth &&
                            y > b.y &&
                            y < b.y + brickHeight
                        ) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            if (score === brickRowCount * brickColumnCount) {
                                gameState = 'won'; // Set game state to won
                                cancelAnimationFrame(animationFrameId); // Stop the game loop
                            }
                        }
                    }
                }
            }
        }

        // Function to restart the game
        function restartGame() {
            score = 0;
            createBricks(); // Reset blocks
            x = canvas.width / 2; // Reset ball position
            y = canvas.height - 30;
            dx = 4; // Reset ball direction (increased from 2 to 4)
            dy = -4; // Reset ball direction (increased from -2 to -4)
            paddleX = (canvas.width - paddleWidth) / 2; // Reset paddle position
            gameState = 'playing'; // Set game state back to playing
            draw(); // Start the game loop again
        }

        // Game loop
        function draw() {
            // Clear the canvas for the next frame
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw elements
            drawBricks();
            drawPaddle();
            drawBall();
            drawScore();

            if (gameState === 'playing') {
                // Update ball position
                x += dx;
                y += dy;

                // Wall and paddle collision detection
                if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
                    dx = -dx;
                }
                if (y + dy < ballRadius) {
                    dy = -dy;
                } else if (y + dy > canvas.height - ballRadius) {
                    if (x > paddleX && x < paddleX + paddleWidth) {
                        dy = -dy;
                    } else {
                        gameState = 'lost'; // Set game state to lost
                        cancelAnimationFrame(animationFrameId); // Stop the game loop
                    }
                }

                // Paddle movement
                if (rightPressed && paddleX < canvas.width - paddleWidth) {
                    paddleX += paddleSpeed;
                } else if (leftPressed && paddleX > 0) {
                    paddleX -= paddleSpeed;
                }

                // Check for collisions
                collisionDetection();

                // Request the next frame
                animationFrameId = requestAnimationFrame(draw);

            } else if (gameState === 'won') {
                displayMessage("YOU WIN!", "Press Enter to Restart");
            } else if (gameState === 'lost') {
                displayMessage("GAME OVER", "Press Enter to Restart");
            }

        }

        // Start the game loop
        draw();

        // Cleanup event listeners on component unmount
        return () => {
            document.removeEventListener("keydown", keyDownHandler, false);
            document.removeEventListener("keyup", keyUpHandler, false);
            cancelAnimationFrame(animationFrameId); // Clean up animation frame on unmount
        };

    }, []);

    return (
        <div style={{ width: '400px', height: '300px', border: '1px solid white' }}>
            <canvas ref={canvasRef} width="400" height="300" style={{ display: 'block' }}></canvas>
        </div>
    );
}

export default BlockBreakerGame; 