<template>
  <div class="grid-container" :class="{ 'mobile' : isMobile }">
    <p class="webpage-header">Research Milestone List</p>
    <Search @search="handleSearch" />
    <!-- Main Table Content -->
    <div class="table-container">
      <div class="table-fixed">
        <table class="bordered" :class="{ 'tablet' : isTablet, 'mobile' : isMobile }">
          <thead>
          <tr>
            <th @click="selectSort(sorts[0])">
              <input type="checkbox" v-model="selectAll" @click.stop @change="toggleAllCheckboxes" />
              <span>S_N
            <i
                class="sorter fa-solid"
                :class="{ 'fa-sort': sorts[0].direction === null, 'fa-sort-desc asc': sorts[0].direction === 'asc', 'fa-sort-desc': sorts[0].direction === 'desc', 'rotate': sorts[0] === selectedSort && sorts[0].direction !== null}" />
          </span>
            </th>
            <th v-for="( column, index ) in columns.filter(col => col !== 'S_N')" :key="index" @click="selectSort(sorts[index+1])">
              {{ column }}
              <i
                  class="sorter fa-solid"
                  :class="{ 'fa-sort': sorts[index+1].direction === null, 'fa-sort-desc asc': sorts[index+1].direction === 'asc', 'fa-sort-desc': sorts[index+1].direction === 'desc', 'rotate': sorts[index+1] === selectedSort && sorts[index+1].direction !== null}" />
            </th>
          </tr>
          </thead>
          <TransitionGroup tag="tbody" name="list">
            <tr v-for="row in sortTable" :key="row" @click="selectRow(row)">
              <td>
                <input type="checkbox" v-model="selected[row['S_N']]" @click.stop @mouseenter="showCheckboxes" @mouseleave="hideCheckboxes"/>
                <span>{{ row['S_N'] }}</span>
              </td>
              <td v-for="column in columns.filter(col => col !== 'S_N' && col !== 'Status')" :key="column">
                {{ row[column] }}
              </td>
              <td>
                <span :class="row['Status'] === 'Achieved' ? 'Achieved' : row['Status'] === 'Not started' ? 'Not-Started' : ''">{{ row['Status'] }}</span>
              </td>
            </tr>
            <tr v-if="sortTable.length === 0">
              <td :colspan="columns.length" class="no-results">No results found</td>
            </tr>
          </TransitionGroup>
          <tfoot>
          <tr>
            <th :colspan="columns.length">
              <div class="table-buttons">
                <button :disabled="!isAddButtonDisabled" @click="isModalOpen['delete_modal'] = true">Delete<i class="fa fa-trash" aria-hidden="true" /></button>
                <button :disabled="isAddButtonDisabled" @click="isModalOpen['add_modal'] = true">Add<i class="fa fa-add" aria-hidden="true" /></button>
              </div>
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="buttons-container">
      <button @click="handleBack(rows === sortTable)">Back</button>
      <button @click="handleNext(rows === sortTable)">Next</button>
    </div>
  </div>

  <!-- Delete Modal -->
  <PopupModal :is-modal-open="isModalOpen['delete_modal']" custom-modal-styling="padding: 20px 100px;" @closed="isModalOpen['delete_modal'] = false">
    <div class="modal-content">
      <i class="fa fa-trash" style="margin-bottom: 5%; font-size: 32px; color: #959595" aria-hidden="true" />
      <span style="font-size: 17px">Are you sure you want to delete {{ selectedRowCount > 1 ? 'these rows' : 'this row' }}?</span>
      <span style="color: #959595">Warning: This action cannot be undone</span>
      <div style="display: flex; margin-top: 5%; gap: 5%">
        <button class="modal-btn" @click="isModalOpen['delete_modal'] = false">No, cancel</button>
        <button class="modal-btn" @click="deleteRow">Yes, I'm sure</button>
      </div>
    </div>
  </PopupModal>

  <!-- Add Modal -->
  <PopupModal :is-modal-open="isModalOpen['add_modal']" custom-modal-styling="padding: 50px 100px;" @closed="isModalOpen['add_modal'] = false">
    Add Function Here
    <button class="modal-btn" @click="isModalOpen['add_modal'] = false">Cancel</button>
    <button class="modal-btn" @click="isModalOpen['add-modal'] = false">Save</button>
  </PopupModal>

  <!-- Edit Modal -->
  <PopupModal :is-modal-open="isModalOpen['edit_modal']" custom-modal-styling="padding: 50px 100px;" @closed="isModalOpen['edit_modal'] = false">
    {{ selectedRow }}
  </PopupModal>
</template>

<script>
import PopupModal from "@/components/PopupModal";
import Search from "@/components/Search";

export default {
  name: "ResearchMilestone",
  emits: ['next', 'back'],
  inject: ['isTablet', 'isMobile'],
  components: {
    Search,
    PopupModal
  },
  setup() {
    const data = [
      ['Research Milestone 1', '1', '5', 'Achieved'],
      ['Research Milestone 2', '6', '3', 'Achieved'],
      ['Research Milestone 3', '9', '2', 'Achieved'],
      ['Research Milestone 4', '11', '2', 'Achieved'],
      ['Research Milestone 5', '13', '1', 'Achieved'],
      ['Research Milestone 6', '14', '2', 'Not started'],
      ['Research Milestone 7', '16', '2', 'Not started'],
      ['Research Milestone 8', '18', '2', 'Not started'],
      ['Research Milestone 9', '20', '1', 'Not started'],
      ['Research Milestone 10', '21', '3', 'Not started'],
      ['Research Milestone 11', '24', '2', 'Not started'],
      ['Research Milestone 12', '26', '2', 'Not started'],
      ['Research Milestone 13', '27', '1', 'Not started'],
      ['Research Milestone 14', '29', '2', 'Not started'],
      ['Research Milestone 15', '31', '2', ''],
      ['Research Milestone 16', '33', '2', ''],
    ];

    const rows = data.map((row, index) => ({
      "S_N": index + 1,
      "Research Milestone": row[0],
      "Start month": row[1],
      "Duration (months)": row[2],
      "Status": row[3]
    }));

    return {
      rows
    }
  },
  data() {
    return {
      columns: ["S_N", "Research Milestone", "Start month", "Duration (months)", "Status"],
      sorts: [],
      selectedSort: null,
      isModalOpen: {
        delete_modal: false,
        add_modal: false,
        edit_modal: false
      },
      selected: {}, // Array to store the selected state of each checkbox
      selectAll: false, // Select All checkbox state
      confirmSelected: {},
      showCheckboxes_flag: false, // Flag to control showing/hiding of checkboxes
      searchQuery: "",
      selectedRow: null,
      isLoading: true,
      hasErrored: false,
    }
  },
  methods: {
    selectRow(row) {
      this.selectedRow = row;
      this.isModalOpen['edit_modal'] = true;
    },
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
    toggleAllCheckboxes() {
      const selectedRows = Object.keys(this.selected).filter(
          key => this.selected[key]
      );

      if (selectedRows.length === this.rows.length) {
        this.selected = {};
        this.selectAll = false;
      } else {
        this.selected = {};
        for (const row of this.rows) {
          this.selected[row["S_N"]] = true;
        }
        this.selectAll = true;
      }
    },
    showCheckboxes() {
      this.showCheckboxes_flag = true;
    },
    hideCheckboxes() {
      this.showCheckboxes_flag = false;
    },
    deleteRow() {
      this.isModalOpen['delete_modal'] = false;
      // Create a new array to store the rows to keep
      let updatedRows = [];

      // Iterate through the rows and only keep the ones that are not selected
      updatedRows = this.rows.filter(row => !this.selected[row["S_N"]]);
      this.confirmSelected = this.selected;

      // Update the rows array with the filtered rows
      this.rows = [...updatedRows];
      this.rows = this.sortTable;

      // Clear the selected array and deselect the select all checkbox
      this.selected = {};
      this.selectAll = false;
      this.selectedSort = this.sorts[0];
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    handleNext(value) {
      this.$emit('next', value);
    },
    handleBack(value) {
      this.$emit('back', value);
    }
  },
  computed: {
    tableWidth() {
      return (this.$route.path.split('/')[1] === 'top-navbar') ? '90vw' : '75vw';
    },
    fill_sorts() {
      return this.columns.map(column => ({
        name: column,
        direction: null
      }));
    },
    isAddButtonDisabled() {
      // Check if any checkbox is selected
      for (const key in this.selected) {
        if (this.selected[key]) {
          return true;
        }
      }
      return false;
    },
    selectedRowCount() {
      return Object.values(this.selected).filter(Boolean).length;
    },
    // Sort the table by the specified column
    sortTable() {
      let sortedArray = [...this.rows]; // Create a copy of the reviews array
      const { name, direction } = this.selectedSort;

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

      if (this.searchQuery) {
        // Perform filtering based on the search query
        sortedArray = sortedArray.filter((request) => {
          // Customize the fields to be filtered based on your requirements
          const searchableFields = [
            String(request['S_N']),
            request['Research Milestone'],
            String(request['Start month']),
            String(request['Duration (months)']),
            request['Status'],
          ];

          return searchableFields.some((field) =>
              field.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        });
      }

      // Filter out the deleted rows based on the selected state
      sortedArray = sortedArray.filter((row) => !this.confirmSelected[row["S_N"]]);

      return sortedArray;
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  created() {
    this.sorts = this.fill_sorts;
    this.selectSort(this.sorts[0]);
  },
}
</script>

<style scoped>
.table-fixed {
  overflow-y: auto;
  overflow-x: auto;
  height: fit-content;
  width: fit-content;
  max-width: v-bind(tableWidth);
  max-height: 70vh;
}

.table-container {
  grid-column: span 2;
  max-width: fit-content;
  max-height: fit-content;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: fit-content;
  align-items: center;
}

.grid-container.mobile {
  grid-template-columns: 1fr;
}

.grid-container.mobile .webpage-header {
  display: none;
}

.search-box {
  justify-self: end;
}

.grid-container.mobile .table-container,
.grid-container.mobile .buttons-container {
  grid-column: span 1;
}

.buttons-container {
  display: flex;
  gap: 20px;
  grid-column: span 2;
  justify-content: center
}

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

button {
  text-align: center;
  background: #1c1b1b;
  padding: 10px 50px;
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

.modal-content {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: center;
}

.Achieved, .Not-Started {
  width: fit-content;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 13px;
  margin: 5px 0 0 0;
  white-space: nowrap;
}

.Achieved {
  background: #cfd;
  color: #4e8561;
}

.Not-Started {
  background: #d9e3e6;
  color: #535353;
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
input[type="checkbox"] {
  margin-right: 10px;
  cursor: pointer;
}

table input[type="checkbox"] {
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

table:hover input[type="checkbox"],
table input[type="checkbox"]:checked {
  opacity: 1;
}

.table-buttons button {
  float: right;
  margin-right: 10px;
  background: #313131;
  padding: 5px 15px;
  border-radius: 5px;
  border: 3px solid #313131;
  color: #cacaca;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.table-buttons button:hover, button.modal-btn:hover {
  background-color: transparent;
  color: #313131;
}

tfoot > tr > th > button:disabled {
  background-color: #5d5d5d;
  border-color: #5a5a5a;
  color: #acacac;
  cursor: not-allowed;
}

.fa-add, .fa-trash {
  margin-left: 5px;
}

tfoot {
  position: sticky;
  bottom: 0;
}

p {
  margin: 0;
  padding: 0;
}

thead {
  position: sticky;
  top: 0;
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

.bordered.tablet {
  overflow-x: auto; /* Add horizontal scroll */
  min-width: 100%; /* Ensure the table takes up the minimum width */
  width: max-content; /* Allow the table to expand to its content */
}

.bordered tr:nth-child(odd) {
  background-color: rgba(243, 243, 243, 0.49);
}

table tr:hover, table tr:nth-child(odd):hover {
  background-color: #eaeefa;
  transition: background-color 0.2s ease;
}

table tr:hover td {
  border-color: transparent;
}

thead th:first-child, td label {
  display: flex;
  flex-direction: row;
  place-content: center space-between;
  align-items: center;
}

td.no-results {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #4d4d4d;
  padding: 20px;
}

th:first-child, td:first-child:not(.no-results), th:nth-child(2), td:nth-child(2) {
  text-align: left;
}

td:first-child:not(.no-results) {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
}

th, td {
  line-height: 1.42857143;
  vertical-align: middle;
  border-bottom-width: 2px;
  text-align: right;
  padding: 8px 12px 8px 8px;
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
  white-space: nowrap;
  margin: auto 0;
  font-size: 28px;
  font-weight: 700;
  pointer-events: none
}
</style>