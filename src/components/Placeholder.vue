<template>
  <div class="container">
    <span>Is this working?</span>
    <input type="text" v-model="test" />
    <div class="button-container">
      <button @click="handleBack(test !== '')">Back</button>
      <button @click="handleNext(test !== '')">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Placeholder",
  emits: ["back", "next"],
  methods: {
    handleBack(result) {
      this.$emit("back", result);
    },
    handleNext(result) {
      this.$emit("next", result);
    }
  },
  data() {
    return {
      test: "",
    };
  },
  mounted() {
    if (sessionStorage.test !== undefined) {
      this.test = sessionStorage.test;
    }
  },
  watch: {
    test(newValue) {
      sessionStorage.test = newValue;
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2em;
  padding: 0 1em;
}

button {
  text-align: center;
  margin-top: 20px;
  background: #1c1b1b;
  padding: 8px 30px;
  border-radius: 50px;
  color: #cacaca;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #1c1b1b;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

button:hover {
  background-color: transparent;
  border-color: #1c1b1b;
  color: #1c1b1b;
}
</style>