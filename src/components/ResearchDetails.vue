<template>
  <h1>Research Details</h1>
  <p>Research Details Placeholder</p>
  <p>Research Details Placeholder</p>
  <p>Research Details Placeholder</p>
  <p>Research Details Placeholder</p>
  <button @click="handleNext(true)">Next</button>
</template>

<script>
export default {
  name: "ResearchDetails",
  emits: ["next", "back"],
  methods: {
    handleNext(value) {
      this.$emit("next", value);
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
}

button {
  text-align: center;
  margin-top: 20px;
  background: #1c1b1b;
  padding: 10px 100px;
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