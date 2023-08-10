<template>
  <div class="search-box" @mouseenter="this.$refs.searchBox.focus(); isInputFocused = true;" @mouseleave="this.$refs.searchBox.blur(); isInputFocused = false;">
    <input class="search-text" type="text" v-model="searchQuery" :placeholder="placeholderText" ref="searchBox"/>
    <button class="search-btn" @click="searchQuery = ''; this.$refs.searchBox.focus()">
      <Transition name="icon" >
        <i class="fas" :class="searchIconClass" :key="this.isInputFocused && this.searchQuery !== ''" />
      </Transition>
    </button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  components: {},
  emits: ["search"],
  props: {
    placeholderText: {
      type: String,
      default: "Type to search",
    }
  },
  computed: {
    searchIconClass() {
      return {
        "fa-search": !this.isInputFocused || this.searchQuery === "",
        "fa-times": this.isInputFocused && this.searchQuery !== "",
      }
    },
  },
  data() {
    return {
      searchQuery: "",
      isInputFocused: false,
    };
  },
  watch: {
    searchQuery(newQuery) {
      this.search(newQuery);
    },
  },
  methods: {
    search() {
      this.$emit("search", this.searchQuery);
    },
  }
}
</script>

<style scoped>
/* i want the search icon to fade into a cross icon */
.icon-enter-active,
.icon-leave-active {
  transition: all 0.25s ease;
}

.icon-leave-active {
  position: absolute;
}

.icon-enter-from,
.icon-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fa-search,
.fa-times {
  color: inherit;
  font-size: 18px;
}

.search-box:hover > .search-text,
.search-text:focus,
.search-box input[type="text"]:not(:placeholder-shown){
  width: 200px;
  padding: 0 6px;
}

.search-box:hover > .search-btn,
.search-text:focus + .search-btn {
  background: #f2f2f2;
  color: #1c1b1b;
}

.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 20px 5px;
  border-radius: 40px;
  height: 30px;
  background-color: #1c1b1b;
}

.search-btn:focus {
  outline: none;
}

.search-btn {
  border: none;
  color: #f2f2f2;
  float: right;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #1c1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
}

.search-text {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  transition: width 0.4s;
}
</style>