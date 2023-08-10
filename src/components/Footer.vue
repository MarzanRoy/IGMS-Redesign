<template>
  <footer>
    <!-- Desktop/Tablet Logos -->
    <div class="logo-container" v-if="!isMobile">
      <div class="logo-link">
        <a href="#">
          <img src="https://researchgrant.gov.sg/Resource%20Library/images/ASTAR_Logo_1.png"  alt="" class="logo-image" />
        </a>
      </div>
      <div class="logo-link">
        <a href="#">
          <img src="https://researchgrant.gov.sg/Resource%20Library/images/MOE-logo.png"  alt="" class="logo-image" />
        </a>
      </div>
      <div class="logo-link">
        <a href="#">
          <img src="https://researchgrant.gov.sg/Resource%20Library/images/moh-logo.gif"  alt="" class="logo-image" />
        </a>
      </div>
      <div class="logo-link">
        <a href="#">
          <img src="https://researchgrant.gov.sg/Resource%20Library/images/logo-nrf.png"  alt="" class="logo-image" />
        </a>
      </div>
    </div>

    <!-- Mobile Logos -->
    <div class="logo-container mobile" v-else>
      <div class="inner-logo-container">
        <div class="logo-link">
          <a href="#">
            <img src="https://researchgrant.gov.sg/Resource%20Library/images/ASTAR_Logo_1.png"  alt="" class="logo-image" />
          </a>
        </div>
        <div class="logo-link">
          <a href="#">
            <img src="https://researchgrant.gov.sg/Resource%20Library/images/MOE-logo.png"  alt="" class="logo-image" />
          </a>
        </div>
      </div>
      <div class="inner-logo-container">
        <div class="logo-link">
          <a href="#">
            <img src="https://researchgrant.gov.sg/Resource%20Library/images/moh-logo.gif"  alt="" class="logo-image" />
          </a>
        </div>
        <div class="logo-link">
          <a href="#">
            <img src="https://researchgrant.gov.sg/Resource%20Library/images/logo-nrf.png"  alt="" class="logo-image" />
          </a>
        </div>
      </div>
    </div>
    <div class="footer-links">
      <div style="margin: 0 5px;width: 100%;">
        <div class="footer-texts">
          <div class="footer-text1" :class="{ 'mobile' : isMobile }">
            <div>
              <p class="title">WHAT WE DO</p>
              <a><i class="fa fa-info-circle" aria-hidden="true" style="padding-right:5px"></i>About Us</a>
            </div>
            <div>
              <p class="title">WHERE TO FIND US</p>
              <a><i class="fa fa-map" aria-hidden="true" style="padding-right:5px"></i>Sitemap</a>
            </div>
            <div>
              <p class="title">HOW TO REACH US</p>
              <a><i class="fa fa-address-book" aria-hidden="true" style="padding-right:5px"></i>Contact Us</a>
            </div>
          </div>
          <hr style="border-color: #e1e1e1;" :style="isMobile ? 'width: 95%' : 'width: 75%'">
          <p>
            This site is best viewed using IE9 & above,  Mozilla Firefox 33 & above or Google Chrome 39 & above with 1024 x 768 resolution
            <br>Copyright © 2019 Government of Singapore<br><br>
            <a>Report Vulnerability</a> | <a>Privacy Statement</a> | <a>Terms of Use</a> | <a>Rate Our Website</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer",
  data() {
    let breakpoints = useBreakpoints(breakpointsTailwind);
    let isDesktop = breakpoints.greater("md") && breakpoints.smallerOrEqual("xl");
    let isTablet = breakpoints.smallerOrEqual("md");
    let isMobile = breakpoints.smallerOrEqual("sm");
    return {
      isDesktop,
      isTablet,
      isMobile
    };
  }
}
</script>

<style scoped>
.footer-texts p > a {
  white-space: nowrap;
}

.footer-text1 {
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  display: grid;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 15px;
}

.footer-text1.mobile {
  grid-template-columns: 1fr;
  gap: 10px;
}

.footer-text1 a {
  font-size: 14px;
}

.title {
  white-space: nowrap;
  font-weight: bold;
  font-size: 15px;
}

.footer-texts {
  line-height: 1.5;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.footer-links {
  background-color: #1f3262;
  padding: 10px 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links a:hover {
  color: #c4c9d3;
  text-decoration: #c4c9d3 underline;
  transition: color 0.3s ease, text-decoration 0.3s ease;
}

.footer-links a {
  color: white;
  cursor: pointer;
}

.logo-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1% 10%;
  flex-wrap: wrap;
  background-color: #edf4ff;
}

.logo-image {
  max-width: 100%;
  max-height: 100px;
  height: auto;
}

.logo-container.mobile .logo-link {
  display: flex;
  align-items: center;
  gap: 0;
  max-width: 300px; /* Set a maximum width for the logo */
  width: fit-content;
}

.inner-logo-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  height: fit-content;
}
</style>