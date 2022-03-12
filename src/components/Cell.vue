<script lang="ts" setup="">
import { computed } from 'vue';
import mouseCords from '~/store/mouseCords';

const props = withDefaults(defineProps<{
  row: number,
  column: number
  class?: string
  id?: number
}>(), {
  class: '',
  id: -1,
});

const style = computed(() => ({
  '--column': props.column,
  '--row': props.row,
}));

const mouse = (on: 'down' | 'up') => {

  mouseCords[on] = {
    column: props.column,
    row: props.row,
    id: props.id,
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
