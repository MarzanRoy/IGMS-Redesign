<template>
  <div class="top-container">
    <span class="gov-identifier">
      <img src="https://www.nhb.gov.sg/html/NHB2017/img/dss/sgds-icon.png" alt="" style="margin-right: 10px">A Singapore Government Agency Website
    </span>
    <header>
      <!-- :is-desktop="isDesktop" -->
      <TopNavbar />
    </header>
    <div class="iris-container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import TopNavbar from "@/components/TopNavbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "TopHomeView",
  components: {
    Footer,
    TopNavbar
  }
}
</script>

<style scoped>
.top-container {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

header {
  position: sticky;
  top: -1px;
  background: white;
  margin-bottom: 20px;
  z-index: 3;
}

.gov-identifier {
  background: #e8e8e8;
  font-size: 14px;
  height: 20px;
  padding: 2px 0 2px 5%;
  display: flex;
  justify-content: start;
  align-items: center;
}

.iris-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>