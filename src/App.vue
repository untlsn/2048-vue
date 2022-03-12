<script setup lang="ts">
import Cell from '~/components/Cell.vue';
import { inject, watchEffect } from 'vue';
import mouseCords from '~/store/mouseCords';
import movablePositions from '~/store/movablePositions';
inject('movablePositions', movablePositions);


const plusMinus = (num1: any, num2: any) => num1 + 1 == num2 || num1 - 1 == num2;

watchEffect(() => {
  const { up, down } = mouseCords;

  if (up.row && down.id > -1) {
    if (
      (down.row == up.row && plusMinus(down.column, up.column)) ||
      (down.column == up.column && plusMinus(down.row, up.row))
    ) {
      const movable = movablePositions.value[down.id];
      movable.row = up.row;
      movable.column = up.column!;

      if (up.id > -1) {
        delete movablePositions.value[up.id];
        movable.count *= 2;
      }
    }

    mouseCords.down = { id: -1 };
    mouseCords.up = { id: -1 };
  }
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
