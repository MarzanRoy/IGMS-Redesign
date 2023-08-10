<template>
  <aside :class="{ 'tablet': isTablet, 'menuOpened': menuOpen }" ref="target">
    <div class="logo">
      <router-link to="/" style="text-decoration: none; color: white">
        IGMS
      </router-link>
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="toggleMenu">
        <span class="icons"><i class="fa-solid fa-angles-right" /></span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link to="/side-navbar/dashboard" class="button">
        <span class="icons" style="margin-left: 4px"><i class="fa-solid fa-house" /></span>
        <span class="text">Dashboard</span>
      </router-link>
      <Accordion @accordion-closed="blurElement('sideNavbarBtn_1')" :click-outside-to-close="false">
        <template #accordion-header>
          <button class="button" ref="sideNavbarBtn_1">
            <span class="icons" style="margin-left: 5px"><i class="fa-solid fa-search" /></span>
            <span class="text">Advance Search<i class="fa-solid fa-caret-down" /></span>
          </button>
        </template>
        <template #accordion-body-content>
          <div class="accordion-body">
            <router-link to="/side-navbar/grant" class="button">
              <span class="icons" style="margin-left: 5px"><i class="fa-solid fa-list-ul" /></span>
              <span class="text">Grant Call</span>
            </router-link>
            <router-link to="/side-navbar/project" class="button">
              <span class="icons" style="margin-left: 5px"><i class="fa-solid fa-diagram-project" /></span>
              <span class="text">Projects</span>
            </router-link>
          </div>
        </template>
      </Accordion>
      <button class="button">
        <span class="icons" style="margin-left: 8px"><i class="fa-solid fa-file" /></span>
        <span class="text" style="margin-left: 1px">Review</span>
      </button>
      <button class="button">
        <span class="icons" style="margin-left: 7px"><i class="fa-solid fa-user" /></span>
        <span class="text">Profile</span>
      </button>
    </div>
  </aside>
</template>

<script>
import {onClickOutside} from "@vueuse/core";
import Accordion from "@/components/Accordion.vue";

export default {
  name: "SideNavbar",
  components: {
    Accordion
  },
  emits: ["menu-opened", "menu-closed"],
  inject: ["isMobile", "isTablet", "isDesktop"],
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) {
        this.$emit("menu-opened");
      } else {
        this.$emit("menu-closed");
      }
    },
    handleClickOutside() {
      this.menuOpen = false;
      this.$emit("menu-closed");
    },
    blurElement(elementRef) {
      this.$refs[elementRef].blur();
    }
  },
  mounted() {
    onClickOutside(this.$refs.target, this.handleClickOutside)
    // close dropdown when pressing escape
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.menuOpen) {
        this.menuOpen = false;
        this.$emit("menu-closed");
      }
    });
  },
  beforeUnmount() {
    onClickOutside(this.$refs.target, this.handleClickOutside)
    // remove event listeners
    window.removeEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.menuOpen) {
        this.menuOpen = false;
        this.$emit("menu-closed");
      }
    });
  },
  watch: {
    '$route' () {
      this.menuOpen = false;
      this.$emit("menu-closed");
    }
  }
}
</script>

<style scoped>
.logo {
  font-size: 18px;
  font-weight: bold;
  margin-left: -7.5px;
  margin-bottom: 1rem;
}

.menu-toggle-wrap {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  position: relative;
  top: 0;
  transition: all 0.3s ease-out;
}

.menu-toggle-wrap .menu-toggle {
  margin: auto;
  transition: all 0.3s ease-in-out;
}

.menu-toggle-wrap .menu-toggle .icons {
  font-size: 15px;
  color: white;
  transition: all 0.3s ease-out;
}

.menu-toggle:hover .icons {
  color: #0092ff;
}

.menu-toggle-wrap .menu-toggle:hover {
  transform: translateX(0.5rem);
}

aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100%;
  overflow: hidden;
  padding: 1rem;
  z-index: 3;

  background-color: #111b37;
  color: white;

  transition: all 0.3s ease-out;
}

.menuOpened {
  width: var(--sidebar-width);
}

.menuOpened .menu-toggle-wrap {
  top: -2.2rem;
}

.menuOpened .menu-toggle-wrap .menu-toggle {
  margin: 0;
  transform: rotate(-180deg);
}

.menu {
  margin: 0 -1rem;
}

.menu .button {
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 40px;

  padding: 0.5rem 1rem;
  transition: all 0.2s ease-out;
}

.menu .button:hover,
.menu .router-link-exact-active,
.menu .router-link-active {
  background-color: #04416f;
}

.menu .router-link-exact-active,
.menu .router-link-active {
  border-right: 3px solid #0092ff;
}

.menu .button:hover .icons,
.menu .button:hover .text,
a.router-link-exact-active.button .icons,
a.router-link-exact-active.button .text,
a.router-link-active.button .icons,
a.router-link-active.button .text {
  color: #0092ff;
}

.menu .button .icons {
  font-size: 20px;
  color: white;
  transition: all 0.2s ease-out;
}

.menu .button .text {
  color: white;
  white-space: nowrap;
  transition: all 0.2s ease-out;
}

h3,
.button .text {
  opacity: 0;
  transition: all 0.3s ease-out;
}

.menuOpened .text .fa-caret-down {
  transition: all 0.2s ease-out;
  margin-left: 5px;
}

.menuOpened .button:hover .fa-caret-down,
.menuOpened .button:focus .fa-caret-down {
  transform: rotate(180deg);
}

.menuOpened h3,
.menuOpened .button .text {
  opacity: 1;
}

.menuOpened .button .icons {
  margin-right: 1rem;
}

h3 {
  color: rgba(208, 208, 208, 0.44);
  font-size: 12px;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.tablet {
  position: fixed;
}
</style>