<template>
  <div class="grid-container" :class="{ 'mobile' : isMobile, 'desktop' : isDesktop }">
    <p class="webpage-header">Reviews</p>
    <Dropdown class="dropdown-wrapper" style="justify-self: flex-end; white-space: nowrap" @dropdown-closed="blurElement('sortButton')">
      <template #toggler>
        <button ref="sortButton" class="drop-btn-sort">Sort by: {{ selectedSort.name }} <i @click.prevent.stop="flip(selectedSort)" :class="selectedSort.direction" class="fa fa-solid fa-chevron-down"></i></button>
      </template>
      <DropdownContent>
        <ul class="dropdown-sort-menu">
          <li v-for="( sort, index ) in availableSorts" :key="index">
            <button @click="selectSort(sort)">{{ sort.name }}</button>
          </li>
        </ul>
      </DropdownContent>
    </Dropdown>

    <!-- Main Content -->
    <!-- TODO: i dont like this, but it works for now (regarding the v-if because it checks every item with v-if) -->
    <div class="cards" v-for="( review, index ) in sortedReviews" :key="index"  @click="selectItem(review)" v-show="!isLoading">
      <div style="display: flex; justify-content: space-between; align-content: center; align-items: center">
        <div style="display: flex; align-content: center; vertical-align: center; align-items: center; text-align: start">
          <i class="fa-solid fa-envelope" style="margin-right: 10px; margin-left: 20px; font-size: 18px; font-weight: 700;" />
          <div style="display: flex; flex-direction: column">
            <p style="font-size: 18px; font-weight: 700; padding: 10px 0 0 0;">
              {{ review.subject }}
            </p>
            <span style="margin: -3px 0 0 0; font-size: 12px; font-weight: 400; color: #7f7f7f;">{{ review.id }}</span>
          </div>
        </div>
        <div style="margin: 10px 15px">
          <p :class="review.status">{{ review.status }}</p>
        </div>
      </div>
      <hr>
      <div style="margin-left: 20px; margin-bottom: 10px">
        <span style="color: #656565; font-size: 14px;">Date</span>
        <p style="font-size: 18px; padding-bottom: 10px">{{ review.date }}</p>
      </div>
    </div>

    <!-- Loading Component -->
    <div class="skeleton cards" v-show="isLoading">
      <div style="display: flex; justify-content: space-between; align-content: center; align-items: center; margin-bottom: 2px">
        <div style="display: flex; align-content: center; vertical-align: center; align-items: center; text-align: start">
          <i class="fa-solid fa-image" style="margin-right: 10px; margin-left: 20px; font-size: 18px; font-weight: 700; color: #8e8e8e;" />
          <div style="display: flex; flex-direction: column">
            <p class="animate-bg" style="margin: 10px 0 0 0; background-color: #eee; width: 180px; height: 22px;" />
            <span class="animate-bg" style="margin: 5px 0 0 0; background-color: #eee; width: 75px; height: 17px;" />
          </div>
        </div>
        <div style="margin: 10px 20px">
          <p class="Inactive" style="color: transparent; background-color: #d1d1d1; width: 50px; height: 20px;" />
        </div>
      </div>
      <hr>
      <div style="margin-left: 20px; margin-bottom: 10px; padding-bottom: 10px">
        <span style="color: #656565; font-size: 14px;">Date</span>
        <p class="animate-bg" style="background-color: #eee; width: 150px; height: 22px;" />
      </div>
    </div>
  </div>

  <!-- Dashboard Popup Modal -->
  <PopupModal :is-modal-open="isModalOpen" custom-modal-styling="padding: 30px 100px;" @closed="isModalOpen = false">
    <div class="container">
      <h3>{{ selectedItem.subject }}</h3>
      <h5>{{ selectedItem.id }}</h5>
      <span style="color: gray; margin: 20px 0">{{ selectedItem.date }}</span>
      <Dropdown class="dropdown-wrapper" style="justify-self: flex-end; white-space: nowrap" @dropdown-closed="blurElement('actionButton')">
        <template #toggler>
          <button ref="actionButton" class="drop-btn-action">Please select an option</button>
        </template>
        <DropdownContent>
          <ul class="dropdown-sort-menu">
            <li>
              <a href="#">Evaluate</a>
            </li>
            <li>
              <a href="#">View Proposal</a>
            </li>
            <li>
              <button>Download Proposal</button>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>

  </PopupModal>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import DropdownContent from "@/components/DropdownContent";
import PopupModal from "@/components/PopupModal";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  components: {
    PopupModal,
    DropdownContent,
    Dropdown,
  },
  inject: ["isMobile", "isTablet", "isDesktop"],
  data() {
    return {
      sorts : [
        {
          id: 1,
          name: "Date",
          direction: "asc"
        },
        {
          id: 2,
          name: "Reference ID",
          direction: "asc"
        },
        {
          id: 3,
          name: "Status",
          direction: "asc"
        },
        {
          id: 4,
          name: "Subject",
          direction: "asc"
        },
      ],
      reviews: [
          {
            id: "185-0001",
            subject: "Invitation to Review",
            date: "26 July 2019",
            status: "New",
          },
          {
            id: "GRC035-0004",
            subject: "Invitation to Review",
            date: "15 January 2020",
            status: "Inactive",
          },
          {
            id: "testingdd-0014",
            subject: "Invitation to Review",
            date: "17 June 2020",
            status: "Read",
          }],
      selectedSort: null,
      isModalOpen: false,
      selectedItem: {},
      isLoading: true,
      hadErrored: false,
    }
  },
  created() {
    this.selectedSort = this.sorts[0];
  },
  computed: {
    availableSorts() {
      // Filter out the selected sort from the available options
      return this.sorts.filter((sort) => sort !== this.selectedSort);
    },
    sortedReviews() {
      let sortedArray = [...this.reviews]; // Create a copy of the reviews array
      let { name, direction } = this.selectedSort || {};
      name = name.toLowerCase();
      if (name && direction) {
        // Perform sorting based on the selected sort option
        sortedArray.sort((a, b) => {
          const valueA = a[name];
          const valueB = b[name];
          if (valueA < valueB) {
            return direction === "asc" ? -1 : 1;
          } else if (valueA > valueB) {
            return direction === "asc" ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      return sortedArray;
    }
  },
  methods: {
    flip(selectedSort) {
      if (selectedSort.direction === "asc") {
        selectedSort.direction = "desc";
      } else {
        selectedSort.direction = "asc";
      }
      //update the selected sort with the new direction
      this.selectedSort.direction = selectedSort.direction;
      //update the original sorts array with the new direction
      this.sorts[this.sorts.findIndex((sort) => sort.id === selectedSort.id)].direction = selectedSort.direction;

      //reverses the array
      this.reviews.reverse();
    },
    selectSort(sort) {
      this.selectedSort = sort;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
    blurElement(elementRef) {
      this.$refs[elementRef].blur();
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.animate-bg {
  animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #eee;
  }
}

.desc {
  rotate: 180deg;
  transform-origin: center;
  transition: rotate 0.5s ease;
}

.asc {
  rotate: 0deg;
  transform-origin: center;
  transition: rotate 0.5s ease;
}

.fa-chevron-down:not(.acs):hover {
  animation: 1s pull-up ease alternate infinite;
}

.fa-chevron-down:not(.desc):hover {
  animation: 1s pull-down ease alternate infinite;
}

@keyframes pull-up {
  0% {
    transform: translateY(-2px);
  }
  50% {
    color: #0092ff;
  }
  100% {
    transform: translateY(2px);
  }
}

@keyframes pull-down {
  0% {
    transform: translateY(-2px);
  }
  50% {
    color: #fd9036;
  }
  100% {
    transform: translateY(2px);
  }
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  height: fit-content;
  align-items: center;
}

.grid-container.mobile {
  grid-template-columns: 1fr;
}

.grid-container.desktop {
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-container.desktop > :first-child {
  grid-column: span 2;
}

.grid-container.mobile > :not(:first-child, :nth-child(2)) {
  grid-column: span 2;
}

.dropdown-wrapper {
  position: relative;
  width: fit-content;
  display: inline-block;
  border-radius: 50px;
}

.drop-btn-sort, .drop-btn-action {
  background: #1c1b1b;
  padding: 10px 20px;
  border-radius: inherit;
  border: none;
  color: #cacaca;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
  transition: color 0.5s ease, scale 0.5s ease;
}

.drop-btn-sort:hover,
.drop-btn-action:hover,
button.drop-btn-sort:focus,
button.drop-btn-action:focus {
  color: white;
  scale: 1.05;
}

button.drop-btn-sort:focus,
button.drop-btn-action:focus {
  outline: none;
}

.dropdown-sort-menu {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  position: absolute;
  width: 100%;
  background-color: white;
  list-style-type: none;
  margin: 5px 0 0 0;
  padding: 5px 0;
  border-radius: 10px;
  border: #e1e1e1 1px solid;
  z-index: 1;
}

.dropdown-sort-menu button, .dropdown-sort-menu a {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 20px;
  text-decoration: none;
  color: #1c1b1b;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.2s ease;
}

.dropdown-sort-menu a:hover, .dropdown-sort-menu button:hover {
  background-color: #f1f1f1;
}

.dropdown-sort-menu li:not(:last-child) {
  border-bottom: 1px solid #e5e5e5;
}

.dropdown-sort-menu li:last-child {
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}

.dropdown-sort-menu li:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cards {
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.21);
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, scale 0.25s ease-in-out;
}

.cards:hover:not(.skeleton){
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.41);
  transform: translate3d(0, -3px, 0);
  scale: 1.01;
  transform-origin: center ;
}

.skeleton.cards {
  width: 100%;
}

.New, .Inactive, .Read {
  width: fit-content;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 14px;
  margin: 5px 0 0 0;
}

.New {
  background: #ffeabf;
  color: #9b7236;
}

.Inactive {
  background: #d9e3e6;
  color: #535353;
}

.Read {
  background: #cfd;
  color: #4e8561;
}

p, span {
  margin: 0;
  padding: 0;
}

.webpage-header {
  margin: auto 0;
  font-size: 28px;
  font-weight: 700;
  pointer-events: none
}
</style>