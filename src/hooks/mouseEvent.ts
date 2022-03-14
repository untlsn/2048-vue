import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue';

export enum Dir {
  left = 'left',
  right = 'right',
  top = 'top',
  down = 'down',
  none = 'none',
}

interface Cords {
  x?: number,
  y?: number,
}

const mouseEvent = (bind: HTMLElement) => {
  let dir = ref(Dir.none);
  const setCords = ({ x, y }: Cords = {}): Cords => ({ x, y });
  const upCords = ref(setCords());
  const downCords = ref(setCords());

  const downEv = ref((ev: MouseEvent) => {
    downCords.value = setCords(ev);
  });
  const upEv = ref((ev: MouseEvent) => {
    upCords.value = setCords(ev);
  });

  watchEffect(() => {
    if (upCords.value.x && upCords.value.y && downCords.value.x && downCords.value.y) {
      const difference = {
        x: upCords.value.x - downCords.value.x,
        y: upCords.value.y - downCords.value.y,
      };
      if (Math.abs(difference.x) > Math.abs(difference.y)) {
        dir.value = difference.x > 0 ? Dir.right : Dir.left;
      } else {
        dir.value = difference.y > 0 ? Dir.down : Dir.top;
      }
      upCords.value = setCords();
      downCords.value = setCords();
    }
  });

  onMounted(() => {
    bind.addEventListener('mousedown', downEv.value);
    bind.addEventListener('mouseup', upEv.value);
  });

  onBeforeUnmount(() => {
    bind.removeEventListener('mousedown', downEv.value);
    bind.removeEventListener('mouseup', upEv.value);
  });

  return dir;
};

export default mouseEvent;
