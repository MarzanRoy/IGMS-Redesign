<template>
  <div class="grid-container">
    <p class="webpage-header">Grant Call List</p>

    <!-- Main Table Content -->
    <table class="bordered" v-if="!isLoading">
      <thead>
      <tr>
        <th v-for="( sort, index ) in sorts" :key="index" @click="selectSort(sort)">
          <div class="table-header-text" :class="{ 'mobile' : isMobile }">
            <span>{{ sort.name }}</span>
            <i
                class="sorter fa-solid"
                :class="{ 'fa-sort': sort.direction === null, 'fa-sort-desc asc': sort.direction === 'asc', 'fa-sort-desc': sort.direction === 'desc', 'rotate': sort === selectedSort && sort.direction !== null }" />
          </div>
        </th>
      </tr>
      </thead>
      <TransitionGroup name="list" tag="tbody">
        <tr v-for="row in sortTable" :key="row['id']" @click="selectItem(row)">
          <td v-for="column in columns" :key="column">
            {{ row[column] }}
          </td>
        </tr>
      </TransitionGroup>
    </table>

    <!-- Skeleton Table Component -->
    <div v-else>
      <table class="bordered skeleton">
        <thead>
        <tr>
          <th v-for="column in columns" :key="column">
            <div class="table-header-text" :class="{ 'mobile' : isMobile }">
              <span>{{ column }}</span><i class="fa-sort sorter fa-solid" />
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <p class="skeleton content" />
          </td>
          <td>
            <p class="skeleton content" />
          </td>
          <td>
            <p class="skeleton content" />
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Grant Popup Modal -->
  <PopupModal :is-modal-open="isModalOpen" custom-modal-styling="padding: 35px 20px 20px;" @closed="isModalOpen = false">
    <div class="modal-content">
      <h4 style="text-align: center">
        Grant Call: {{ selectedItem['Grant Call Name'] }}
        <span style="font-weight: normal; font-size: 14px; border-radius: 50px; background-color: #666666; padding: 0 5px; color: white; white-space: nowrap">
          {{ selectedItem['Managing Organisation'] }}
        </span>
      </h4>
      <br>
      <p>Grant Call Details</p>
      <p style="font-size: 14px; line-height: 1.5; color: #383838">
        Closes on {{ selectedItem['Closed on'] }}
      </p>
      <br>
      <div style="display: flex; gap: 5%">
        <button class="modal-btn" @click="isModalOpen = false">Cancel</button>
        <button class="modal-btn" @click="isModalOpen = false">Apply</button>
      </div>
    </div>
  </PopupModal>
</template>

<script>
import PopupModal from "@/components/PopupModal";

export default {
  name: "GrantCallList",
  components: {
    PopupModal
  },
  inject: ['isMobile', 'isTablet', 'isDesktop'],
  setup() {
    const data = [
      ['Open Fund-Large Collaborative Grant (OF-LCG) May 2023 Grant Call', 'Ministry Of Health', '9-Jun-2023'],
      ['30th Competitive Research Programme (CRP) Call', 'National Research Foundation', '12-Apr-2023'],
      ['Low-Energy Seawater Desalination Solutions', 'National Research Foundation', '30-May-2023'],
      ['Population Health Research Grant (PHRG) Thematic Category Grant Call', 'Ministry Of Health', '28-Feb-2023'],
      ['Thematic challenge call for high-rise commercial office and hotel buildings', 'National Research Foundation', '12-May-2023'],
      ['CS Resident Seed Fund - Apr 2023 R20', 'Ministry Of Health', '2-May-2023'],
      ['CS Resident Seed Fund - Apr 2023 R25', 'Ministry Of Health', '2-May-2023'],
      ['National Innovation Challenge on Active and Confident Ageing (NIC) Feb 2023 Grant Call on Healthy Longevity Catalyst Awards', 'Ministry Of Health', '5-Apr-2023'],
      ['Cities of Tomorrow R&D Programme, RIE2025 - Grant Call 1 (Vertical 5 - City in Nature) - Project 1: Tree-Root Anchorage and Non-Destructive Testing Development for Constrained Urban Planting Spaces', 'National Research Foundation', '31-Mar-2023'],
      ['Cities of Tomorrow R&D Programme, RIE2025 - Grant Call 1 (Vertical 5 - City in Nature) - Project 2: The Ectomycorrhizal-Microbial-Soil Nutrition Axis in Improving Growth of Dipterocarps in Urban and Forested Areas', 'National Research Foundation', '31-Mar-2023'],
      ['Cities of Tomorrow R&D Programme, RIE2025 - Grant Call 1 (Vertical 5 - City in Nature) - Project 3: Enhancing Low Maintenance and Resilient Naturalistic Landscapes along Roads and within Housing Estates', 'National Research Foundation', '31-Mar-2023'],
      ['Cities of Tomorrow R&D Programme, RIE2025 - Grant Call 1 (Vertical 5 - City in Nature) - Project 4: Landscape and Well-being', 'National Research Foundation', '31-Mar-2023'],
      ['Cities of Tomorrow R&D Programme, RIE2025 - Grant Call 1 (Vertical 5 - City in Nature) - Project 5: Assessment of Nutrient Dynamics in Ecosystems in Singapore', 'National Research Foundation', '31-Mar-2023'],
      ['16th Singapore NRF Fellowship Call (Class of 2024)', 'National Research Foundation', '31-Mar-2023'],
      ['29th Competitive Research Programme (CRP) Call', 'National Research Foundation', '5-Oct-2022'],
      ['Feb 2023 Academic Research Fund Tier 2 (EP3)', 'Ministry Of Education', '9-Mar-2023'],
      ['Feb 2023 Academic Research Fund Tier 2 (EP2)', 'Ministry Of Education', '8-Mar-2023'],
      ['Feb 2023 Academic Research Fund Tier 2 (EP1)', 'Ministry Of Education', '7-Mar-2023'],
      ['Feb 2023 Academic Research Fund Tier 2 (EP4)', 'Ministry Of Education', '3-Mar-2023'],
      ['Feb 2023 Academic Research Fund Tier 2 (EP5)', 'Ministry Of Education', '3-Mar-2023']
    ];

    // Map the data array to object with converted date
    const rows = data.map((row, index) => {
      const [name, organization, dateStr] = row;
      const dateParts = dateStr.split('-');
      const date = new Date(`${dateParts[2]} ${dateParts[1]}, ${dateParts[0]}`);

      return {
        id: index,
        "Grant Call Name": name,
        "Managing Organisation": organization,
        "Closed on": dateStr,
        Date: date
      };
    });
    return {
      rows
    }
  },
  data() {
    return {
      columns: ["Grant Call Name", "Managing Organisation", "Closed on"],
      sorts: [],
      isModalOpen: false,
      selectedItem: {},
      selectedSort: null,
      isLoading: true,
      hasErrored: false,
    }
  },
  computed: {
    navTop() {
      if (this.$route.path.split('/')[1] === 'top-navbar') {
        return this.isMobile ? '50px' : '118px';
      } else {
        return 0;
      }
    },
    fill_sorts() {
      return this.columns.map(column => ({
        name: column,
        direction: null
      }));
    },
    // Sort the table by the specified column
    sortTable() {
      let sortedArray = [...this.rows]; // Create a copy of the reviews array
      let { name, direction } = this.selectedSort;
      name = (name === "Closed on") ? "Date" : name;

      // Sort the rows based on the selected column and direction
      if (name && direction) {
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
    selectSort(sort) {
      let { name, direction }  = sort || {};
      // If the column is not currently sorted, we set the direction to asc by default
      if (direction === "asc") {
        direction = "desc";
      } else {
        direction= "asc";
      }
      this.selectedSort = sort;
      this.sorts.forEach((element) => {
        if (element.name !== name) {
          element.direction = null;
        } else {
          element.direction = direction;
        }
      });
    },
    selectItem(item) {
      this.selectedItem = item;
      this.isModalOpen = true;
    },
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.sorts = this.fill_sorts;
    this.selectSort(this.sorts[0]);
  }
}
</script>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.list-leave-active {
  position: absolute;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  height: fit-content;
  align-items: center;
}

.skeleton th,
.skeleton td {
  width: 80vw;
}

.skeleton th:nth-child(2),
.skeleton td:nth-child(2) {
  width: 13vw;
}

.skeleton th:last-child,
.skeleton td:last-child {
  width: 7vw;
}

.skeleton.content {
  animation: pulse-bg 1.5s ease-in-out infinite;
  width: 100%;
  height: 20px;
  background-color: #535353
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

button.modal-btn {
  white-space: nowrap;
  background: #313131;
  padding: 5px 5px;
  border-radius: 5px;
  border: 3px solid #313131;
  color: #cacaca;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

i.sorter {
  font-size: 12px;
  margin-left: 5px;
}

.sorter.rotate {
  transition: transform 0.3s ease, color 0.3s ease;
  transform-origin: center;
  transform: rotate(180deg);
}

.sorter.fa-sort-desc.asc.rotate {
  transform: rotate(180deg);
}

.sorter.fa-sort-desc.rotate {
  transform: rotate(0deg);
}

.modal-content {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: center;
}

p {
  margin: 0;
  padding: 0;
}

td:last-child {
  white-space: nowrap
}

@media (max-width: 400px) {
  td:last-child,
  .table-header-text:last-child span {
    white-space: normal;
  }
}

thead th {
  cursor: pointer;
}

thead {
  position: sticky;
  top: v-bind(navTop);
}

table {
  border-collapse: separate !important;
  border-spacing: 0;
}

.bordered {
  border: solid #ccc 1px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 1px #ccc;
  -moz-box-shadow: 0 1px 1px #ccc;
  box-shadow: 0 1px 4px #ccc;
}

.bordered tr:nth-child(odd) {
  background-color: rgba(243, 243, 243, 0.49);
}

table tr:hover:not(.loading), table tr:nth-child(odd):hover:not(.loading) {
  background-color: #eaeefa;
  transition: background-color 0.2s ease;
}

table tr:hover:not(.loading) td {
  border-color: transparent;
}

th, td {
  text-align: left;
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: middle;
  border-bottom-width: 2px;
}

table td, table th {
  border: 1px solid #ddd;
}

table tr td {
  cursor: pointer;
}

table tr th {
  vertical-align: middle;
  background: #deecfc;
  color: #144283;
}

.webpage-header {
  margin: auto 0;
  font-size: 28px;
  font-weight: 700;
  pointer-events: none
}

.table-header-text {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.table-header-text span {
  white-space: nowrap;
}

th:not(:last-child) > .table-header-text.mobile span {
  white-space: normal;
}
</style>