"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const gameOverRef = useRef(gameOver);
  const scoreRef = useRef(score);
  const bestScoreRef = useRef(bestScore);
  const animationFrameId = useRef<number | null>(null);

  const resetGame = useCallback(() => {
    setGameOver(false);
    setScore(0);
    gameOverRef.current = false;
    scoreRef.current = 0;

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    startGameLoop();
  }, []);

  const startGameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let player = {
      x: 50,
      y: 300,
      width: 50,
      height: 50,
      color: "blue",
      dy: 0,
      gravity: 0.5,
      jumpPower: -12,
      grounded: false,
    };

    let obstacles: {
      x: number;
      y: number;
      width: number;
      height: number;
      color: string;
    }[] = [];

    const drawPlayer = () => {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    };

    const updatePlayer = () => {
      player.dy += player.gravity;
      player.y += player.dy;

      if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.grounded = true;
      } else {
        player.grounded = false;
      }
    };

    const handleInput = () => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === "Space") {
          if (gameOverRef.current) {
            resetGame();
          } else if (player.grounded) {
            player.dy = player.jumpPower;
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    };

    const createObstacle = () => {
      const minDistance = 200;
      if (obstacles.length > 0) {
        const lastObstacle = obstacles[obstacles.length - 1];
        if (canvas.width - lastObstacle.x < minDistance) {
          return;
        }
      }

      let obstacle = {
        x: canvas.width,
        y: canvas.height - 50,
        width: 50,
        height: 50,
        color: "red",
      };
      obstacles.push(obstacle);
    };

    const drawObstacles = () => {
      obstacles.forEach((obstacle) => {
        ctx.fillStyle = obstacle.color;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    };

    const updateObstacles = () => {
      obstacles.forEach((obstacle) => {
        obstacle.x -= 3; // Reduced speed from 5 to 3
      });

      obstacles = obstacles.filter(
        (obstacle) => obstacle.x + obstacle.width > 0
      );
    };

    const checkCollision = () => {
      obstacles.forEach((obstacle) => {
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          setGameOver(true);
          gameOverRef.current = true;
          if (scoreRef.current > bestScoreRef.current) {
            setBestScore(scoreRef.current);
            bestScoreRef.current = scoreRef.current;
          }
        }
      });
    };

    const updateScore = () => {
      scoreRef.current += 1;
      setScore(scoreRef.current);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${scoreRef.current}`, 10, 20);
      ctx.fillText(`Best: ${bestScoreRef.current}`, canvas.width - 100, 20);
    };

    const gameLoop = () => {
      if (gameOverRef.current) {
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPlayer();
      updatePlayer();

      if (Math.random() < 0.005) {
        // Reduced frequency from 0.01 to 0.005
        createObstacle();
      }

      drawObstacles();
      updateObstacles();

      checkCollision();
      updateScore();

      animationFrameId.current = requestAnimationFrame(gameLoop);
    };

    handleInput();
    gameLoop();
  };

  useEffect(() => {
    startGameLoop();
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [resetGame]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="800"
        height="400"
        style={{ display: "block", margin: "0 auto", background: "#f0f0f0" }}
      ></canvas>
    </div>
  );
}
