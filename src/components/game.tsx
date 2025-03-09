// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Input } from "./ui/input";
// import saveHighscore from "@/actions/saveHighscore";

// interface Props {
//   highscoreSaved?: () => void;
// }

// export default function Game({ highscoreSaved }: Props) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [startGame, setStartGame] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [bestScore, setBestScore] = useState(0);
//   const [playerName, setPlayerName] = useState("");
//   const startGameRef = useRef(startGame);
//   const gameOverRef = useRef(gameOver);
//   const scoreRef = useRef(score);
//   const bestScoreRef = useRef(bestScore);
//   const animationFrameId = useRef<number | null>(null);

//   const startGameLoop = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const playerImages = [new Image(), new Image(), new Image(), new Image()];
//     playerImages[0].src = "/not-found/veve-skate-1.webp";
//     playerImages[1].src = "/not-found/veve-skate-2.webp";
//     playerImages[2].src = "/not-found/veve-skate-3.webp";
//     playerImages[3].src = "/not-found/veve-skate-4.webp";

//     const player = {
//       x: 50,
//       y: 300,
//       width: 50,
//       height: 50,
//       dy: 0,
//       gravity: 0.5,
//       jumpPower: -12,
//       grounded: false,
//       imageIndex: 0,
//     };

//     let obstacles: {
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//     }[] = [];

//     let frameCounter = 0;
//     const framesPerImage = 3;
//     const frameRate = 60; // Target frame rate (frames per second)
//     const frameDuration = 1000 / frameRate; // Duration of each frame in milliseconds
//     let lastFrameTime = performance.now();

//     const drawPlayer = () => {
//       ctx.drawImage(
//         playerImages[player.imageIndex],
//         player.x,
//         player.y,
//         player.width,
//         player.height
//       );

//       frameCounter++;
//       if (frameCounter >= framesPerImage) {
//         player.imageIndex = (player.imageIndex + 1) % playerImages.length;
//         frameCounter = 0;
//       }
//     };

//     const updatePlayer = () => {
//       player.dy += player.gravity;
//       player.y += player.dy;

//       if (player.y + player.height > canvas.height) {
//         player.y = canvas.height - player.height;
//         player.dy = 0;
//         player.grounded = true;
//       } else {
//         player.grounded = false;
//       }
//     };

//     const handleInput = () => {
//       const handleKeyDown = (e: KeyboardEvent) => {
//         if (e.code === "Space") {
//           if (gameOverRef.current) {
//             resetGame();
//           } else if (player.grounded) {
//             player.dy = player.jumpPower;
//           }
//         }
//       };
//       window.addEventListener("keydown", handleKeyDown);
//       return () => {
//         window.removeEventListener("keydown", handleKeyDown);
//       };
//     };

//     const createObstacle = () => {
//       const minDistance = 300;

//       if (obstacles.length > 0) {
//         const lastObstacle = obstacles[obstacles.length - 1];
//         const distance = canvas.width - lastObstacle.x;

//         if (distance < minDistance) {
//           return;
//         }
//       }

//       let obstacle = {
//         x: canvas.width,
//         y: canvas.height - 50,
//         width: 50,
//         height: 50,
//       };
//       obstacles.push(obstacle);
//     };

//     const drawObstacles = () => {
//       obstacles.forEach((obstacle) => {
//         // draw 50x50 square with ctx:
//         ctx.fillStyle = "red";
//         ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
//       });
//     };

//     const updateObstacles = () => {
//       obstacles.forEach((obstacle) => {
//         obstacle.x -= 5;
//       });

//       obstacles = obstacles.filter(
//         (obstacle) => obstacle.x + obstacle.width > 0
//       );
//     };

//     const checkCollision = () => {
//       obstacles.forEach((obstacle) => {
//         if (
//           player.x < obstacle.x + obstacle.width &&
//           player.x + player.width > obstacle.x &&
//           player.y < obstacle.y + obstacle.height &&
//           player.y + player.height > obstacle.y
//         ) {
//           setGameOver(true);
//           gameOverRef.current = true;
//           if (scoreRef.current > bestScoreRef.current) {
//             setBestScore(scoreRef.current);
//             bestScoreRef.current = scoreRef.current;
//           }
//         }
//       });
//     };

//     const updateScore = () => {
//       scoreRef.current += 1;
//       setScore(scoreRef.current);
//       ctx.fillStyle = "white";
//       ctx.font = "20px pixelFont";
//       ctx.fillText(`Score: ${scoreRef.current}`, 10, 20);
//       // ctx.fillText(`Best: ${bestScoreRef.current}`, canvas.width - 100, 20);
//     };

//     const gameLoop = (timestamp: number) => {
//       const deltaTime = timestamp - lastFrameTime;

//       if (deltaTime >= frameDuration) {
//         lastFrameTime = timestamp;

//         if (!startGameRef.current || gameOverRef.current) {
//           return;
//         }

//         // if (gameOverRef.current) {
//         //   ctx.fillStyle = "white";
//         //   ctx.font = "40px pixelFont";
//         //   ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
//         //   return;
//         // }

//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         drawPlayer();
//         updatePlayer();

//         if (Math.random() < 0.06) {
//           createObstacle();
//         }

//         drawObstacles();
//         updateObstacles();

//         checkCollision();
//         updateScore();
//       }

//       animationFrameId.current = requestAnimationFrame(gameLoop);
//     };

//     handleInput();
//     animationFrameId.current = requestAnimationFrame(gameLoop);
//   };

//   const resetGame = useCallback(() => {
//     setGameOver(false);
//     setScore(0);
//     startGameRef.current = false;
//     gameOverRef.current = false;
//     scoreRef.current = 0;

//     //clear canvas
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     if (animationFrameId.current) {
//       cancelAnimationFrame(animationFrameId.current);
//     }

//     startGameLoop();
//   }, [startGameLoop]);

//   useEffect(() => {
//     startGameRef.current = startGame;
//     if (startGame) {
//       startGameLoop();
//       return () => {
//         if (animationFrameId.current) {
//           cancelAnimationFrame(animationFrameId.current);
//         }
//       };
//     }
//   }, [startGame, resetGame]);

//   const handleDiscardHighscore = () => {
//     setStartGame(false);
//     resetGame();
//   };

//   const handleSaveHighscore = () => {
//     saveHighscore(playerName, score).then((highscore) => {
//       highscoreSaved?.();
//       setStartGame(false);
//       resetGame();
//     });
//   };

//   return (
//     <>
//       <div className="relative">
//         <canvas
//           ref={canvasRef}
//           width="800"
//           height="200"
//           className="mx-auto bg-transparent border-b-4"
//         ></canvas>
//         {!startGame && (
//           <Button
//             className=" absolute top-1/2 left-1/2 transform -translate-1/2 text-5xl py-8"
//             onClick={() => setStartGame(true)}
//           >
//             Start Game
//           </Button>
//         )}
//       </div>
//       <AlertDialog open={gameOverRef.current}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Game Over!</AlertDialogTitle>
//             <AlertDialogDescription>
//               You scored <b>{score}</b> points! 🎉
//               <br />
//               <br />
//               Do you want to add your score to the leaderboard?
//               <br />
//               <br />
//               If yes, please enter your name:
//               <br />
//               <Input
//                 type="text"
//                 placeholder="coolguy123"
//                 value={playerName}
//                 onChange={(e) => setPlayerName(e.target.value)}
//               />
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter className="flex justify-between">
//             <AlertDialogAction onClick={handleDiscardHighscore}>
//               Cancel
//             </AlertDialogAction>
//             <AlertDialogAction
//               onClick={handleSaveHighscore}
//               disabled={!playerName}
//             >
//               Add meee
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }
