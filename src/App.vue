<template>
  <div id="app">
    <router-view />
    <BackToTheTopRadial />
  </div>
</template>

<script>
import BackToTheTopRadial from "@/components/BackToTheTopRadial.vue";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";


export default {
  name: 'App',
  components: {
    BackToTheTopRadial,
  },
  provide() {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktop: this.isDesktop
    };
  },
  computed: {
    breakpoints() {
      return useBreakpoints(breakpointsTailwind);
    },
    isDesktop() {
      return this.breakpoints.greaterOrEqual('lg');
    },
    isTablet() {
      return this.breakpoints.smallerOrEqual('md');
    },
    isMobile() {
      return this.breakpoints.smallerOrEqual('sm');
    }
  }
}
</script>

<style>
:root {
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", "Segoe", Tahoma, Helvetica, Arial, sans-serif;
}

.iris-container {
  max-width: 1170px;
  padding-right: 10px;
  padding-left: 10px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
}

main {
  will-change: transform, opacity, color, background-color, text-decoration;
}

#app {
  font-size: 13px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  background: none;
  appearance: none;
}
</style>
