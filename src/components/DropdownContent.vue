<template>
  <Transition :name="customTransition">
    <div v-if="active">
      <slot />
    </div>
  </Transition>
</template>

<script>
export default {
  name: "DropdownContent",
  inject: ["sharedState"],
  props: {
    customTransition: {
      type: String,
      default: "dropdown-content",
    },
  },
  computed: {
    active() {
      return this.sharedState.active
    }
  }
}
</script>

<style scoped>
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.dropdown-content-enter-from,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.nav-dropdown-content-enter-active,
.nav-dropdown-content-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.nav-dropdown-content-enter-from,
.nav-dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}
</style>