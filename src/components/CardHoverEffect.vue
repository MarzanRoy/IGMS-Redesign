<template>
  <div :class="cardClass" ref="cardRef" :style="cardStyle">
    <slot></slot>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useMouseInElement } from '@vueuse/core';

export default {
  name: "CardHoverEffect",
  props: {
    cardClass: {
      type: String,
      default: "card"
    },
    maxRotation: {
      type: Number,
      default: 6
    },
    transitionDuration: {
      type: String,
      default: "0.25s"
    },
    transitionTimingFunction: {
      type: String,
      default: "ease-out"
    }
  },
  setup(props) {
    const cardRef = ref(null);
    const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(cardRef);

    const cardStyle = computed(() => {
      const rX = (props.maxRotation / 2 - (elementY.value / elementHeight.value) * props.maxRotation).toFixed(2); // handles rotation on the X axis
      const rY = ((elementX.value / elementWidth.value) * props.maxRotation - props.maxRotation / 2).toFixed(2); // handles rotation on the Y axis

      const transform = isOutside.value ? `perspective(${elementWidth.value}px) rotateX(0deg) rotateY(0deg)` : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;

      return {
        transform,
        transition: `transform ${props.transitionDuration} ${props.transitionTimingFunction}`
      };
    });

    return {
      cardRef,
      cardStyle
    };
  }
};
</script>
