import { reactive } from 'vue';

interface Cords {
  column?: number,
  row?: number
}

interface CordsEv extends Cords {
  moveEv?(cords: Cords): void
}

const mouseCords = reactive({
  down: {} as CordsEv,
  up: {} as CordsEv,
});

export default mouseCords;
