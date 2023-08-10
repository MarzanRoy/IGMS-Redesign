<template>
  <div class="main-container">
    <CircleProgressBar :current-step="1" :total-steps="3">
      <template #progress>
        1 of 3
      </template>
    </CircleProgressBar>
    <button ref="myButton" @click="toggle">Test</button>
    <Search @search="search" />
    <div class="container">
      <Accordion button-ref="button" >
        <template #accordion-header>
          <button>
            <i class="fa-solid fa-user" aria-hidden="true"/>Profile<i class="fa-solid fa-caret-down"></i>
          </button>
        </template>
        <template #accordion-body-content>
          <ul class="nav-dropdown-content">
            <li>
              <router-link to="test">Proposals</router-link>
            </li>
            <li>
              <a href="#">Progress Report</a>
            </li>
            <li>
              <a href="#">Panel Review Proposals</a>
            </li>
            <li>
              <a href="#">Panel Review Progress Report</a>
            </li>
          </ul>
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script>
import Accordion from "@/components/Accordion.vue";
import Search from "@/components/Search.vue";
import CircleProgressBar from "@/components/CircleProgressBar.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Test",
  components: {
    CircleProgressBar,
    Search,
    Accordion
  },
  data() {
    return {
      isOpen: false,
      searchQuery: "",
    };
  },
  methods: {
    toggle(event) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
      if (!this.isOpen) {
        this.$refs.myButton.blur();
      }
    },
    search(query) {
      this.searchQuery = query;
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:focus {
  outline: none;
  background-color: blue;
}
</style>