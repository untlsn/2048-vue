import { reactive } from 'vue';
import getRandom from '~/helpers/random';

export interface Movable {
  column: number,
  row: number,
  count: number
  id: number
}

let id = 0;

const movablePositions = reactive({
  value: {
    [++id]: { column: 1, row: 1, count: 1, id },
  } as Record<number, Movable>,
  get emptyPositions() {
    const vals: Movable[] = Object.values(this.value);
    return [
      [1,1], [2,1],[3,1],[4,1],
      [1,2],[2,2],[3,2],[4,2],
      [1,3],[2,3],[3,3],[4,3],
      [1,4],[2,4],[3,4],[4,4],
    ].filter(([col, row]) => !vals.some(it => it.column == col && it.row == row));
  },
  get empty() {
    return this.emptyPositions == 0;
  },
  addRand() {
    if (this.empty) return;
    let randPos = getRandom(0, this.emptyPositions.length-1);
    const [column, row] = this.emptyPositions.splice(randPos, 1)[0];

    this.value[++id] = {
      id,
      column,
      row,
      count: 1,
    };
  },
});

export default movablePositions;
