<template>
  <div class="container">
    <SideNavbar @menu-opened="menuOpened = true" @menu-closed="menuOpened = false" />
    <div class="overlay" v-if="menuOpened" />
    <div class="content-container" :style="paddingStyle">
      <div class="iris-container">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import SideNavbar from "@/components/SideNavbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "SideHomeView",
  components: {
    Footer,
    SideNavbar
  },
  inject: ['isMobile', 'isTablet'],
  computed: {
    paddingStyle() {
      if (this.isMobile || this.isTablet) {
        return {
          'padding-left': '4rem'
        }
      } else {
        return {
          'padding-left': '0'
        }
      }
    }
  },
  data() {
    return {
      menuOpened: false
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  z-index: 1;
}

.container {
  display: flex;
  flex-direction: row;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow-y: auto; /* Add scrollbars if content is taller than viewport */
}

.iris-container {
  margin: 10px auto;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>