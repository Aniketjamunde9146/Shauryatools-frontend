"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { createSnake, queueTurn, tick, type Dir, type SnakeState } from "@/lib/snake";
import "./SnakeLoader.css";

const COLS = 16;
const ROWS = 16;
const TICK_MS = 140;
const BEST_KEY = "st-snake-best";
const SWIPE_MIN_PX = 24;

const KEY_TO_DIR: Record<string, Dir> = {
  ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
  w: "up", s: "down", a: "left", d: "right",
  W: "up", S: "down", A: "left", D: "right",
};

const COLORS = {
  board: "#f8f8f6",
  grid: "#e4e4e0",
  snake: "#5a5a54",
  head: "#0a0a0a",
  food: "#16a34a",
};

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // Storage can be blocked (private mode). The best score just will not persist.
  }
}

/** The game board itself. Mounted only while loading, so every new wait starts a fresh game. */
function SnakeBoard({ paused, message }: { paused: boolean; message: string }) {
  const [game, setGame] = useState<SnakeState>(() => createSnake(COLS, ROWS));
  const [userPaused, setUserPaused] = useState(false);
  const [best, setBest] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const running = !paused && !userPaused && !game.over;

  useEffect(() => {
    setBest(readBest());
  }, []);

  // Game clock. Stops while paused, hidden, or after game over.
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setGame((g) => tick(g)), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // Save a new best score when a game ends.
  useEffect(() => {
    if (!game.over || game.score === 0) return;
    setBest((current) => {
      if (game.score <= current) return current;
      saveBest(game.score);
      return game.score;
    });
  }, [game.over, game.score]);

  // Keyboard: arrows or WASD to steer, Space or P to pause.
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const dir = KEY_TO_DIR[event.key];
      if (dir) {
        event.preventDefault();
        setGame((g) => queueTurn(g, dir));
        return;
      }
      if (event.key === " " || event.key === "p" || event.key === "P") {
        event.preventDefault();
        setUserPaused((p) => !p);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drawing. Runs only when the board changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 320;
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cell = size / COLS;
    ctx.fillStyle = COLORS.board;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < COLS; i += 1) {
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, size);
      ctx.moveTo(0, i * cell);
      ctx.lineTo(size, i * cell);
    }
    ctx.stroke();

    // Food
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc((game.food.x + 0.5) * cell, (game.food.y + 0.5) * cell, cell * 0.34, 0, Math.PI * 2);
    ctx.fill();

    // Snake, head drawn darker
    game.snake.forEach((p, index) => {
      ctx.fillStyle = index === 0 ? COLORS.head : COLORS.snake;
      const pad = cell * 0.08;
      ctx.beginPath();
      const x = p.x * cell + pad;
      const y = p.y * cell + pad;
      const w = cell - pad * 2;
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, w, cell * 0.24);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, w, w); // Older browsers: square cells still read fine.
      }
    });
  }, [game]);

  function turn(dir: Dir) {
    setGame((g) => queueTurn(g, dir));
  }

  function restart() {
    setGame(createSnake(COLS, ROWS));
    setUserPaused(false);
  }

  function onTouchStart(event: TouchEvent) {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(event: TouchEvent) {
    const start = touchStart.current;
    touchStart.current = null;
    const t = event.changedTouches[0];
    if (!start) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < SWIPE_MIN_PX) return;
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? "right" : "left");
    else turn(dy > 0 ? "down" : "up");
  }

  const status = game.over
    ? "Game over"
    : paused
      ? "Paused while hidden"
      : userPaused
        ? "Paused"
        : "";

  return (
    <div className="sl-body">
      <p className="sl-status" aria-live="polite">{message}</p>

      <div className="sl-stats" aria-label="Score">
        <span>Score <strong>{game.score}</strong></span>
        <span>Best <strong>{best}</strong></span>
      </div>

      <div className="sl-board" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <canvas
          ref={canvasRef}
          className="sl-canvas"
          role="img"
          aria-label={`Snake board. Score ${game.score}.`}
          style={{ width: "100%", height: "100%" }}
        />
        {(game.over || status) && (
          <div className="sl-overlay">
            <p>{status}</p>
            {game.over && (
              <button type="button" className="sl-btn" onClick={restart}>Play again</button>
            )}
            {!game.over && !paused && userPaused && (
              <button type="button" className="sl-btn" onClick={() => setUserPaused(false)}>Resume</button>
            )}
          </div>
        )}
      </div>

      <div className="sl-pad" role="group" aria-label="Snake controls">
        <span />
        <button type="button" className="sl-key" aria-label="Up" onPointerDown={() => turn("up")}>▲</button>
        <span />
        <button type="button" className="sl-key" aria-label="Left" onPointerDown={() => turn("left")}>◀</button>
        <button
          type="button"
          className="sl-key sl-key-pause"
          aria-label={userPaused ? "Resume" : "Pause"}
          onClick={() => setUserPaused((p) => !p)}
        >
          {userPaused ? "▶" : "❚❚"}
        </button>
        <button type="button" className="sl-key" aria-label="Right" onPointerDown={() => turn("right")}>▶</button>
        <span />
        <button type="button" className="sl-key" aria-label="Down" onPointerDown={() => turn("down")}>▼</button>
        <span />
      </div>
      <p className="sl-hint">Swipe the board, tap the arrows, or use the arrow keys. Space pauses.</p>
    </div>
  );
}

interface SnakeLoaderProps {
  /** True while the AI request is running. The popup appears and disappears with it. */
  loading: boolean;
  message?: string;
}

/**
 * A snake game shown while a result is generating. It never blocks the page: it sits in a
 * corner, can be hidden to a small button, and the request keeps going either way.
 */
export default function SnakeLoader({
  loading,
  message = "Your result is on the way.",
}: SnakeLoaderProps) {
  const [minimized, setMinimized] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // Each new request opens the game again.
  useEffect(() => {
    if (!loading) return;
    setMinimized(false);
    setSeconds(0);
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [loading]);

  useEffect(() => {
    if (!loading || minimized) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMinimized(true);
    }
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [loading, minimized]);

  if (!loading) return null;

  return (
    <>
      {minimized && (
        <button type="button" className="sl-pill" onClick={() => setMinimized(false)}>
          <span aria-hidden="true">🐍</span> Play Snake while you wait
        </button>
      )}
      <section
        className="sl-panel"
        role="region"
        aria-label="Snake game while your result loads"
        hidden={minimized}
      >
        <header className="sl-head">
          <div>
            <p className="sl-kicker">Generating · {seconds}s</p>
            <h2 className="sl-title">Play Snake while you wait</h2>
          </div>
          <button type="button" className="sl-hide" onClick={() => setMinimized(true)}>
            Hide
          </button>
        </header>
        <SnakeBoard
          paused={minimized}
          message={seconds > 20 ? "Still working. The server may have been asleep, so this can take up to a minute." : message}
        />
      </section>
    </>
  );
}
