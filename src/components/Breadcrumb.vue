<template>
  <!-- Desktop-->
  <aside class="container desktop" v-if="isDesktop">
    <div class="step" v-for="(step, index) in items" :key="index">
      <div class="step-content">
        <span class="link-wrapper">
          <router-link class="title" :to="step['to']">
            <span>{{ step['text'] }}</span>
          </router-link>
        </span>
        <div class="circle-container">
          <span class="start-label" v-if="index === 0">Start</span>
          <div class="circle desktop" @click="goToStep(step['to'])" :class="{ active: step['active'], current: isCurrentStep(step['to']), warning: step['warning'] }">
            <i class="fa fa-check" v-if="step['active']" />
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="end-label" v-if="index === items.length - 1">End</span>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile-->
  <aside class="container mobile" v-if="isMobile">
    <button class="step mobile-progress" @click="isModalOpen = true">
      <!-- Circular Progress Bar -->
      <CircleProgressBar :currentStep="currentIndex + 1" :totalSteps="items.length">
        <template #progress>
          {{ currentIndex + 1 }} / {{ items.length }}
        </template>
      </CircleProgressBar>
      <span class="mobile-progress-content">{{ currentStep }}<i class="fa-solid fa-caret-down" /></span>
    </button>
  </aside>

  <!-- Mobile Menu -->
  <PopupModal :is-modal-open="isModalOpen" custom-modal-styling="padding: 20px 20px;" @closed="isModalOpen = false">
    <h2 style="text-align: center">Stage Menu</h2>
    <hr>
    <ul class="accordion-body">
      <li v-for="(step, index) in items" :key="index" :aria-disabled="isMobile">
        <router-link :to="step['to']" class="button">
          <span class="icons" style="margin-left: 5px"></span>
          <span class="text">{{ step['text'] }}</span>
        </router-link>
      </li>
    </ul>
  </PopupModal>
</template>

<script>
import { findIndex } from "core-js/internals/array-iteration";
import CircleProgressBar from "@/components/CircleProgressBar.vue";
import PopupModal from "@/components/PopupModal.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Breadcrumb",
  components: {
    PopupModal,
    CircleProgressBar
  },
  inject: ["isDesktop", "isTablet", "isMobile"],
  props: {
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isModalOpen: false,
      currentStep: ''
    };
  },
  methods: {
    blurElement(elementRef) {
      this.$refs[elementRef].blur();
    },
    goBack() {
      this.$router.push(this.items[this.currentIndex - 1].to);
    },
    goNext() {
      this.$router.push(this.items[this.currentIndex + 1].to);
    },
    goToStep(to) {
      this.$router.push(to);
    },
    isCurrentStep(to) {
      return this.$route.path === to;
    }
  },
  watch: {
    $route() {
      this.isModalOpen = false;
      this.currentStep = this.getCurrentStepText;
    }
  },
  mounted() {
    this.currentStep = this.getCurrentStepText;
    console.log(this.$route.path.split('/'));
    if (this.$route.path.split('/').length <= 2) {
      this.$router.push(this.items[0].to);
    }
  },
  computed: {
    currentIndex() {
      return findIndex(this.items, (item) => item.to === this.$route.path);
    },
    getCurrentStepText() {
      const currentStepIndex = this.currentIndex;
      if (currentStepIndex !== -1) {
        return this.items[currentStepIndex].text;
      } else if (this.items.length > 0) {
        return this.items[0].text;
      } else {
        return '';
      }
    },
    direction() {
      return this.isDesktop ? "column" : "row";
    },
  }
}
</script>

<style scoped>
/* Mobile Version Styles */
.container.mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

button.step.mobile-progress {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 0;
}

.mobile-progress-content {
  margin-left: 18px;
  font-size: 1.2em;
  font-weight: bold;
  color: #1c1b1b;
  display: inline-block;
}

.fa-caret-down {
  transition: all 0.2s ease-out;
  margin-left: 5px;
}

button.step.mobile-progress:hover .fa-caret-down,
button.step.mobile-progress:focus .fa-caret-down {
  transform: rotate(180deg);
}

ul.accordion-body {
  width: 100%;
  list-style: none;
}

ul.accordion-body a.button {
  padding: 10px;
}

ul.accordion-body a {
  display: block;
  padding: 0.5rem 0;
  text-decoration: none;
  color: #1c1b1b;
}

aside.container.desktop {
  z-index: 1;
  width: fit-content;
  display: flex;
  flex-direction: column;
}

.step {
  position: relative;
  margin: 1.25em 0;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: flex-end;
}

.step-content {
  display: flex;
  align-items: center;
  gap: 1.5em;
}

a.title {
  line-height: 1.5em;
  font-size: 1.1em;
  text-decoration: none;
  color: #1c1b1b;
  max-width: 156px;
  display: inline-block;
  white-space: normal;
  word-wrap: break-word;
}

.link-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-end;
  text-align: right;
}

.link-wrapper:before {
  content: "";
  position: absolute;
  width: 100%;
  bottom: -3.25px;
  left: 0;
  border-radius: 1px;
  transform: scale(0);
  background-color: #1c1b1b;
  transition: transform 0.2s ease-in-out;
  transform-origin: bottom center;
  height: 2px;
}

.link-wrapper:hover:before,
.step-content:hover .link-wrapper:before {
  transform: scaleX(1);
}

a.router-link-exact-active {
  font-weight: bold;
}

.circle {
  background: gray;
  position: relative;
  width: 2em;
  height: 2em;
  line-height: 1.5em;
  border-radius: 100%;
  border: 2px solid gray;
  color: white;
  text-align: center;
  box-shadow: 0 0 0 3px white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.circle.desktop:hover,
.step-content.desktop:hover .circle {
  transform: scale(1.2);
  font-weight: bold;
}

.circle span {
  font-size: 1em;
  color: inherit;
}

.current {
  background : white;
  border-color: gray;
  color: #4a4a4a;
}

.active {
  background : #55b776;
  border-color: #55b776;
}

.active.current {
  background : white;
  border-color: #55b776;
  color: #265134;
}


.step .active.circle:after {
  background-color: #55b776;
}

.warning {
  background : #f1c40f;
  border-color: #f1c40f;
}

.warning.current {
  background : white;
  border-color: #f1c40f;
  color: #6b5906;
}

/* Vertical Line */
.step:not(:last-child) .circle:after {
  content: " ";
  position: absolute;
  display: block;
  top: 115%;
  height: 130%;
  width: 1px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.25);
}

.circle-container {
  position: relative;
}

/* Styles for the "Start" and "End" labels */
aside.container.desktop .start-label,
aside.container.desktop .end-label {
  pointer-events: none;
  color: #6f6f6f;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

aside.container.desktop .start-label {
  bottom: 110%;
}

aside.container.desktop .end-label {
  top: 110%;
}
</style>