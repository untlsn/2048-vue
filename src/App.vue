<script setup lang="ts">
import Cell from '~/components/Cell.vue';
import mouseEvent from '~/hooks/mouseEvent';
import { watchEffect } from 'vue';
import movablePositions from '~/store/movablePositions';

const dir = mouseEvent(document.body);
watchEffect(() => {
  console.log(dir.value);
});

</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="grid grid-cols-4 grid-rows-4 gap-2 h-106 w-106">
      <div v-for="supIndex in 4" :key="supIndex" class="contents">
        <Cell
          v-for="index in 4"
          :key="`static-${supIndex}-${index}`"
          :column="index"
          :row="supIndex"
          class="bg-gray-100"
        />
      </div>
      <Cell
        v-for="movable in Object.values(movablePositions.value)"
        :id="movable.id"
        :key="`movable-${movable.id}`"
        :column="movable.column"
        :row="movable.row"
        class="bg-amber-500"
      >
        {{ movable.count }}
      </Cell>
    </div>
  </div>
</template>
