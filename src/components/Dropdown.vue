<template>
  <div
      @click="toggle"
      @mouseover="sharedState['active'] = allowHover ? true : sharedState['active']"
      @mouseleave="sharedState['active'] = allowHover ? false : sharedState['active']"
      ref="target">
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot />
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dropdown",
  props: {
    allowHover: {
      type: Boolean,
      default: false
    },
    clickOutsideToClose: {
      type: Boolean,
      default: true
    },
  },
  emits: ["dropdown-closed"],
  provide() {
    return {
      sharedState: this.sharedState
    }
  },
  data() {
    return {
      sharedState: {
        active: false
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.sharedState.active = false
    },
    toggle(event) {
      event.stopPropagation();
      this.sharedState.active = !this.sharedState.active
      if (!this.sharedState.active) {
        this.$emit("dropdown-closed");
      }
    }
  },
  mounted() {
    if (this.clickOutsideToClose) {
      onClickOutside(this.$refs.target, this.handleClickOutside);
    }
    // close dropdown when pressing escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sharedState.active) {
        this.sharedState.active = false;
      }
    });
  },
  beforeUnmount() {
    if (this.clickOutsideToClose) {
      onClickOutside(this.$refs.target, this.handleClickOutside);
    }
    // remove event listeners
    window.removeEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sharedState.active) {
        this.sharedState.active = false;
      }
    });
  }
}
</script>