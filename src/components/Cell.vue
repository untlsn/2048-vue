<script lang="ts" setup="">
import { reactive } from 'vue';
import mouseCords from '~/store/mouseCords';
import noop from '~/helpers/noop';

const props = withDefaults(defineProps<{
  initRow: number,
  initColumn: number
  class?: string
  movable?: boolean
}>(), {
  class: '',
});

const style = reactive({
  '--column': props.initRow,
  '--row': props.initColumn,
});

const mouse = (on: 'down' | 'up') => {
  mouseCords[on] = {
    column: style['--column'],
    row: style['--row'],
    moveEv: on == 'down' && props.movable
      ? () => {
        style['--column'] = mouseCords.up.column!;
        style['--row'] = mouseCords.up.row!;
      } : noop,
  };
};


</script>

<template>
  <div
    class="h-25 w-25 border-1 block-sit flex items-center justify-center text-3xl cursor-move select-none"
    :class="props.class"
    :style="style"
    @mousedown="mouse('down')"
    @mouseup="mouse('up')"
  >
    <slot />
  </div>
</template>

<style scoped>
.block-sit {
  --column: 1;
  --row: 1;
  grid-column: var(--column) / span 1;
  grid-row: var(--row) / span 1;
}
</style>
