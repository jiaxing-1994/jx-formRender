import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  Ref
} from 'vue';


export function useMouseMove(dom: Ref<HTMLElement|null>) {
  const mousePos = reactive({
    x: 0, // 当前X坐标
    y: 0, // 当前Y坐标
    moveX: 0, // 移动X距离
    moveY: 0, // 移动Y距离
    tickX: 0, // 每次移动X距离
    tickY: 0, // 每次移动Y距离
  });
  const startX = ref(0);
  const startY = ref(0);
  const isMoving = ref(false);
  const isDown = ref(false);
  const handleMousedown = (e: MouseEvent) => {
    startX.value = e.pageX;
    startY.value = e.pageY;
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
    isDown.value = true;
    addEvent();
  };
  let isIn = false;
  const handleMousemove = (e: MouseEvent) => {
    if (isIn) {
      return;
    }
    isIn = true;
    window.requestAnimationFrame(() => {
      if (isDown.value && dom) {
        isMoving.value = true;
        mousePos.tickX = e.pageX - mousePos.x;
        mousePos.tickY = e.pageY - mousePos.y;
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
        mousePos.moveX = e.pageX - startX.value;
        mousePos.moveY = e.pageY - startY.value;
      }
      isIn = false;
    });
  };
  const handleMouseup = (e: MouseEvent) => {
    isDown.value = false;
    isMoving.value = false;
    removeEvent();
  };
  const addEvent = () => {
    document.body.addEventListener('mousemove', handleMousemove);
    document.body.addEventListener('mouseup', handleMouseup);
  };
  const removeEvent = () => {
    document.body.removeEventListener('mousemove', handleMousemove);
    document.body.removeEventListener('mouseup', handleMouseup);
  };
  onMounted(() => {
    if (dom.value) {
      dom.value.addEventListener('mousedown', handleMousedown);
    }
  });
  onUnmounted(() => {
    if (dom.value) {
      dom.value.removeEventListener('mousedown', handleMousedown);
    }
    removeEvent();
  });
  return {
    startX,
    startY,
    isDown,
    isMoving,
    mousePos,
  }
}
