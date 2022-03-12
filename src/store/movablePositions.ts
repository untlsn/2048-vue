import { reactive } from 'vue';

export interface Movable {
  column: number,
  row: number,
  count: number
  id: number
}

let id = 0;

const movablePositions = reactive<{ value: Record<number, Movable> }>({
  value: {
    [++id]: { column: 1, row: 1, count: 1, id },
    [++id]: { column: 4, row: 2, count: 1, id },
  },
});

export default movablePositions;
