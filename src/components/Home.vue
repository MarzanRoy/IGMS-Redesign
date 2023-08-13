<template>
  <div class="container">
    <h2>Which navigation bar would you like to use?</h2>
    <div class="button-wrapper">
      <router-link to="/top-navbar/dashboard" class="button">Top</router-link>
      <router-link to="/side-navbar/dashboard" class="button">Side</router-link>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home'
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

.container {
  display: flex;
  padding: 0 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100dvw;
  text-align: center;
  gap: 50px;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.button {
  white-space: nowrap;
  background: #313131;
  padding: 5px 20px;
  border-radius: 100px;
  border: 3px solid #313131;
  color: #cacaca;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.button:hover {
  background-color: transparent;
  border-color: #1c1b1b;
  color: #1c1b1b;
}
</style>