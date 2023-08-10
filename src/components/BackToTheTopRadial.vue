<template>
  <Transition name="back-to-top">
    <div v-show="showBackToTop">
      <button class="back-to-top" @click="scrollToTop">
        <i class="fa-solid fa fa-arrow-up"></i>
      </button>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "BackToTheTopRadial",
  data() {
    return {
      showBackToTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showBackToTop = window.pageYOffset > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  }
}
</script>

<style scoped>
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.25s ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
}

.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 55px;
  height: 55px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  z-index: 1;
}
</style>