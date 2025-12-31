export type Cell = number; // 0 = empty, >0 = color
export type Board = Cell[][];

export type Piece = {
  shape: number[][];
  x: number;
  y: number;
  color: number;
};
