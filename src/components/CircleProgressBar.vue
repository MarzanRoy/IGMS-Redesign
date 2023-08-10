<template>
  <div class="circle-progress">
    <div class="progress-value">
      <slot name="progress">
        {{ progress + "%" }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircleProgressBar",
  props: {
    currentStep: {
      type: Number,
      default: 0
    },
    totalSteps: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    if (this.currentStep > this.totalSteps) {
      throw new Error("Current step cannot be greater than total steps");
    }
  },
  computed: {
    background() {
      return `conic-gradient(#55b776 ${this.progress * 3.6}deg, #ededed 0deg)`
    },
    progress() {
      return Math.round((this.currentStep / this.totalSteps) * 100)
    }
  }
}
</script>

<style scoped>
.circle-progress {
  flex-shrink: 0;
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: v-bind(background);

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02)
}

.circle-progress:before {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
}

.progress-value {
  position: relative;
  font-size: 12px;
  font-weight: 600;
  color: #55b776;
}
</style>