<template>
  <div class="grid-container">
    <p class="webpage-header">Deviation Requests</p>
    <div class="right-container">
      <Search @search="handleSearch" />
      <Dropdown class="dropdown-wrapper" button-ref="sortButton">
        <template #toggler>
          <button ref="sortButton" class="drop-btn-sort">Sort by: {{ selectedSort.name }} <i @click.prevent.stop="flip(selectedSort)" :class="selectedSort.direction" class="fa fa-solid fa-chevron-down"></i></button>
        </template>
        <DropdownContent>
          <ul class="dropdown-sort-menu">
            <li v-for="( sort, index ) in availableSorts" :key="index">
              <a href="#" @click="selectSort(sort)">{{ sort.name }}</a>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
    <div class="cards" v-for="( request, index ) in sortedRequests" :key="index" @click="openModal(request)">
      <div style="display: flex; justify-content: space-between; align-content: center; align-items: center; margin-top: 7px">
        <div style="display: flex; flex-direction: column; padding: 0 30px">
          <p style="font-size: 18px; font-weight: 700; text-overflow: ellipsis; width: 278px; white-space: nowrap; overflow: hidden;">{{ request.type }}</p>
          <div style="display: flex; flex-direction: row; align-content: center; gap: 10px">
            <span style="margin: -3px 0 0 0; font-size: 12px; font-weight: 400; color: #7f7f7f;">ID: {{ request.id }}</span>
            <span style="margin: -3px 0 0 0; font-size: 12px; font-weight: 400; color: #7f7f7f;">Project ID: {{ request.project_id }}</span>
          </div>
        </div>
        <div style="margin: auto 20px">
          <p :class="request.stage">{{ request.status }}</p>
        </div>
      </div>
      <hr>
      <div style="display: flex; flex-direction: row; align-content: center; justify-content: space-evenly; align-items: center; margin-bottom: 10px">
        <div style="text-align: center">
          <span style="color: #656565; font-size: 14px;">Date of submission</span>
          <p style="font-size: 18px">{{ request.submission }}</p>
        </div>
        <div style="text-align: center">
          <span style="color: #656565; font-size: 14px;">Date of approval/rejection</span>
          <p style="font-size: 18px">{{ request.results }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-show="sortedRequests.length === 0" style="height: 150px; display: flex; justify-content: center; align-items: center;">
      <p style="font-size: 18px; font-weight: 700;">No results found</p>
  </div>
  <br v-show="sortedRequests.length <= 2">
  <router-link class="button" to="/research-milestone">View Milestones for this project</router-link>
  <PopupModal :is-modal-open="isModalOpen" custom-modal-styling="padding: 50px 100px;" @close="isModalOpen = false">
    {{ selectedCard }}
  </PopupModal>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import DropdownContent from "@/components/DropdownContent";
import Search from "@/components/Search";
import PopupModal from "@/components/PopupModal";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Deviation",
  components: {
    PopupModal,
    Search,
    Dropdown,
    DropdownContent,
  },
  data() {
    return {
      sorts : [
        {
          id: 1,
          name: "Deviation ID",
          direction: "asc"
        },
        {
          id: 2,
          name: "Project ID",
          direction: "asc"
        },
        {
          id: 3,
          name: "Type",
          direction: "asc"
        },
        {
          id: 4,
          name: "Date of Submission",
          direction: "asc"
        },
        {
          id: 5,
          name: "Date of Approval/Rejection",
          direction: "asc"
        },
        {
          id: 6,
          name: "Status",
          direction: "asc"
        }
    ],
      // deviation requests
      requests: [
        {
          id: "N/A",
          project_id: "NRF-002714-00",
          type: "Change in project scope",
          submission: "N/A",
          results: "N/A",
          stage: "draft",
          status: "Draft",
        },
        {
          id: "NRFDV-000002294",
          project_id: "NRF-002714-01",
          type: "Virement of funds",
          submission: "09-Jun-2023",
          results: "12-Jun-2023",
          stage: "rejected",
          status: "Rejected",
        },
        {
          id: "NRFDV-000002295",
          type: "Change in host institution",
          project_id: "NRF-002714-01",
          submission: "09-Jun-2023",
          results: "22-Jun-2023",
          stage: "approved",
          status: "Approved",
        },
        {
          id: "NRFDV-000002296",
          type: "Nationality Waiver Request for Research Staff",
          project_id: "NRF-002714-00",
          submission: "09-Jun-2023",
          results: "12-Jun-2023",
          stage: "pending",
          status: "Pending Endorsement",
        },
        {
          id: "NRFDV-000002297",
          type: "Project Duration / Time",
          project_id: "NRF-002714-00",
          submission: "09-Jun-2023",
          results: "12-Jun-2023",
          stage: "pending",
          status: "Pending Verification",
        }
        ],
      selectedSort: null,
      selectedCard: null,
      searchQuery: "",
      isModalOpen: false,
      isLoading: true,
      hasErrored: false
    }
  },
  created() {
    this.selectedSort = this.sorts[0];
    this.calculateRealDates();
  },
  computed: {
    availableSorts() {
      // Filter out the selected sort from the available options
      return this.sorts.filter((sort) => sort !== this.selectedSort);
    },
    sortedRequests() {
      let sortedArray = [...this.requests]; // Create a copy of the reviews array
      let { name, direction } = this.selectedSort || {};

      switch (name) {
        case "Deviation ID":
          name = "id";
          break;
        case "Project ID":
          name = "project_id";
          break;
        case "Date of Submission":
          name = "submissionDate";
          break;
        case "Date of Approval/Rejection":
          name = "resultsDate";
          break;
        default:
          name = "status";
          break;
      }

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

      if (this.searchQuery) {
        // Perform filtering based on the search query
        sortedArray = sortedArray.filter((request) => {
          // Customize the fields to be filtered based on your requirements
          const searchableFields = [
            String(request.id),
            request.type,
            request.project_id,
            String(request.submissionDate),
            String(request.resultsDate),
            request.stage,
            request.status,
          ];

          return searchableFields.some((field) =>
              field.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
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
      this.requests.reverse();
    },
    selectSort(sort) {
      this.selectedSort = sort;
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    calculateRealDates() {
      this.requests.forEach((request) => {
        if (request.submission !== "N/A") {
          request.submissionDate = new Date(request.submission);
        }
        if (request.results !== "N/A") {
          request.resultsDate = new Date(request.results);
        }
      });
    },
    openModal(card) {
      this.selectedCard = card;
      this.isModalOpen = true;
    },
  }
}
</script>

<style scoped>
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

.right-container {
  display: flex;
  gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: stretch;
}

/* i want the dropdown wrapper to be at the flex-end */
.dropdown-wrapper {
  position: relative;
  width: fit-content;
  display: inline-block;
  border-radius: 50px;
}

button.drop-btn-sort {
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

button.drop-btn-sort:hover {
  color: white;
  scale: 1.05;
}

button.drop-btn-sort:focus {
  outline: none;
  scale: 1.05;
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

.dropdown-sort-menu a {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #1c1b1b;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.2s ease;
}

.dropdown-sort-menu a:hover {
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

/* Router link bottom */
a.button {
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  background: #1c1b1b;
  padding: 10px 20px;
  border-radius: 50px;
  color: #cacaca;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid #1c1b1b;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

a.button:hover {
  background-color: transparent;
  border-color: #1c1b1b;
  color: #1c1b1b;
}

/* Status */
.pending, .approved, .rejected, .draft {
  width: fit-content;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 14px;
  margin: 0;
}

.rejected {
  background: #fdd;
  color: #c00;
}

.draft {
  background: #d9e3e6;
  color: #535353;
}

.approved {
  background: #cfd;
  color: #4e8561;
}

.pending {
  white-space: nowrap;
  background: #ffeabf;
  color: #9b7236;
}

.cards {
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.21);
  transition: transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out, scale 0.25s ease-in-out;
}

.cards:hover {
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.41);
  transform: translate3d(0, -3px, 0);
  scale: 1.01;
  transform-origin: center ;
}

p {
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