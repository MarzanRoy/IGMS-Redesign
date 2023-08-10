<template>
  <nav>
    <!-- Desktop -->
    <div style="width: 100%; overflow-x: hidden" v-show="!isMobile">
      <router-link to="/">
        <img
            alt="" src="../assets/logo.png"
            style="padding-left: 3%; margin: 0; padding-bottom: 0; height: 70px;">
      </router-link>
    </div>
    <div class="nav-links" v-if="!isMobile" :class="{ 'tablet': isTablet }">
      <ul>
        <!-- Dashboard -->
        <li>
          <router-link to="/top-navbar/dashboard">Dashboard</router-link>
        </li>

        <!-- Advance Search -->
        <li>
          <Dropdown class="nav-dropdown-wrapper" @dropdown-closed="blurElement('navButton_1')" allow-hover>
            <template #toggler>
              <button class="nav-dropdown-btn" ref="navButton_1">Advance Search<i class="fa-solid fa-caret-down"></i></button>
            </template>
            <DropdownContent custom-transition="nav-dropdown-content">
              <ul class="nav-dropdown-content">
                <li>
                  <router-link to="/top-navbar/grant">Grant Calls</router-link>
                </li>
                <li>
                  <router-link to="/top-navbar/project">Project</router-link>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
        </li>

        <!-- Review -->
        <li>
          <Dropdown class="nav-dropdown-wrapper" @dropdown-closed="blurElement('navButton_2')" allow-hover>
            <template #toggler>
              <button class="nav-dropdown-btn" ref="navButton_2">Review<i class="fa-solid fa-caret-down" /></button>
            </template>
            <DropdownContent custom-transition="nav-dropdown-content">
              <ul class="nav-dropdown-content">
                <li>
                  <router-link to="/top-navbar/test">Proposals</router-link>
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
            </DropdownContent>
          </Dropdown>
        </li>
      </ul>

      <!-- Profile -->
      <ul style="float: right; padding-left: 0; padding-right: 72px">
        <li>
          <Dropdown class="nav-dropdown-wrapper" @dropdown-closed="blurElement('navButton_3')" allow-hover>
            <template #toggler>
              <button class="nav-dropdown-btn" ref="navButton_3">
                <i class="fa-solid fa-image" aria-hidden="true"/>User<i class="fa-solid fa-caret-down"></i>
              </button>
            </template>
            <DropdownContent custom-transition="nav-dropdown-content">
              <ul class="nav-dropdown-content profile">
                <li>
                  <a href="#"><i class="fa-solid fa-user" aria-hidden="true"/>User Profile</a>
                </li>
                <li>
                  <a href="#"><i class="fa-solid fa-credit-card" aria-hidden="true"/>Bank Information</a>
                </li>
                <li>
                  <a href="#"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"/>Logout</a>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
        </li>
      </ul>
    </div>

    <!-- Mobile -->
    <div class="nav-links mobile" v-else>

      <!-- Menu -->
      <div class="nav-items" @click="isModalOpen['main'] = true">
        <button class="nav-dropdown-btn">
          <i class="fa-solid fa-bars" aria-hidden="true" />
        </button>
      </div>

      <!-- Logo -->
      <div class="nav-items">
        <router-link to="/" style="font-weight: 600" class="logo">IGMS</router-link>
      </div>

      <!-- Profile -->
      <div class="nav-items">
        <button class="nav-dropdown-btn" @click="isModalOpen['profile'] = true">
          <i class="fa-solid fa-image" aria-hidden="true"/>User<i class="fa-solid fa-caret-down" />
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <PopupModal :is-modal-open="isModalOpen['main']" custom-modal-styling="padding: 20px 20px;" @closed="isModalOpen['main'] = false">
    <h2 style="text-align: center">Menu</h2>
    <hr>
    <ul class="nav-dropdown-content mobile">
      <li>
        <router-link to="/top-navbar/dashboard">Dashboard</router-link>
      </li>
      <li>
        <Accordion @accordion-closed="blurElement('mainMenuBtn_1')">
          <template #accordion-header>
            <button class="nav-dropdown-btn mobile" ref="mainMenuBtn_1">Advance Search<i class="fa-solid fa-caret-down" /></button>
          </template>
          <template #accordion-body-content>
            <ul class="nav-dropdown-content mobile inner">
              <li>
                <router-link to="/top-navbar/grant">Grant Calls</router-link>
              </li>
              <li>
                <router-link to="/top-navbar/project">Project</router-link>
              </li>
            </ul>
          </template>
        </Accordion>
      </li>
      <li>
        <Accordion @accordion-closed="blurElement('mainMenuBtn_2')">
          <template #accordion-header>
            <button class="nav-dropdown-btn mobile" ref="mainMenuBtn_2">Review<i class="fa-solid fa-caret-down" /></button>
          </template>
          <template #accordion-body-content>
            <ul class="nav-dropdown-content mobile inner">
              <li>
                <router-link to="/top-navbar/test">Proposals</router-link>
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
      </li>
    </ul>
  </PopupModal>

  <!-- Mobile Profile -->
  <PopupModal :is-modal-open="isModalOpen['profile']" custom-modal-styling="padding: 20px 20px;" @closed="isModalOpen['profile'] = false">
    <h2 style="text-align: center">Menu</h2>
    <hr>
    <ul class="nav-dropdown-content profile mobile">
      <li>
        <a href="#"><i class="fa-solid fa-user" aria-hidden="true"/>User Profile</a>
      </li>
      <li>
        <a href="#"><i class="fa-solid fa-credit-card" aria-hidden="true"/>Bank Information</a>
      </li>
      <li>
        <a href="#"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"/>Logout</a>
      </li>
    </ul>
  </PopupModal>
</template>

<script>
  import Dropdown from "@/components/Dropdown";
  import DropdownContent from "@/components/DropdownContent";
  import PopupModal from "@/components/PopupModal.vue";
  import Accordion from "@/components/Accordion.vue";
  export default {
    name: 'TopNavbar',
    components: {
      Accordion,
      PopupModal,
      DropdownContent,
      Dropdown
    },
    inject: ['isMobile', 'isTablet'],
    data() {
      return {
        isModalOpen: {
          main: false,
          profile: false,
        }
      }
    },
    watch: {
      '$route' () {
        this.isModalOpen = {
          main: false,
          profile: false,
        }
      }
    },
    methods: {
      blurElement(elementRef) {
        this.$refs[elementRef].blur()
      }
    }
  }
</script>

<style scoped>
.nav-dropdown-btn {
  background-color: transparent;
  font-size: inherit;
  color: inherit;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.nav-dropdown-btn.mobile {
  width: 100%;
  text-align: left;
}

.nav-dropdown-btn.mobile {
  padding: 10px;
}

.nav-dropdown-btn:focus {
  outline: none;
}

.nav-dropdown-wrapper {
  width: 100%;
  position: relative;
  display: inline-block;
}

.nav-dropdown-wrapper .nav-dropdown-content {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  position: absolute;
  background-color: white;
  color: inherit;
  padding: 0 0 5px 0;
  border-radius: 0 0 10px 10px;
  border: #e1e1e1 1px solid;
}

.nav-dropdown-content.mobile li {
  padding: 10px;
}

.nav-dropdown-content.mobile.inner li {
  padding: 10px 20px;
}

.nav-dropdown-content.mobile li:has(ul.inner) {
  padding: 0;
}

ul {
  list-style-type: none;
}

.nav-dropdown-content li {
  width: 100%;
}

ul.nav-dropdown-content > li > a {
  color: black;
  text-align: left;
}

ul.nav-dropdown-content > li > a,
li {
  transition: all 0.2s ease-in-out;
}

ul.profile li:last-child {
  border-top: #e1e1e1 1px solid;
}

ul.mobile li:hover button {
  color: white;
}

ul li:hover,
ul li:has(a.router-link-exact-active:not(.logo)),
ul.inner > li:has(a.router-link-exact-active:not(.logo)) {
  background-color: #337ab7;
}

ul.inner > li:has(a.router-link-exact-active:not(.logo)) a {
  color: white;
}

ul li:hover ul.inner li {
  background-color: white;
}

ul li:hover ul.inner li a {
  color: black;
}

  /* Add a specific selector for the accordion content */
.nav-dropdown-content.mobile.inner li:hover {
  background-color: #337ab7;
}

.nav-dropdown-content.mobile.inner li:hover a,
.nav-dropdown-content li:has(a.router-link-exact-active) a,
.nav-dropdown-content li:hover a {
  color: white;
}

li:hover i.fa-caret-down,
button.nav-dropdown-btn:focus i.fa-caret-down  {
  transform: rotate(180deg);
}

i.fa-user,
i.fa-credit-card,
i.fa-image,
i.fa-right-from-bracket {
  margin-right: 5px;
}

i.fa-caret-down {
  margin-left: 5px;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
}

.nav-links {
  display: flex;
  padding: 0;
  margin-top: -7px;
  background-color: #0a2a56;
  align-items: center;
  justify-content: space-between;
}

.nav-links.mobile {
  position: sticky;
  margin: 0;
  top: 0;
}

.nav-items:nth-child(2) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.nav-links ul{
  margin: 0;
  float: left;
}

.nav-links ul li {
  text-align: center;
  display: inline-block;
  position: relative;
  list-style: none;
}

.nav-links a,
.nav-links button,
.nav-links span {
  white-space: nowrap;
  display: block;
  padding: 0 35px;
  font-size: 18px;
  color: white;
  line-height: 50px;
  font-weight: 200;
  font-family: 'Exo','Segoe UI',serif;
}

a {
  text-decoration: none;
}

.nav-links.tablet a,
.nav-links.tablet button,
.nav-links.tablet span {
  padding: 0 20px;
}

.nav-links.mobile a,
.nav-links.mobile button,
.nav-links.mobile span {
  padding: 0;
}

.nav-links.mobile :first-child {
  margin-left: 10px;
}

.nav-links.mobile :last-child {
  margin-right: 10px;
}
</style>