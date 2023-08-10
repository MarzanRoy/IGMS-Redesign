<template>
  <div
      @click="toggle"
      @mouseover="isOpen = allowHover ? true : isOpen"
      @mouseleave="isOpen = allowHover ? false : isOpen"
      ref="target">
    <slot name="accordion-header" />
    <div class="accordion-container">
      <div>
        <slot name="accordion-body-content" />
      </div>
    </div>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Accordion",
  props: {
    allowHover: {
      type: Boolean,
      default: false
    },
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
    transitionDuration: {
      type: String,
      default: "0.5s"
    },
    transitionStyle: {
      type: String,
      default: "ease-in-out"
    }
  },
  emits: ["accordion-closed"],
  data() {
    return {
      isOpen: false,
      gridTemplateRows: 0
    };
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        this.gridTemplateRows = 1;
      } else {
        this.gridTemplateRows = 0;
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.isOpen = false;
      this.$emit("accordion-closed");
    },
    toggle(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
      if (!this.isOpen) {
        this.$emit("accordion-closed");
      }
    },
  },
  mounted() {
    if (this.clickOutsideToClose) {
      onClickOutside(this.$refs.target, this.handleClickOutside);
    }
    // close accordion when pressing escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.isOpen = false;
        this.$emit("accordion-closed");
      }
    });
  },
  beforeUnmount() {
    if (this.clickOutsideToClose) {
      onClickOutside(this.$refs.target, this.handleClickOutside);
    }
    // remove event listeners
    window.removeEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.isOpen = false;
        this.$emit("accordion-closed");
      }
    });
  }
}
</script>

<style scoped>
.accordion-container {
  display: grid;
  grid-template-rows: v-bind(gridTemplateRows + "fr");
  transition: grid-template-rows v-bind(transitionDuration + " " + transitionStyle);
}

.accordion-container > div {
  overflow: hidden;
}
</style>