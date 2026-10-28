import { describe, expect, it } from "vitest";
import { createSnake, placeFood, queueTurn, tick, type SnakeState } from "@/lib/snake";

const fixed = (value: number) => () => value;

describe("snake game logic", () => {
  it("starts with a 3-cell snake moving right", () => {
    const game = createSnake(10, 10, fixed(0));
    expect(game.snake).toHaveLength(3);
    expect(game.dir).toBe("right");
    expect(game.over).toBe(false);
  });

  it("moves one cell per tick", () => {
    const game = tick(createSnake(10, 10, fixed(0)), fixed(0));
    expect(game.snake[0]).toEqual({ x: 6, y: 5 });
    expect(game.snake).toHaveLength(3);
  });

  it("ignores a turn straight back into the snake", () => {
    const game = createSnake(10, 10, fixed(0));
    expect(queueTurn(game, "left").queued).toHaveLength(0);
  });

  it("keeps at most two queued turns", () => {
    let game = createSnake(10, 10, fixed(0));
    game = queueTurn(game, "up");
    game = queueTurn(game, "left");
    game = queueTurn(game, "down");
    expect(game.queued).toHaveLength(2);
  });

  it("grows and scores when the food is eaten", () => {
    const start: SnakeState = { ...createSnake(10, 10, fixed(0)), dir: "up", food: { x: 5, y: 4 } };
    const next = tick(start, fixed(0));
    expect(next.score).toBe(1);
    expect(next.snake).toHaveLength(4);
    expect(next.food).not.toEqual({ x: 5, y: 4 });
  });

  it("ends the game on a wall", () => {
    let game = createSnake(4, 4, fixed(0));
    for (let i = 0; i < 10 && !game.over; i += 1) game = tick(game, fixed(0));
    expect(game.over).toBe(true);
  });

  it("ends the game when the head hits the body", () => {
    const loop: SnakeState = {
      cols: 10, rows: 10, dir: "right", queued: [],
      snake: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 3 }, { x: 1, y: 3 }, { x: 1, y: 2 }],
      food: { x: 9, y: 9 }, score: 0, over: false,
    };
    expect(tick(loop, fixed(0)).over).toBe(true);
  });

  it("never places food on the snake, and reports a full board", () => {
    expect(placeFood([{ x: 0, y: 0 }], 2, 1, fixed(0))).toEqual({ x: 1, y: 0 });
    expect(placeFood([{ x: 0, y: 0 }], 1, 1, fixed(0))).toBeNull();
  });
});
