/* Pure Snake logic: no React, no DOM. Easy to test and reuse. */

export type Dir = "up" | "down" | "left" | "right";
export type Point = { x: number; y: number };

export interface SnakeState {
  cols: number;
  rows: number;
  /** snake[0] is the head. */
  snake: Point[];
  /** Direction of the last applied move. */
  dir: Dir;
  /** Turns waiting to be applied, one per tick (max 2), so quick taps are not lost. */
  queued: Dir[];
  food: Point;
  score: number;
  over: boolean;
}

export const OPPOSITE: Record<Dir, Dir> = { up: "down", down: "up", left: "right", right: "left" };
export const DELTA: Record<Dir, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const MAX_QUEUED_TURNS = 2;

const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y;

/** Picks a random empty cell. Returns null when the board is full. */
export function placeFood(snake: Point[], cols: number, rows: number, random: () => number = Math.random): Point | null {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free: Point[] = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (!taken.has(`${x},${y}`)) free.push({ x, y });
    }
  }
  if (free.length === 0) return null;
  return free[Math.floor(random() * free.length)];
}

/** A fresh game: 3-cell snake in the middle of the board, moving right. */
export function createSnake(cols = 16, rows = 16, random: () => number = Math.random): SnakeState {
  const midY = Math.floor(rows / 2);
  const midX = Math.floor(cols / 2);
  const snake = [
    { x: midX, y: midY },
    { x: midX - 1, y: midY },
    { x: midX - 2, y: midY },
  ];
  return {
    cols,
    rows,
    snake,
    dir: "right",
    queued: [],
    food: placeFood(snake, cols, rows, random) ?? { x: 0, y: 0 },
    score: 0,
    over: false,
  };
}

/**
 * Queues a turn. Ignores reversing into yourself and repeating the same direction,
 * so a fast double-tap cannot make the snake run into its own neck.
 */
export function queueTurn(state: SnakeState, dir: Dir): SnakeState {
  if (state.over) return state;
  const last = state.queued.length ? state.queued[state.queued.length - 1] : state.dir;
  if (dir === last || dir === OPPOSITE[last]) return state;
  if (state.queued.length >= MAX_QUEUED_TURNS) return state;
  return { ...state, queued: [...state.queued, dir] };
}

/** Advances the game by one step. */
export function tick(state: SnakeState, random: () => number = Math.random): SnakeState {
  if (state.over) return state;

  const dir = state.queued[0] ?? state.dir;
  const queued = state.queued.slice(1);
  const head = state.snake[0];
  const next = { x: head.x + DELTA[dir].x, y: head.y + DELTA[dir].y };

  const hitWall = next.x < 0 || next.y < 0 || next.x >= state.cols || next.y >= state.rows;
  // The tail moves away this tick (unless we eat), so it is safe to move into the old tail cell.
  const body = state.snake.slice(0, -1);
  const hitSelf = body.some((p) => samePoint(p, next));
  if (hitWall || hitSelf) {
    return { ...state, dir, queued, over: true };
  }

  const ate = samePoint(next, state.food);
  const snake = ate ? [next, ...state.snake] : [next, ...state.snake.slice(0, -1)];

  if (!ate) return { ...state, snake, dir, queued };

  const food = placeFood(snake, state.cols, state.rows, random);
  return {
    ...state,
    snake,
    dir,
    queued,
    score: state.score + 1,
    food: food ?? state.food,
    // Board completely filled: the player has won, so the game ends.
    over: food === null,
  };
}
