import { reactive } from 'vue';

interface Cords {
  column?: number,
  row?: number
  id?: number
}

const mouseCords = reactive({
  down: {} as Cords,
  up: {} as Cords,
});

export default mouseCords;
